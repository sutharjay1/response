"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useProject } from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import {
  ChartBarTwo,
  Check,
  Copy,
  EditOne,
  Scan,
  Share,
} from "@mynaui/icons-react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import QrCode from "react-qr-code";
import { successToast } from "../global/toast";
import { updateProjectStatus } from "./actions/update-project-status";

const ProjectLink = () => {
  const { project, setProject } = useProject();

  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [enableShare, setEnableShare] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (project) {
      setEnableShare(
        project.status === "PROD"
          ? true
          : project.status === "DEV"
            ? false
            : false,
      );
    }
  }, [project, setEnableShare]);

  if (!pathname.startsWith("/projects") || !project?.id) return null;

  const shareLink = `${window.location.origin}/submit/${project.id}`;

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      successToast("Copied to clipboard", { duration: 1500 });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {pathname.endsWith("/analytics") ? (
        <Button variant="outline" className="gap-2" asChild>
          <Link href={`/projects/${project?.id}`} className="cursor-pointer">
            <EditOne className="h-5 w-5 font-semibold" strokeWidth={2} />
            <span className="hidden md:flex">Edit Form</span>
          </Link>
        </Button>
      ) : (
        <Button variant="outline" className="gap-2" asChild>
          <Link
            href={`/projects/${project?.id}/analytics`}
            className="cursor-pointer"
            target="_blank"
          >
            <ChartBarTwo className="h-5 w-5 font-semibold" strokeWidth={2} />
            <span className="hidden md:flex">Analytics</span>
          </Link>
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Share className="h-5 w-5 font-extrabold" />
            <span className="hidden md:flex">Share Form</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96 space-y-4 p-4" align="end">
          <div className="flex items-center justify-between">
            <Label htmlFor="share-switch">Share Status</Label>
            <Switch
              id="share-switch"
              checked={enableShare}
              onCheckedChange={async (value) => {
                const res = await updateProjectStatus(
                  project?.id,
                  value ? "PROD" : "DEV",
                );

                if (res) {
                  successToast(
                    res === "DEV"
                      ? "Form is now in dev mode"
                      : "Form is now in live mode",
                    { duration: 1500 },
                  );

                  if (res === "DEV") {
                    setProject({ ...project, status: "DEV" });
                    setEnableShare(false);
                  } else {
                    setProject({ ...project, status: "PROD" });
                    setEnableShare(true);
                  }
                }
              }}
            />
          </div>
          <Separator />
          {enableShare ? (
            <>
              <div className="flex items-center gap-1">
                <Input
                  ref={inputRef}
                  value={shareLink}
                  readOnly
                  className="h-7 grow"
                />
                <Popover>
                  <PopoverTrigger>
                    <Button size="sm" variant="outline">
                      <Scan size={20} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <QrCode
                      value={shareLink}
                      size={256}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                        backgroundColor: "#f3f2f1",
                      }}
                      viewBox={`0 0 256 256`}
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn("transition-all", copied && "text-green-500")}
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              Enable sharing to generate a link
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Share Password</DialogTitle>
            <DialogDescription>Enter a password to restrict access to your shared form.</DialogDescription>
          </DialogHeader>
          <Input
            type="password"
            value={sharePassword}
            onChange={handlePasswordChange}
            className="h-8"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSharePassword}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default ProjectLink;

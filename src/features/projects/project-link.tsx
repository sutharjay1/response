"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TSmall } from "@/components/ui/typography";
import { useProject } from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import {
  ChartBarTwo,
  Check,
  Copy,
  DangerSquare,
  Download,
  EditOne,
  Globe,
} from "@mynaui/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import QrCode from "react-qr-code";
import Hint from "../global/hint";
import { successToast } from "../global/toast";
import { updateProjectStatus } from "./actions/update-project-status";

const ProjectLink = () => {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const { project, setProject } = useProject();
  const [isLoading, setIsLoading] = useState(false);
  const [enableShare, setEnableShare] = useState(false);

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

  if (
    !(
      pathname.startsWith("/projects") || pathname.startsWith("/hall-of-frame")
    ) ||
    !project?.id
  ) {
    return null;
  }
  const shareLink = `${window.location.origin}/submit/${project.id}`;

  const handleCopyToClipboard = (shareLink: string) => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    successToast("Copied to clipboard", { duration: 1500 });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQrCode = () => {
    const svg = document.getElementById("QRCode");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `${project.name
          .trim()
          .toLocaleLowerCase()
          .replaceAll(" ", "-")}-qr-code.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.onerror = (error) => {
      console.error("Error loading QR code image for download:", error);
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const handleSwitchShareLink = async (value: boolean) => {
    setIsLoading(true);

    try {
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
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
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
            <Globe className="h-5 w-5 font-extrabold" />
            <span className="hidden md:flex">Publish</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[4rem] space-y-4 p-4" align="end">
          <div className="flex items-center justify-between">
            <Label htmlFor="share-switch">Publish Status</Label>
            <Switch
              id="share-switch"
              isLoading={isLoading}
              checked={enableShare}
              onCheckedChange={handleSwitchShareLink}
            />
          </div>
          <Separator />
          {enableShare ? (
            <>
              <div className="flex w-full items-center gap-1">
                <Hint label="Download QR Code" side="top">
                  <Button
                    variant="outline"
                    className={cn(
                      "flex w-full items-center gap-2 transition-all",
                    )}
                    onClick={handleDownloadQrCode}
                  >
                    <Download size={20} /> Download QR
                  </Button>
                </Hint>
                <Hint label="Copy Link" side="top">
                  <Button
                    variant="outline"
                    className={cn(
                      "flex w-full items-center gap-2 transition-all",
                    )}
                    onClick={() => handleCopyToClipboard(shareLink)}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> Copy link
                      </>
                    )}
                  </Button>
                </Hint>
              </div>
              <Separator />
              <div className="flex flex-col items-center gap-2">
                <QrCode
                  size={184}
                  value={shareLink}
                  id="QRCode"
                  className="mx-auto h-auto w-full max-w-64 bg-sidebar"
                  viewBox={`0 0 184 184`}
                />

                <div className="mt-1 flex items-center gap-2">
                  <TSmall className="font-normal">
                    Scan the QR code to share
                  </TSmall>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-center font-normal text-muted-foreground">
              <DangerSquare className="h-6 w-6" />
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

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H3, P } from "@/components/ui/typography";
import { errorToast, successToast } from "@/features/global/toast";
import { updateProfile } from "@/features/settings/actions/update-profile";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, SpinnerOne } from "@mynaui/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const items = [
  {
    id: "radio-light",
    value: "r1",
    label: "Light",
    available: true,
    image: ({ disabled }: { disabled: boolean }) => (
      <div
        className={cn(
          "relative flex h-20 w-full flex-col overflow-hidden rounded-lg border border-[#d1d5db]/10 bg-background shadow-sm md:w-32",
          disabled && "cursor-not-allowed",
        )}
      >
        <div className="h-4 border-b border-[#d1d5db] bg-background"></div>
        <div className="space-y-1.5 p-2">
          <div className="h-1.5 w-3/4 rounded bg-[#d1d5db]/80"></div>
          <div className="h-1.5 w-1/2 rounded bg-[#d1d5db]/80"></div>
          <div className="h-1.5 w-2/3 rounded bg-[#d1d5db]/80"></div>
        </div>

        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-primary/10" />
      </div>
    ),
  },
  {
    id: "radio-dark",
    value: "r2",
    label: "Dark",
    available: false,
    image: ({ disabled }: { disabled: boolean }) => (
      <div
        className={cn(
          "relative flex h-20 w-full flex-col overflow-hidden rounded-lg border border-[#201e1d]/10 bg-[#201e1d]/80 shadow-sm md:w-32",
          disabled && "cursor-not-allowed",
        )}
      >
        <div className="h-4 border-b border-[#201e1d] bg-[#201e1d]/80"></div>
        <div className="space-y-1.5 p-2">
          <div className="h-1.5 w-3/4 rounded bg-[#201e1d]/80"></div>
          <div className="h-1.5 w-1/2 rounded bg-[#201e1d]/80"></div>
          <div className="h-1.5 w-2/3 rounded bg-[#201e1d]/80"></div>
        </div>

        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-primary/10" />
      </div>
    ),
  },
  {
    id: "radio-system",
    value: "r3",
    label: "System",
    available: false,
    image: ({ disabled }: { disabled: boolean }) => (
      <div
        className={cn(
          "relative flex h-20 w-full flex-col overflow-hidden rounded-lg border border-[#201e1d]/10 bg-[#201e1d]/80 shadow-sm md:w-32",
          disabled && "cursor-not-allowed",
        )}
      >
        <div className="h-4 border-b border-[#201e1d] bg-[#201e1d]/80"></div>
        <div className="space-y-1.5 p-2">
          <div className="h-1.5 w-3/4 rounded bg-[#201e1d]/80"></div>
          <div className="h-1.5 w-1/2 rounded bg-[#201e1d]/80"></div>
          <div className="h-1.5 w-2/3 rounded bg-[#201e1d]/80"></div>
        </div>

        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-primary/10" />
      </div>
    ),
  },
];

const accountFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
});

type TAccountForm = z.infer<typeof accountFormSchema>;

export default function SettingsPage() {
  const { user, setUser } = useUser();

  const accountForm = useForm<TAccountForm>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: TAccountForm) => updateProfile(data),
    onSuccess: (data) => {
      setUser({
        email: data.email,
        id: data.id,
        name: data.name,
        image: data.avatar!,
        subscription: {
          id: data?.subscription?.id as string,
          status: data?.subscription?.status as string,
          type: data?.subscription?.type as string,
        },
      });
      successToast("Profile updated");
    },
    onError: () => {
      errorToast("Failed to update profile");
    },
  });

  const onSubmit = async (data: TAccountForm) => {
    try {
      await mutateAsync(data);
    } catch {
      errorToast("Failed to update profile");
    }
  };

  return (
    <section className="container mx-auto max-w-6xl py-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <H3>Settings</H3>
            <Badge
              variant="default"
              className="mx-auto ml-2 rounded-lg border border-input py-1 text-sm font-medium"
            >
              Beta
            </Badge>
          </div>
          <P className="text-muted-foreground [&:not(:first-child)]:mt-0">
            Manage your personal and team settings here.
          </P>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="overflow-x-auto bg-transparent px-0">
            <TabsTrigger
              value="account"
              className="rounded-md transition-all data-[state=active]:bg-sidebar/50 data-[state=active]:shadow-sm data-[state=active]:shadow-[#7c533a]/50 data-[state=active]:ring-1 data-[state=active]:ring-[#201e1d]/10"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="rounded-md transition-all data-[state=active]:bg-sidebar/50 data-[state=active]:shadow-sm data-[state=active]:shadow-[#7c533a]/50 data-[state=active]:ring-1 data-[state=active]:ring-[#201e1d]/10"
            >
              Appearance
            </TabsTrigger>

            <TabsTrigger
              value="notifications"
              className="rounded-md transition-all data-[state=active]:bg-sidebar/50 data-[state=active]:shadow-sm data-[state=active]:shadow-[#7c533a]/50 data-[state=active]:ring-1 data-[state=active]:ring-[#201e1d]/10"
            >
              Notifications
            </TabsTrigger>
          </TabsList>

          <Separator className="my-4" />

          <TabsContent value="account" className="space-y-4">
            <Card className="border-none bg-transparent pt-2 shadow-none">
              <CardHeader className="gap-y-1.5 space-y-0 px-0 pt-0 md:px-0">
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile details and settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-0 md:px-0">
                <Form {...accountForm}>
                  <form
                    onSubmit={accountForm.handleSubmit(onSubmit)}
                    className="grid gap-4 md:grid-cols-2"
                  >
                    <FormField
                      control={accountForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <Input {...field} placeholder="Name" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={accountForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <Input {...field} disabled />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
                <Button onClick={accountForm.handleSubmit(onSubmit)}>
                  {isLoading && (
                    <SpinnerOne className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="border-none bg-transparent pt-2 shadow-none">
              <CardHeader className="px-0 md:px-0">
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-0 md:px-0">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <Switch id="email-notifications" />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <Switch id="marketing-emails" />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="security-alerts">Security Alerts</Label>
                  <Switch id="security-alerts" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card className="border-none bg-transparent pt-2 shadow-none">
              <CardHeader className="px-0 md:px-0">
                <CardTitle>Theme</CardTitle>
                <CardDescription>
                  By default we use light mode but you can go over to the dark
                  side, we don&apos;t mind.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-0 md:px-0">
                <fieldset className="space-y-4">
                  <RadioGroup className="flex gap-3" defaultValue="r1">
                    {items.map((item) => (
                      <label key={item.id}>
                        <RadioGroupItem
                          id={item.id}
                          value={item.value}
                          disabled={!item.available}
                          className={cn(
                            "peer sr-only after:absolute after:inset-0",
                          )}
                        />
                        <item.image disabled={!item.available} />
                        <div className="group mt-2 flex items-center gap-2 peer-data-[state=unchecked]:text-muted-foreground/70">
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                          <Check
                            size={14}
                            strokeWidth={2}
                            className="rounded-full peer-data-[state=unchecked]:group-[]:hidden"
                            aria-hidden="true"
                            style={{
                              backgroundColor: "#004014",
                              color: "#56eda1",
                            }}
                          />
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </fieldset>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

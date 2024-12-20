"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DangerCircle, DangerTriangle, SpinnerOne } from "@mynaui/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const { data, error, isLoading } = useQuery(
    ["payment-status", orderId],
    async () => {
      if (!orderId) {
        throw new Error("Order ID is missing");
      }

      const response = await fetch(`/api/payment-status?orderId=${orderId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch payment status");
      }

      return response.json();
    },
    {
      refetchInterval: 1000,
      enabled: Boolean(orderId),
    },
  );

  useEffect(() => {
    if (data?.status === "ACTIVE") {
      router.push("/signin");
    }
  }, [data, router]);

  const getStatusConfig = () => {
    if (isLoading) {
      return {
        icon: <SpinnerOne className="h-6 w-6 animate-spin text-primary" />,
        title: "Verifying Payment",
        message: "Please wait while we verify your payment...",
      };
    }

    if (error) {
      return {
        icon: <DangerCircle className="h-6 w-6 text-destructive" />,
        title: "Verification Failed",
        message: "There was an error verifying your payment.",
      };
    }

    switch (data?.status) {
      case "ACTIVE":
        return {
          icon: <DangerCircle className="h-6 w-6 text-primary" />,
          title: "Payment Successful",
          message: "Your payment has been successfully verified!",
        };
      case "FAILED":
        return {
          icon: <DangerCircle className="h-6 w-6 text-destructive" />,
          title: "Payment Failed",
          message: "Your payment could not be processed.",
        };
      case "PENDING":
        return {
          icon: <SpinnerOne className="h-6 w-6 animate-spin text-primary" />,
          title: "Processing Payment",
          message: "Please wait while we process your payment...",
        };
      default:
        return {
          icon: <DangerTriangle className="h-6 w-6 text-destructive" />,
          title: "Verification Error",
          message: "An unexpected error occurred.",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <main className="relative z-10 flex min-h-[90vh] flex-1 flex-col items-center justify-center rounded-xl bg-[#f3f2f1] p-4 shadow-inner sm:m-4 sm:px-6 lg:px-8">
      <Card className="group max-w-3xl overflow-hidden rounded-3xl border-none bg-muted/40 px-2 pt-2 shadow transition-all">
        <div className="rounded-3xl bg-background pt-1 shadow-sm">
          <CardHeader className="space-y-2 border-b p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              {config.icon}
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {config.title}
            </h2>
          </CardHeader>
          <CardContent className="mx-auto flex w-full flex-col items-center justify-center gap-6 rounded-3xl bg-background px-2 pt-4 sm:px-6 sm:pt-6">
            <div className="space-y-2 text-center">
              <p className="text-muted-foreground">{config.message}</p>
              {error !== null && error !== undefined && (
                <p className="text-sm text-muted-foreground">
                  Please try again or contact support if the issue persists.
                </p>
              )}
            </div>

            <div className="flex w-full justify-center pb-6">
              <Button
                variant="outline"
                onClick={() => router.push("/signin")}
                disabled={isLoading || data?.status === "PENDING"}
                className="min-w-[200px]"
              >
                {data?.status === "ACTIVE"
                  ? "Redirecting to Sign In..."
                  : "Back to Sign In"}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </main>
  );
}

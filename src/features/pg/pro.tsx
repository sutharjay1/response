"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
//@ts-expect-error missing types
import { load } from "@cashfreepayments/cashfree-js";
import { SpinnerOne } from "@mynaui/icons-react";
import { useMutation } from "@tanstack/react-query";
import {
  PaymentSessionId,
  PaymentSessionIdResponse,
} from "./actions/pg-session-id";

const ProPG = () => {
  const [, setIsSDKReady] = useState(false);

  const initializeSDK = async (paymentSessionId: string) => {
    try {
      const cashfree = await load({
        // mode: "sandbox",
        mode: "production",
      });

      setIsSDKReady(true);
      const checkoutOptions = {
        paymentSessionId,
        redirectTarget: "_self",
      };

      cashfree.checkout(checkoutOptions);
    } catch (error) {
      console.error("Failed to initialize Cashfree SDK:", error);
    }
  };

  const { mutate: getPaymentSessionId, isLoading: isPaymentSessionIdLoading } =
    useMutation({
      mutationFn: async () =>
        PaymentSessionId({
          type: "PRO",
        }),
      onSuccess: (data: PaymentSessionIdResponse) => {
        initializeSDK(data?.data.response.payment_session_id as string);
      },
      onError: (error) => {
        console.error("Failed to fetch payment session ID:", error);
      },
    });

  const handleCheckout = () => {
    getPaymentSessionId();
  };

  return (
    <>
      {isPaymentSessionIdLoading ? (
        <SpinnerOne className="flex h-4 w-4 animate-spin" size={16} />
      ) : (
        <Button className="mb-6 w-full" onClick={handleCheckout}>
          Get started
        </Button>
      )}
    </>
  );
};

export { ProPG };

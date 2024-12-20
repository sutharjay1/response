"use server";

import { db } from "@/db";
import { Cashfree } from "cashfree-pg";

export const PaymentVerify = async ({ orderId }: { orderId: string }) => {
  const CF_ID = process.env.PG_ID;
  const CF_SK = process.env.PG_SECRET;

  if (!CF_ID || !CF_SK) {
    throw new Error("Cashfree credentials are missing.");
  }

  Cashfree.XClientId = CF_ID;
  Cashfree.XClientSecret = CF_SK;
  Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
  // Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

  try {
    const response = await Cashfree.PGOrderFetchPayments(
      "2023-08-01",
      orderId as string,
    );

    if (response.data && response.data.length > 0) {
      const latestPayment = response.data[0];
      if (latestPayment.payment_status === "SUCCESS") {
        const guestSubscription = await db.guestSubscription.findFirst({
          where: {
            orderId: latestPayment.order_id as string,
          },
        });

        if (!guestSubscription) {
          throw new Error("Subscription not found");
        }

        return { status: "PAID", data: latestPayment };
      }
    } else {
      return { status: "PENDING", data: null };
    }
  } catch (error) {
    console.error("Error details:", error);
    throw new Error("Failed to verify payment");
  }
};

export type PaymentVerifyResponse = Awaited<ReturnType<typeof PaymentVerify>>;

"use server";

import { db } from "@/db";
import { SubscriptionType } from "@prisma/client";
import { Cashfree } from "cashfree-pg";
import crypto from "crypto";

type Props = {
  type: "FREE" | "PRO" | "PREMIUM";
};

export const PaymentSessionId = async ({ type }: Props) => {
  const subscriptionData = await db.subscriptionSeed.findUnique({
    where: {
      type: type as SubscriptionType,
    },
  });

  const generateOrderId = () => {
    const uniqueId = crypto.randomBytes(16).toString("hex");
    const cryptoKey = crypto
      .createHash("sha256")
      .update(uniqueId)
      .digest("hex")
      .substr(0, 12);

    return `rsp-guest-${type}-${cryptoKey}`;
  };

  const CF_ID = process.env.PG_ID;
  const CF_SK = process.env.PG_SECRET;

  if (!CF_ID || !CF_SK) {
    throw new Error("Cashfree credentials are missing.");
  }

  Cashfree.XClientId = CF_ID;
  Cashfree.XClientSecret = CF_SK;
  // Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
  Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

  try {
    const orderId = generateOrderId();
    const request = {
      order_amount: Number(subscriptionData?.amount),
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: `${orderId}`,
        customer_phone: "9867363580",
        customer_name: "Guest",
        customer_email: "guest@sutharjay.com",
      },
      order_meta: {
        return_url: `${process.env.URL}/pg?id=${orderId}` || "",
      },
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", request);

    if (response.status === 200) {
      await db.guestSubscription.create({
        data: {
          id: orderId,
          amount: subscriptionData?.amount as string,
          type: subscriptionData?.type as SubscriptionType,
          orderId: orderId,
          name: subscriptionData?.name as string,
        },
      });

      return {
        data: {
          response: response.data,
        },
        orderId: response.data.order_id,
        status: response.status,
      };
    }
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(
      "Error creating Cashfree order:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export type PaymentSessionIdResponse = Awaited<
  ReturnType<typeof PaymentSessionId>
>;

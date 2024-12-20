import { db } from "@/db";
import { Cashfree } from "cashfree-pg";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

const CF_ID = process.env.PG_ID;
const CF_SECRET = process.env.PG_SECRET;

if (!CF_ID || !CF_SECRET) {
  throw new Error("Cashfree credentials are missing");
}

Cashfree.XClientId = CF_ID;
Cashfree.XClientSecret = CF_SECRET;
// Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

function verifyWebhookSignature(
  signature: string,
  rawBody: string,
  timestamp: string,
): boolean {
  try {
    const signedPayload = timestamp + rawBody;
    const expectedSignature = crypto
      .createHmac("sha256", CF_SECRET!)
      .update(signedPayload)
      .digest("base64");

    return expectedSignature === signature;
  } catch (error) {
    console.error("Signature verification failed:", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-webhook-signature");
    const timestamp = req.headers.get("x-webhook-timestamp");

    if (!signature || !timestamp) {
      return NextResponse.json(
        { error: "Missing headers: signature or timestamp" },
        { status: 400 },
      );
    }

    const rawBody = await req.text();

    const isValidSignature = verifyWebhookSignature(
      signature,
      rawBody,
      timestamp,
    );

    if (!isValidSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    if (
      !payload?.data?.order?.order_id ||
      payload?.type !== "PAYMENT_SUCCESS_WEBHOOK"
    ) {
      return NextResponse.json(
        { error: "Invalid payload structure" },
        { status: 400 },
      );
    }

    const { order_id } = payload.data.order;

    switch (payload.data.payment.payment_status) {
      case "SUCCESS":
        await db.guestSubscription.update({
          where: { id: order_id },
          data: {
            status: "ACTIVE",
            paidAt: new Date(),
          },
        });

        await db.subscription.create({
          data: {
            amount: payload.data.order.order_amount,
            type: payload.data.order.order_id.split("-")[2],
            name: "plan",
            settlementStatus: "UNSETTLED",
          },
        });
        break;

      case "FAILED":
        await db.guestSubscription.update({
          where: { id: order_id },
          data: {
            status: "FAILED",
            failedAt: new Date(),
          },
        });
        break;

      default:
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}

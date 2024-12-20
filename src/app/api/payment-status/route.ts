import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "Order ID required" }, { status: 400 });
  }

  try {
    const subscription = await db.guestSubscription.findUnique({
      where: { id: orderId },
    });

    if (!subscription) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (subscription.status === "ACTIVE") {
      const cookie = await cookies();
      cookie.set("subscriptionId", JSON.stringify(subscription.id), {
        path: "/",
        sameSite: "lax",
        secure: true,
      });
    }

    return NextResponse.json({ status: subscription.status });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    return NextResponse.json(
      { error: "Error checking status" },
      { status: 500 },
    );
  }
}

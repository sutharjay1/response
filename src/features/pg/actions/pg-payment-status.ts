"use server";

import { db } from "@/db";
import { cookies } from "next/headers";

export async function checkSubscriptionStatus(
  orderId: string,
): Promise<Response> {
  if (!orderId) {
    return new Response(JSON.stringify({ error: "Order ID required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const subscription = await db.guestSubscription.findUnique({
      where: { id: orderId },
    });

    if (!subscription) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (subscription.status === "ACTIVE") {
      const cookie = await cookies();
      cookie.set("subscriptionId", JSON.stringify(subscription.id), {
        path: "/",
        sameSite: "lax",
        secure: true,
      });

      cookie.set("subscription-status", JSON.stringify(subscription.status), {
        path: "/",
        sameSite: "lax",
        secure: true,
      });
    }

    return new Response(JSON.stringify({ status: subscription.status }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    return new Response(JSON.stringify({ error: "Error checking status" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

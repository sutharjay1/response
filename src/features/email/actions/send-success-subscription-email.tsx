import { SubscriptionStatus, SubscriptionType, User } from "@prisma/client";
import { sendEmail } from "../lib";
import { TemplateSuccessSubscription } from "../template-success-subscription-email";

export interface TemplateSuccessSubscriptionProps {
  name: string;
  type: SubscriptionType;
  status: SubscriptionStatus;
  amount: string;
  orderId: string;
  plan?: string;
  user: User;
}

export const sendSuccessSubscriptionEmail = async ({
  data,
  email,
}: {
  email: string;
  data: TemplateSuccessSubscriptionProps;
}) => {
  data.plan =
    data.type === "PRO" ? "Pro" : data.type === "PREMIUM" ? "Premium" : "Free";

  try {
    await sendEmail({
      template: <TemplateSuccessSubscription {...data} />,
      subject: "Subscription successful",
      to: email,
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};

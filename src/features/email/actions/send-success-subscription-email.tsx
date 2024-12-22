import { SubscriptionStatus, SubscriptionType } from "@prisma/client";
import { sendEmail } from "../lib";
import { TemplateSuccessSubscription } from "../template-success-subscription-email";

export interface TemplateSuccessSubscriptionProps {
  name: string;
  type: SubscriptionType;
  status: SubscriptionStatus;
  amount: string;
  orderId: string;
}

export const sendSuccessSubscriptionEmail = async ({
  data,
  email,
}: {
  email: string;
  data: TemplateSuccessSubscriptionProps;
}) => {
  try {
    await sendEmail({
      template: <TemplateSuccessSubscription {...data} />,
      subject: "Subscription successful",
      to: email,
    });
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Failed to send email");
  }
};

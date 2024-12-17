import { User } from "@prisma/client";
import { sendEmail } from "../lib";
import { TemplateWelcomeEmail } from "../template-welcome-email";

export const sendWelcomeEmail = async ({ user }: { user: User }) => {
  try {
    await sendEmail({
      template: <TemplateWelcomeEmail user={user} />,
      to: user.email,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email");
  }
};

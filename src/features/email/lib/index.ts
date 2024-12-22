import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import { JSXElementConstructor, ReactElement } from "react";

const plunk = new Plunk(process.env.PLUNK_SECRET_KEY!);

export const sendEmail = async ({
  template,
  subject,
  to,
}: {
  template: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  subject: string;
  to: string;
}) => {
  try {
    const body = await render(template);
    const response = await plunk.emails.send({
      to: to,
      subject,
      body,
    });

    return response.success;
  } catch (error) {
    console.log(error);
  }
};

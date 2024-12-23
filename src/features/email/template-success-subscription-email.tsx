import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { TLarge, TSmall } from "@/components/ui/typography";
import { ArrowLongRight } from "@mynaui/icons-react";
import {
  Body,
  Button,
  Hr,
  Html,
  Img,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import { TemplateSuccessSubscriptionProps } from "./actions/send-success-subscription-email";

export const TemplateSuccessSubscription = ({
  amount,
  status,
  plan,
  user,
}: TemplateSuccessSubscriptionProps) => {
  return (
    <Html>
      <Preview>Thank you for subscribing to Response {plan!} Plan!</Preview>
      <Tailwind>
        <Body className="bg-sidebar font-sans">
          <div className="mx-auto max-w-xl overflow-hidden rounded-lg bg-sidebar shadow-md">
            <CardContent className="px-6 pt-6">
              <CardHeader className="mx-auto w-full p-0 pt-0">
                <Img
                  src={
                    "https://utfs.io/f/xi8FFW9wN0K4PNaKiJSN1w5s87WjSGhcFdgu2OlEa3DYTLX6"
                  }
                  width="85"
                  height="85"
                  alt="Response"
                  className="mx-auto w-auto object-contain"
                />
              </CardHeader>

              <Text className="text-xl leading-8 text-[#37322f]">
                Thank you for subscribing to the{" "}
                <span className="font-semibold">{plan}</span> Plan!
              </Text>

              <Text className="mt-4 text-lg leading-7 text-[#37322f]">
                Hello <span className="font-semibold">{user.name}</span>,
              </Text>

              <Text className="mt-2 text-lg leading-7 text-[#37322f]">
                Your subscription has been successfully activated. You now have
                access to all premium features designed to enhance your feedback
                management.
              </Text>

              <Text className="mt-4 text-lg leading-7 text-[#37322f]">
                <strong>Subscription Details:</strong>
              </Text>
              <Text className="mt-2 text-lg leading-7 text-[#37322f]">
                Amount: <span className="font-semibold">{amount}</span>
              </Text>
              <Text className="mt-2 text-lg leading-7 text-[#37322f]">
                Status:{" "}
                <span
                  className={`font-semibold capitalize ${
                    status === "ACTIVE" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {status}
                </span>
              </Text>

              <Button
                className="mt-6 w-full cursor-pointer rounded-xl bg-[#37322f] py-3 text-center text-lg text-[#d4d3d3]"
                href="https://response.sutharjay.com/dashboard"
              >
                Access Your Premium Dashboard
                <ArrowLongRight
                  className="ml-2 h-5 w-5 transition-transform duration-700 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Button>

              <Hr className="my-6 border-gray-300" />

              <Text className="text-lg leading-7 text-[#37322f]">
                Your Premium Benefits:
              </Text>

              <CardContent className="grid grid-cols-1 gap-6 p-4 pt-4">
                <div className="space-y-2">
                  <TLarge className="text-base">
                    Advanced Analytics Dashboard
                  </TLarge>
                  <TSmall className="text-muted-foreground">
                    Gain deeper insights with custom reporting and advanced
                    tools.
                  </TSmall>
                </div>
                <div className="space-y-2">
                  <TLarge className="text-base">Priority Support</TLarge>
                  <TSmall className="text-muted-foreground">
                    Faster response times and dedicated support to assist with
                    any questions.
                  </TSmall>
                </div>
                <div className="space-y-2">
                  <TLarge className="text-base">Video Surveys</TLarge>
                  <TSmall className="text-muted-foreground">
                    Engage with your audience through interactive video surveys.
                  </TSmall>
                </div>
              </CardContent>

              <Button
                className="mt-6 w-full cursor-pointer rounded-xl bg-[#37322f] py-3 text-center text-lg text-[#d4d3d3]"
                href="https://response.sutharjay.com/dashboard"
              >
                Go to Your Dashboard
                <ArrowLongRight
                  className="ml-2 h-5 w-5 transition-transform duration-700 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col items-center justify-center">
              <TSmall className="mt-4 text-center text-muted-foreground">
                If you have any questions about your subscription, please
                contact our{" "}
                <a
                  href="mailto:response@sutharjay.com"
                  className="text-primary hover:underline"
                >
                  support team
                </a>
                .
              </TSmall>

              <Text className="text-lg leading-7 text-[#37322f]">
                Best regards, Jay Suthar
              </Text>

              <Hr className="border-gray-300" />

              <Text className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Response. All rights reserved.
              </Text>
            </CardFooter>
          </div>
        </Body>
      </Tailwind>
    </Html>
  );
};

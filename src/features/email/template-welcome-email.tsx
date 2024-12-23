import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowLongRight } from "@mynaui/icons-react";
import { User } from "@prisma/client";
import {
  Body,
  Button,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

interface ResponseWelcomeEmailProps {
  user: Partial<User>;
}

export const TemplateWelcomeEmail = ({ user }: ResponseWelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Get Feedback with Response - Your Feedback Management Solution
      </Preview>
      <Tailwind>
        <Body className="bg-sidebar font-sans">
          <Card className="mx-auto px-6 py-5">
            <div className="mx-auto max-w-xl overflow-hidden rounded-lg bg-sidebar shadow-md">
              <CardContent className="pt-6">
                <CardHeader className="mx-auto w-full space-y-0 p-0 pt-0">
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
                <Text className="text-lg leading-7 text-[#37322f]">
                  Hi <span className="font-semibold">{user.name}</span>,
                </Text>

                <Text className="text-lg leading-7 text-[#37322f]">
                  Welcome to <span className="font-semibold">Response</span>!
                </Text>

                <Text className="text-lg leading-7 text-[#37322f]">
                  Get started by creating and sharing feedback forms or explore
                  our template library to speed things up.
                </Text>

                <Button
                  className="w-full cursor-pointer rounded-xl bg-[#37322f] py-3 text-center text-lg text-[#d4d3d3]"
                  href="https://response.sutharjay.com"
                >
                  Start Creating Forms
                  <ArrowLongRight
                    className="ml-2 h-5 w-5 transition-transform duration-700 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Button>

                <Hr className="my-6 border-gray-300" />

                <Text className="text-lg leading-7 text-[#37322f]">
                  Discover pre-designed{" "}
                  <span className="underline">templates</span> that simplify
                  feedback collection. Choose from customer surveys, product
                  feedback, feature requests, and more.
                </Text>

                <Button
                  className="w-full cursor-pointer rounded-xl bg-[#37322f] py-3 text-center text-lg text-[#d4d3d3]"
                  href="https://response.sutharjay.com/template"
                >
                  Explore Templates
                  <ArrowLongRight
                    className="ml-2 h-5 w-5 transition-transform duration-700 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Button>
              </CardContent>

              <CardFooter className="flex flex-col items-center justify-center">
                <Text className="text-lg leading-7 text-[#37322f]">
                  Best regards, Jay Suthar
                </Text>

                <Hr className="border-gray-300" />

                <Text className="text-center text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Response. All rights
                  reserved.
                </Text>
              </CardFooter>
            </div>
          </Card>
        </Body>
      </Tailwind>
    </Html>
  );
};

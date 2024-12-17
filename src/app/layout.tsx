import { geistSans } from "@/features/font";

import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import ClientProvider from "@/providers/client-provider";
import { CSPostHogProvider } from "@/providers/post-hog-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Response - Streamlined Feedback for Better Experiences",
  description:
    "Response is a dynamic feedback platform empowering teams to collect, analyze, and act on user feedback effortlessly. Whether it's video or text responses, Response integrates seamlessly with your workflow, offering an embedded script feature for easy deployment. Unlock actionable insights to improve products and foster meaningful user engagement.",
  keywords: [
    "feedback management",
    "user feedback",
    "video responses",
    "text responses",
    "embedded script",
    "user engagement",
    "SaaS",
    "development",
  ],
  authors: [{ name: "Response Team" }],
  creator: "Jay Suthar",
  openGraph: {
    title: "Response - Your Feedback System",
    description: "Collect feedback easily with video or text on Response.",
    images: [
      {
        url: "https://res.cloudinary.com/cdn-feedback/image/upload/v1733506409/response/response-no-border.png",
      },
    ],
    url: "https://response.sutharjay.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Response - Your Feedback System",
    description: "Collect feedback easily with video or text on Response.",
    images: [
      "https://res.cloudinary.com/cdn-feedback/image/upload/v1733506409/response/response-no-border.png",
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <CSPostHogProvider>
        <body
          className={cn(
            "min-h-screen w-full scroll-smooth bg-background text-[#37322f] antialiased",
            geistSans.variable,
            geistSans.className,
          )}
        >
          <ClientProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                <Toaster />

                {children}
              </TooltipProvider>
            </ThemeProvider>
          </ClientProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}

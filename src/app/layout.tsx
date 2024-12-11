import { geistSans } from "@/features/font";

import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import ClientProvider from "@/providers/client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Response - Instant Feedback for Rapid Product Improvement",
  description:
    "Response is a lightning-fast feedback platform that empowers teams to collect, analyze, and act on user insights in real-time. With video and text responses, plus an easy-to-use embedded script, Response helps you understand and solve user issues at unprecedented speed.",
  keywords: [
    "instant feedback",
    "rapid product improvement",
    "user insights",
    "video responses",
    "text feedback",
    "embedded feedback script",
    "real-time analysis",
    "user experience",
    "SaaS",
    "agile development",
  ],
  authors: [{ name: "Response Team" }],
  creator: "Jay Suthar",
  openGraph: {
    title: "Response - From Feedback to Features at Light Speed",
    description:
      "Collect, analyze, and implement user feedback faster than ever with Response. Video and text options for rich, instant insights.",
    images: [
      {
        url: "https://res.cloudinary.com/cdn-feedback/image/upload/v1733506409/response/response-og-image.png",
        width: 1200,
        height: 630,
        alt: "Response - Instant Feedback Platform",
      },
    ],
    url: "https://response.sutharjay.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Response - Accelerate Your Product Evolution",
    description:
      "Turn user feedback into product improvements at breakneck speed. Video and text responses for comprehensive insights.",
    images: [
      "https://res.cloudinary.com/cdn-feedback/image/upload/v1733506409/response/response-twitter-card.png",
    ],
    creator: "@JaySuthar",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  themeColor: "#FF6B6B",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full scroll-smooth bg-background text-foreground antialiased",
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
    </html>
  );
}

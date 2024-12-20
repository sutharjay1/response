import { db } from "@/db";
import { SettlementStatus } from "@prisma/client";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user?.email) {
        const dbUser = await db.user.findUnique({
          where: { email: session.user.email },
          include: {
            projects: true,
          },
        });

        if (dbUser && session.user) {
          session.user.id = dbUser.id;

          if (dbUser.projects.length > 0) {
            session.user.project = dbUser.projects[0];
          }
        }
      }

      return session;
    },
    async signIn({ user }) {
      if (!user.email || !user) {
        return false;
      }

      const cookie = await cookies();
      const subscriptionId = cookie.get("subscriptionId");

      try {
        const dbUser = await db.user.findUnique({
          where: { email: user.email },
        });

        if (subscriptionId) {
          const subscription = await db.guestSubscription.findUnique({
            where: { id: subscriptionId.value },
          });

          if (subscription && dbUser) {
            const newSubscription = await db.subscription.create({
              data: {
                type: subscription.type,
                amount: subscription.amount,
                name: subscription.name,
                settlementStatus: SettlementStatus.UNSETTLED,
                userId: dbUser.id as string,
              },
            });

            await db.user.update({
              where: { id: dbUser.id },
              data: {
                subscription: {
                  connect: {
                    id: newSubscription.id,
                  },
                },
              },
            });
          } else {
            console.warn("Subscription not found for ID:", subscriptionId);
          }
        }

        if (!dbUser) {
          const newUser = await db.user.create({
            data: {
              email: user.email,
              name: user.name || "Guest",
              avatar: user.image || "",
            },
          });

          await db.project.create({
            data: {
              name: "Feedback Submission Form",
              description:
                "Share your thoughts or suggestions to help us improve. Your feedback is valuable and helps us provide a better experience.",
              banner: `https://res.cloudinary.com/cdn-feedback/image/upload/v1733862248/response/default-banner.jpg`,
              user: {
                connect: {
                  id: newUser.id,
                },
              },
              fields: {
                createMany: {
                  data: [
                    {
                      label: "Name",
                      type: "input",
                      value: "",
                      order: 0,
                    },
                    {
                      label: "Description",
                      type: "textarea",
                      value: "",
                      order: 1,
                    },
                    {
                      label: "Rating",
                      type: "star",
                      value: "0",
                      order: 2,
                    },
                    {
                      label: "Profile Image",
                      type: "image",
                      value: "",
                      order: 3,
                    },
                  ],
                },
              },

              scriptFile: "",
              status: "DEV",
            },
          });

          // await sendWelcomeEmail({
          //   user: newUser,
          // });
        }

        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
  },
  session: {
    strategy: "jwt",
  },
};

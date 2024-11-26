import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/db";

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

      try {
        const dbUser = await db.user.findUnique({
          where: { email: user.email },
        });

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
              name: "My Project",
              user: {
                connect: {
                  id: newUser.id,
                },
              },
              scriptFile: "",
            },
          });
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

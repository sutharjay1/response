import { TUser } from "@/types";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export const useUser = () => {
  const { data: session, update } = useSession();

  const setUser = useCallback(
    async (user: TUser) => {
      try {
        await update({
          ...session,
          user,
        });

        return user;
      } catch (error) {
        console.error("Failed to update user session:", error);
        throw error;
      }
    },
    [session, update],
  );

  return {
    user: session?.user as TUser,
    setUser,
  };
};

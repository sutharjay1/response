"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { BrandGoogleSolid } from "@mynaui/icons-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { errorToast } from "../global/toast";

const ContinueWithGoogle = () => {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/projects");
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      const result = await signIn("google", {
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Google login error:", error);
      errorToast("Something went wrong. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="flex w-full gap-2 space-x-2 px-4"
      onClick={handleGoogleLogin}
      disabled={isLoggingIn}
    >
      <BrandGoogleSolid className="size-8" />
      {isLoggingIn ? "Connecting..." : "Continue with Google"}
    </Button>
  );
};

export default ContinueWithGoogle;

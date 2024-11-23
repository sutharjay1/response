"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GrGoogle } from "react-icons/gr";
import { toast } from "sonner";

const ContinueWithGoogle = () => {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
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
      toast.error("Google login failed", {
        description: "Please try again",
        duration: 3000,
        position: "bottom-left",
        style: {
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          borderColor: "rgba(255, 0, 0, 0.4)",
          color: "white",
        },
        className: "border-[1px]",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full gap-x-2 rounded-xl border border-input bg-transparent py-2 text-base text-primary hover:text-primary"
      onClick={handleGoogleLogin}
      disabled={isLoggingIn}
    >
      <GrGoogle className="mr-4 h-5 w-5" />
      {isLoggingIn ? "Connecting..." : "Continue with Google"}
    </Button>
  );
};

export default ContinueWithGoogle;

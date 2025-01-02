import { Button } from "@/components/ui/button";
import Link from "next/link";

export const FreePG = () => {
  return (
    <Button className="mb-6 w-full" asChild>
      <Link href="/signin">Get started for free</Link>
    </Button>
  );
};

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuSquare } from "react-icons/lu";

export function Nav() {
  return (
    <nav className="flex items-center justify-between p-4 px-8">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <LuSquare className="h-6 w-6" />

          <span className="text-xl font-medium tracking-tight text-black">
            Response
          </span>
        </Link>
      </div>

      <div className="hidden items-center md:flex md:gap-6">
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Features
        </Link>
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Pricing
        </Link>
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Blog
        </Link>
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Changelog
        </Link>
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Careers
        </Link>
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Support
        </Link>
      </div>

      <Button variant="outline" size="sm" asChild>
        <Link href="/signin">Log in</Link>
      </Button>
    </nav>
  );
}

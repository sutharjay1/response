import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "../global/logo";

const navLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Support", href: "#" },
];

export function Nav() {
  return (
    <nav className="flex w-full items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <Logo show />
      </div>

      <div className="hidden md:flex md:gap-x-2">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="rounded-lg px-2 py-0.5 text-sm text-muted-foreground hover:bg-accent hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link href="/signin" passHref>
        <Button variant="outline" size="sm">
          Log in
        </Button>
      </Link>
    </nav>
  );
}

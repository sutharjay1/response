import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuSquare } from "react-icons/lu";

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

      <div className="hidden md:flex md:gap-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="px-4 text-sm text-muted-foreground hover:text-primary"
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

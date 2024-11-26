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

      <div
        className="hidden md:flex"
        style={{
          gap: "0.5rem",
        }}
      >
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

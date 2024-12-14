import { TLarge } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("text-center", className)}>
      <TLarge className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </TLarge>
      <p className="text-muted-foreground">{children}</p>
    </div>
  );
}

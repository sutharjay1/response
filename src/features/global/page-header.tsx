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
    <div className={cn("mb-16 text-center", className)}>
      <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        {title}
      </h1>
      <p className="text-muted-foreground">{children}</p>
    </div>
  );
}

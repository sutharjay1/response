import { QueryLayout } from "@/features/global/query-layout";

const SubmitLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryLayout>
      <div className="flex min-h-svh flex-1 flex-col border border-[#7c533a]/10 bg-sidebar peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-4 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl">
        {children}
      </div>
    </QueryLayout>
  );
};

export default SubmitLayout;

import { Badge } from "@/components/ui/badge";
import { ImMeter } from "react-icons/im";

const StreamlinedForYou = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col justify-between rounded-3xl bg-[#201e1d] p-12 shadow-md">
        <Badge
          icon={<ImMeter className="h-4 w-4" />}
          variant="default"
          className="mb-4 w-fit rounded-full border border-[#201e1d]/80 bg-[#37322f] py-1 text-sm font-medium text-sidebar hover:bg-[#37322f]"
        >
          Feedback Collection
        </Badge>

        <h1 className="mb-1 text-4xl font-bold text-sidebar md:text-5xl">
          Ease of Use
        </h1>

        <p className="mb-8 max-w-md text-lg font-light leading-snug text-muted-foreground">
          Collect meaningful feedback effortlessly using our dynamic forms.
          Support both video and text responses to understand your users better.
        </p>
      </div>

      <div className="flex flex-col justify-between rounded-3xl bg-[#201e1d] p-12 shadow-md">
        <Badge
          icon={<ImMeter className="h-4 w-4" />}
          variant="default"
          className="mb-4 w-fit rounded-full border border-[#201e1d]/80 bg-[#37322f] py-1 text-sm font-medium text-sidebar hover:bg-[#37322f]"
        >
          Actionable Insights
        </Badge>

        <h1 className="mb-1 text-4xl font-bold text-sidebar md:text-5xl">
          Data to Insights
        </h1>

        <p className="mb-8 max-w-md text-lg font-light leading-snug text-muted-foreground">
          Turn feedback into actionable insights with advanced analytics. Gain
          clarity on user sentiment and make data-driven decisions with ease.
        </p>
      </div>
    </div>
  );
};

export default StreamlinedForYou;

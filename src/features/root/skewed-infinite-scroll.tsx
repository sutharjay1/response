import { ReviewCard } from "@/features/root/review-card";
import { cn } from "@/lib/utils";

export const SkewedInfiniteScroll = ({
  reviews,
  className,
}: {
  reviews: {
    img: string;
    name: string;
    username: string;
    body: string;
  }[];
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskComposite: "intersect",
          maskImage: `
          linear-gradient(to right,  transparent, black 5rem),
          linear-gradient(to left,   transparent, black 5rem),
          linear-gradient(to bottom, transparent, black 5rem),
          linear-gradient(to top,    transparent, black 5rem)
        `,
        }}
      >
        <div className="mx-auto grid h-[250px] w-full animate-skew-scroll grid-cols-2 gap-5 sm:w-[600px] sm:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="flex cursor-pointer items-center space-x-2 rounded-xl border border-input shadow-md transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl"
            >
              <ReviewCard
                className="w-full"
                key={review.username}
                {...review}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

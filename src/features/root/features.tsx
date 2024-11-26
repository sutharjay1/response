import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Database,
  BarChart,
  PieChart,
  LineChart,
  Globe,
  Users,
} from "lucide-react";
import Image from "next/image";

const featuresData = [
  {
    id: 1,
    title: "Average order vs. volume",
    description: "Analytics for average order and volume.",
    footer: "Customize bubble size.",
    imageSrc: "/images/chart1.png",
    Icon: Database,
  },
  {
    id: 2,
    title: "Sales by region",
    description: "Insights from different regions.",
    footer: "Bar chart for regional data.",
    imageSrc: "/images/chart2.png",
    Icon: BarChart,
  },
  {
    id: 3,
    title: "Category performance",
    description: "Top-performing categories.",
    footer: "Pie chart with segment details.",
    imageSrc: "/images/chart3.png",
    Icon: PieChart,
  },
  {
    id: 4,
    title: "Global reach",
    description: "Analyze global presence.",
    footer: "Globe chart for global reach.",
    imageSrc: "/images/chart4.png",
    Icon: Globe,
  },
  {
    id: 5,
    title: "User demographics",
    description: "Detailed user demographics.",
    footer: "User chart with segment data.",
    imageSrc: "/images/chart5.png",
    Icon: Users,
  },
  {
    id: 6,
    title: "Growth trends",
    description: "Track growth over time.",
    footer: "Line chart with trend data.",
    imageSrc: "/images/chart6.png",
    Icon: LineChart,
  },
];

const Features = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {featuresData.map((feature) => (
        <Card
          className="group overflow-hidden border-none bg-background px-2 pt-3 shadow-none transition-all"
          key={feature.id}
        >
          <div className="bg-sidebar shadow-sm group-hover:shadow-xl">
            <CardHeader className="m-2 flex items-center gap-2 space-y-0 rounded-t-3xl border-b bg-sidebar py-2 sm:flex-row">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-primary">
                  {feature.title}
                </h2>
              </div>
            </CardHeader>
            <CardContent className="rounded-b-3xl bg-sidebar px-2 pt-4 sm:px-6 sm:pt-6">
              <Image
                src={feature.imageSrc}
                alt={feature.title}
                width={500}
                height={500}
              />
            </CardContent>
          </div>
          <CardFooter className="flex items-center gap-4 p-0 px-2 py-4">
            <feature.Icon className="h-4 w-4" /> {feature.footer}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Features;

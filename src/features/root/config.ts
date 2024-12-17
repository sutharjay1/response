import {
  ChartBarTwo,
  ChartLine,
  ChartPieTwo,
  Database,
  Earth,
  HardDrive,
  Swatches,
  UsersGroup,
} from "@mynaui/icons-react";

export const response = {
  heading: {
    badge: "Respone beta",
    one: "Spotlight",
    two: "What Matters in",
    three: "Feedback",
    four: "Review",
  },
  highlight: {
    message:
      "Effortlessly collect and analyze feedback. Unlock insights with video and text responses.",
  },
  cta: {
    title: {
      one: "Connect to",
      two: "Response",
    },
    description:
      "Harness the power of user feedback to create products that truly resonate",
    button: "Get started",
    badge: "Feedback Collection",
  },
  features: {
    badge: "Analytics Insights",
    title: "Comprehensive Analytics Suite",
    description:
      "Gain deep insights into your user base and product performance",
    items: [
      {
        id: 1,
        title: "Average order vs. volume",
        description: "Analytics for average order and volume.",
        footer: "Customize bubble size.",
        imageSrc: "https://avatar.vercel.sh/chart1.png",
        icon: Database,
      },
      {
        id: 2,
        title: "Sales by region",
        description: "Insights from different regions.",
        footer: "Bar chart for regional data.",
        imageSrc: "https://avatar.vercel.sh/chart2.png",
        icon: ChartBarTwo,
      },
      {
        id: 3,
        title: "Category performance",
        description: "Top-performing categories.",
        footer: "Pie chart with segment details.",
        imageSrc: "https://avatar.vercel.sh/chart3.png",
        icon: ChartPieTwo,
      },
      {
        id: 4,
        title: "Global reach",
        description: "Analyze global presence.",
        footer: "Globe chart for global reach.",
        imageSrc: "https://avatar.vercel.sh/chart4.png",
        icon: Earth,
      },
      {
        id: 5,
        title: "User demographics",
        description: "Detailed user demographics.",
        footer: "User chart with segment data.",
        imageSrc: "https://avatar.vercel.sh/chart5.png",
        icon: UsersGroup,
      },
      {
        id: 6,
        title: "Growth trends",
        description: "Track growth over time.",
        footer: "Line chart with trend data.",
        imageSrc: "https://avatar.vercel.sh/chart6.png",
        icon: ChartLine,
      },
    ],
  },
  reviews: [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      username: "@james",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/james",
    },
  ],

  extra: {
    badge: "Key Features",
    title: "Key Features",
    description: "Powerful tools to revolutionize your feedback process",
    items: [
      {
        badge: "Ease of Use",
        icon: Swatches,
        title: "Ease of Use",
        description:
          "Streamline feedback collection with intuitive forms supporting both video and text responses. Understand your users better with minimal effort.",
        color: "bg-gradient-to-br from-[#201e1d] to-[#37322f]",
      },
      {
        badge: "Actionable Insights",
        icon: HardDrive,
        title: "Data to Insights",
        description:
          "Turn feedback into actionable insights with advanced analytics. Gain clarity on user sentiment and make data-driven decisions with ease.",
        color: "bg-gradient-to-br from-[#37322f] to-[#201e1d]",
      },
    ],
  },

  pricing: {
    badge: "Pricing Plans",
    title: "Flexible Plans for Every Stage",
    description:
      "Choose the perfect plan to scale your feedback collection and analysis",
    plans: {
      free: {
        name: "Starter",
        price: "Free",
        message: "All features included",
        features: [
          "2 form creations",
          "5 video accepts",
          "100 script generations",
        ],
      },
      pro: {
        name: "Pro",
        price: 199,
        message: "All features included",
        features: [
          "25 form creations",
          "50 video accepts",
          "200 script generations",
        ],
      },
      premium: {
        name: "Premium",
        price: 2499,
        message: "All features included",
        features: [
          "ꝏ form creations",
          "ꝏ video accepts",
          "ꝏ script generations",
        ],
      },
    },
  },
};

import { HardDrive, Swatches } from "@mynaui/icons-react";

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

  features: {
    badge: "Analytics Insights",
    title: "Comprehensive Analytics Suite",
    description:
      "Gain deep insights into your user base and product performance",
    items: {
      one: {
        available: "Coming soon",
        title: "Live Feedback Updates",
        description:
          "Instant feedback collection and processing that keeps you connected with your customers. Watch responses flow in real-time and respond quickly to maintain high satisfaction rates.",
        image:
          "https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png",
      },

      two: {
        title: "Smart Analytics",
        description:
          "Turn feedback into actionable insights with our automated analytics. Identify trends, track sentiment, and make data-driven decisions to improve your business.",
        image:
          "https://tailwindui.com/plus/img/component-images/bento-03-performance.png",
      },

      three: {
        title: "Video Reviews",
        description:
          "Capture authentic video testimonials from your customers. Build trust and credibility with powerful visual social proof.",
        image:
          "https://tailwindui.com/plus/img/component-images/bento-03-security.png",
      },
      four: {
        title: "Embeddable Widget",
        description:
          "Seamlessly integrate reviews into any website with our customizable widget. One line of code to showcase your social proof and boost conversion rates.",
        file: [
          {
            name: "widget.js",
            code: `
      <script>
        window.ResponseWidget.init({
          containerId: 'reviews-widget',
          theme: 'light',
          displayCount: 5,
          autoRotate: true
        });
      </script>
    `,
          },
          {
            name: "Example.html",
            code: "",
          },
        ],
      },
    },
  },

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
          "50 script generations",
        ],
      },
      pro: {
        name: "Pro",
        price: 399,
        message: "All features included",
        features: [
          "25 form creations",
          "50 video accepts",
          "150 script generations",
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

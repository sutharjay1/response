"use server";
import { db } from "@/db";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const generateEmbeddedFile = async (projectId: string) => {
  try {
    const result = await db.result.findMany({
      where: {
        projectId,
        isFavorite: true,
      },
      select: {
        id: true,
        value: true,
        isFavorite: true,
      },
    });

    const script = `
(function () {
    // Ensure the script works even if called multiple times
    if (window.embeddedScriptLoaded) return;
    window.embeddedScriptLoaded = true;

    // Function to load script dynamically
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Function to add style
    function addStyle(css) {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    // Main initialization function
    async function initializeUI() {
        // Load Tailwind CSS
        await loadScript('https://cdn.tailwindcss.com');

        // Tailwind Configuration
        window.tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ["Inter", "system-ui", "sans-serif"],
                    },
                    colors: {
                        background: "hsl(var(--background))",
                        foreground: "hsl(var(--foreground))",
                        card: {
                            DEFAULT: "hsl(var(--card))",
                            foreground: "hsl(var(--card-foreground))",
                        },
                        primary: {
                            DEFAULT: "hsl(var(--primary))",
                            foreground: "hsl(var(--primary-foreground))",
                        },
                    }
                }
            }
        };

        // Add CSS Variables
        addStyle(\`
            :root {
                --background: 0 0% 100%;
                --foreground: 240 10% 3.9%;
                --card: 0 0% 100%;
                --card-foreground: 240 10% 3.9%;
                --primary: 346 77% 49%;
                --primary-foreground: 355.7 100% 97.3%;
            }
        \`);

        // Ensure a container exists
        let container = document.getElementById('reviews-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'reviews-container';
            container.className = 'container mx-auto p-4';
            document.body.appendChild(container);
        }

        // Sample feedback data (fallback if no data passed)
const feedbackData =   ${JSON.stringify(result)}.map((item,index) => ({
    id: item.id,
    value: item.value,
  img: \`https://avatar.vercel.sh/\${Date.now()}\${item.id}\`,
  }))








    function cn(...classes) {
                return classes.filter(Boolean).join(' ');
            }

            // Review Card Component
            function ReviewCard({ img, name, username, value }) {
                const card = document.createElement("figure");
                card.className = cn(
                    "relative w-64 cursor-pointer overflow-hidden rounded-lg border p-4",
                    "bg-card border-border shadow-sm hover:shadow-md",
                    "text-card-foreground"
                );

                const userInfoContainer = document.createElement("div");
                userInfoContainer.className = "flex flex-row items-center gap-3 mb-2";

                const avatar = document.createElement("img");
                avatar.src = img;
                avatar.alt = name;
                avatar.className = "rounded-full";
                avatar.width = 40;
                avatar.height = 40;

                const userDetails = document.createElement("div");
                userDetails.className = "flex flex-col";

                const userName = document.createElement("figcaption");
                userName.className = "text-sm font-semibold text-foreground";
                userName.textContent = name;

                const userHandle = document.createElement("p");
                userHandle.className = "text-xs text-muted-foreground";
                userHandle.textContent = username;

                userDetails.appendChild(userName);
                userDetails.appendChild(userHandle);

                userInfoContainer.appendChild(avatar);
                userInfoContainer.appendChild(userDetails);

                const valueText = document.createElement("blockquote");
                valueText.className = "text-sm text-foreground/80";
                valueText.textContent = value;

                card.appendChild(userInfoContainer);
                card.appendChild(valueText);

                return card;
            }

            // Marquee Component
            function createMarquee(reviews, options = {}) {
                const {
                    reverse = false,
                    pauseOnHover = true,
                    repeat = 4,
                    vertical = false
                } = options;

                const marqueeContainer = document.createElement('div');
                 marqueeContainer.className = cn(
                "group flex overflow-hidden p-4",
                vertical ? "flex-col" : "flex-row",
                "[--duration:80s] [--gap:1rem] gap-[var(--gap)]"
            );
            

             for (let i = 0; i < repeat; i++) {
                const track = document.createElement('div');
                track.className = cn(
                    "flex shrink-0 justify-around gap-4",
                    vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
                    reverse ? "[animation-direction:reverse]" : "",
                    pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
                );

                reviews.forEach(review => {
                    track.appendChild(ReviewCard(review));
                });

                marqueeContainer.appendChild(track);
            }
                return marqueeContainer;
            }



 const reviewsContainer = document.getElementById('reviews-container');
                const marquee = createMarquee(feedbackData, {
                    reverse: false,
                    pauseOnHover: true,
                    repeat: 2
                });
                reviewsContainer.appendChild(marquee);


      
    }

    // Handle different document states
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeUI);
    } else {
        initializeUI();
    }
})();
`;

    const buffer = Buffer.from(script, "utf-8");
    const readableStream = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      },
    });

    const uploadResponse = await cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "response/script",
        public_id: `response_${projectId}.js`,
        overwrite: true,
        use_filename: true,
        unique_filename: false,
      },
      async (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary", error);
          return;
        }

        if (result) {
          await db.project.update({
            where: {
              id: projectId,
            },
            data: {
              scriptFile: result.secure_url,
            },
          });
        }

        return result;
      },
    );
    readableStream.pipe(uploadResponse);

    return true;
  } catch (error) {
    console.error("Error generating embedded file:", error);
    throw new Error(`Failed to generate embedded file: ${error}`);
  }
};

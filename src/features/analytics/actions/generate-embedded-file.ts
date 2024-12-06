"use server";
import { db } from "@/db";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";

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
    (function() {
      // Tailwind CSS CDN
      const tailwindScript = document.createElement('script');
      tailwindScript.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(tailwindScript);

      // Configure Tailwind
      const tailwindConfig = document.createElement('script');
      tailwindConfig.textContent = \`
        tailwind.config = {
         theme: {
    extend: {
      fontFamily: {
        gilroy: ["var(--font-gilroy-sans)", ...fontFamily.sans],
        geistSans: ["var(--font-geist-sans)", ...fontFamily.sans],
        geistMono: ["var(--font-geist-mono)", ...fontFamily.mono],
        inter: ["var(--font-inter-sans)", ...fontFamily.sans],
        aeonik: ["var(--font-aeonik)", ...fontFamily.sans],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        shine: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        shine: "shine 8s ease-in-out infinite",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
          },
        }
      \`;
      document.head.appendChild(tailwindConfig);

      // Add CSS Variables
      const style = document.createElement('style');
      style.textContent = \`
        :root {
          --background: 0 0% 100%;
          --foreground: 240 10% 3.9%;
          --card: 0 0% 100%;
          --card-foreground: 240 10% 3.9%;
          --popover: 0 0% 100%;
          --popover-foreground: 240 10% 3.9%;
          --primary: 346 77% 49%;
          --primary-foreground: 355.7 100% 97.3%;
          --secondary: 240 4.8% 95.9%;
          --secondary-foreground: 240 5.9% 10%;
          --muted: 240 4.8% 95.9%;
          --muted-foreground: 240 3.8% 46.1%;
          --accent: 240 4.8% 95.9%;
          --accent-foreground: 240 5.9% 10%;
          --destructive: 0 84.2% 60.2%;
          --destructive-foreground: 0 0% 98%;
          --border: 240 5.9% 90%;
          --input: 240 5.9% 90%;
          --ring: 346 77% 49%;
          --radius: 0.75rem;
        }
      \`;
      document.head.appendChild(style);

      // Results data
      const results = ${JSON.stringify(result)};

      function renderResults(data) {
        // Create main container
        const container = document.createElement('div');
        container.className = 'min-h-screen bg-background text-foreground';

        // Create header
        const header = document.createElement('header');
        header.className = 'border-b';
        header.innerHTML = \`
          <div class="container flex h-16 items-center px-4 mx-auto">
            <div class="flex items-center gap-2">
              <span class="font-semibold">Response</span>
              <span class="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium">
                Beta
              </span>
            </div>
          </div>
        \`;
        container.appendChild(header);

        // Create main content
        const main = document.createElement('main');
        main.className = 'container mx-auto px-4 py-8';

        // Title section with stats
        const titleSection = document.createElement('div');
        titleSection.className = 'mb-8';
        titleSection.innerHTML = \`
          <h1 class="text-4xl font-bold tracking-tight mb-4">Analytics Overview</h1>
          <div class="grid gap-4 md:grid-cols-3">
            <div class="rounded-xl border bg-card p-6 shadow-sm">
              <div class="text-sm font-medium text-muted-foreground mb-2">Total Responses</div>
              <div class="text-2xl font-bold">\${data.length}</div>
            </div>
            <div class="rounded-xl border bg-card p-6 shadow-sm">
              <div class="text-sm font-medium text-muted-foreground mb-2">Favorited</div>
              <div class="text-2xl font-bold">\${data.filter(item => item.isFavorite).length}</div>
            </div>
            <div class="rounded-xl border bg-card p-6 shadow-sm">
              <div class="text-sm font-medium text-muted-foreground mb-2">Last Updated</div>
              <div class="text-2xl font-bold">\${new Date().toLocaleDateString()}</div>
            </div>
          </div>
        \`;
        main.appendChild(titleSection);

        // Results section
        const resultsSection = document.createElement('div');
        resultsSection.className = 'rounded-xl border bg-card shadow-sm';
        
        // Results header
        const resultsHeader = document.createElement('div');
        resultsHeader.className = 'border-b p-4';
        resultsHeader.innerHTML = \`
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Results</h2>
            <span class="text-sm text-muted-foreground">Showing \${data.length} entries</span>
          </div>
        \`;
        resultsSection.appendChild(resultsHeader);

        // Results content
        const resultsContent = document.createElement('div');
        resultsContent.className = 'divide-y';
        
        data.forEach((item) => {
          const resultItem = document.createElement('div');
          resultItem.className = 'flex items-center justify-between p-4';
          resultItem.innerHTML = \`
            <div class="flex-1 space-y-1">
              <div class="flex items-center gap-2">
                <span class="font-medium">\${item.value}</span>
                \${item.isFavorite ? \`
                  <span class="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Favorited
                  </span>
                \` : ''}
              </div>
              <div class="text-sm text-muted-foreground font-mono">
                \${item.id}
              </div>
            </div>
            <button class="rounded-full p-2 hover:bg-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="\${item.isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>
          \`;
          resultsContent.appendChild(resultItem);
        });
        
        resultsSection.appendChild(resultsContent);
        main.appendChild(resultsSection);
        container.appendChild(main);

        // Replace body content
        document.body.innerHTML = '';
        document.body.appendChild(container);
      }

      // Ensure Tailwind is loaded before rendering
      tailwindScript.onload = () => {
        renderResults(results);
      };
    })();
    `;

    const filename = `results-${projectId}.js`;
    const filePath = `./public/${filename}`;
    await fs.writeFile(filePath, script);

    const tempFilePath = `/tmp/${filename}`;
    await fs.writeFile(tempFilePath, script);

    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        tempFilePath,
        {
          resource_type: "raw",
          folder: "response/script",
          public_id: `response_${projectId}`,
          overwrite: true,
          use_filename: true,
          unique_filename: false,
        },
        async (error, result) => {
          if (error) reject(error);
          else resolve(result);

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
        },
      );
    });

    await fs.unlink(tempFilePath);
    await fs.rm(filePath);

    return cloudinaryResponse;
  } catch (error) {
    console.error("Error generating embedded file:", error);
    throw new Error(`Failed to generate embedded file: ${error}`);
  }
};

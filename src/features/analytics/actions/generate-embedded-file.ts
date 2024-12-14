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
        name: true,
        avatar: true,
        value: true,
      },
    });

    const script = `

const reviews = ${JSON.stringify(result)};

function createReviewCard(review) {
    const card = document.createElement('figure');
    card.style.cssText = \`
      position: relative;
      width: 16rem;
      cursor: pointer;
      overflow: hidden;
      border-radius: 0.8rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 1rem;
      background-color: rgba(0, 0, 0, 0.01);
      transition: background-color 0.3s;
    \`;
    card.addEventListener('mouseenter', () => card.style.backgroundColor = \`rgba(0, 0, 0, 0.05)\`);
    card.addEventListener('mouseleave', () => card.style.backgroundColor = \`rgba(0, 0, 0, 0.01)\`);
  
    const content = \`
      <div style="display: flex; flex-direction: row; align-items: center; gap: 0.5rem;">
        <img src="\${review.avatar}" alt="\${review.name}" width="32" height="32" style="border-radius: 50%;">
        <div style="display: flex; flex-direction: column;">
          <figcaption style="font-size: 0.875rem; font-weight: 500;">\${review.name}</figcaption>
          <p style="font-size: 0.75rem;line-height: 1rem;
           font-weight: 500; color:rgb(255 255 255 / 0.4);">email</p>
        </div>
      </div>
      <blockquote style="margin-top: 0.5rem; font-size: 0.875rem; line-height: 1.25rem;">\${review.value}</blockquote>
       
    \`;
  
    card.innerHTML = content;
    return card;
  }
  
  // Function to create a marquee
  function createMarquee(reviews, reverse = false) {
    const marquee = document.createElement('div');
    marquee.style.cssText = \`
      display: flex;
      overflow: hidden;
      user-select: none;
      gap: 1rem;
    \`;
  
    const marqueeInner = document.createElement('div');
    marqueeInner.style.cssText = \`
      display: flex;
      gap: 1rem;
      animation: scroll 60s linear infinite;
      \${reverse ? 'animation-direction: reverse;' : ''}
    \`;
  
    reviews.forEach(review => {
      marqueeInner.appendChild(createReviewCard(review));
    });
  
    // Clone the reviews to create a seamless loop
    reviews.forEach(review => {
      marqueeInner.appendChild(createReviewCard(review));
    });
  
    marquee.appendChild(marqueeInner);
  
    // Pause animation on hover
    marquee.addEventListener('mouseenter', () => {
      marqueeInner.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
      marqueeInner.style.animationPlayState = 'running';
    });
  
    return marquee;
  }
  
  // Create and append the marquees to the document
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.appendChild(createMarquee(reviews));
    container.appendChild(createMarquee(reviews, true));
    document.body.appendChild(container);
  
    // Add the animation keyframes
    const style = document.createElement('style');
    style.textContent = \`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-100% - 1rem)); }
      }
    \`;
    document.head.appendChild(style);
  });
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
            where: { id: projectId },
            data: { scriptFile: result.secure_url },
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

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



function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}


class ReviewMarquee {
  constructor(options = {}) {
      this.config = {
          containerId: options.containerId || 'review-marquee-container',
          reviews: {
              firstRow: options.firstRow || [],
              secondRow: options.secondRow || []
          },
          duration: options.duration || '20s'
      };

      this.init();
  }


  createElement(tag, classes = [], attributes = {}) {
      const element = document.createElement(tag);


      if (Array.isArray(classes)) {
          classes.forEach(cls => {
              if (cls) element.classList.add(cls);
          });
      }


      Object.keys(attributes).forEach(attr => {
          element.setAttribute(attr, attributes[attr]);
      });

      return element;
  }


  createMarquee(options = {}) {
      const {
          children,
          reverse = false,
          pauseOnHover = false
      } = options;


      const marqueeContainer = this.createElement('div', [
          'marquee-container',
          'flex-container'
      ]);
      marqueeContainer.style.setProperty('--duration', this.config.duration);

      for (let i = 0; i < 4; i++) {
          const rowContainer = this.createElement('div', [
              'marquee-row',
              'flex-row',
              pauseOnHover ? 'pause-on-hover' : '',
              reverse ? 'reverse' : ''
          ]);

          children.forEach(child => {
              rowContainer.appendChild(child);
          });

          marqueeContainer.appendChild(rowContainer);
      }

      return marqueeContainer;
  }


  createReviewCard(review) {
      const card = this.createElement('figure', [
          'review-card'
      ]);


      const userInfoContainer = this.createElement('div', [
          'user-info-container'
      ]);


      const avatar = this.createElement('img', [
          'avatar'
      ], {
          src: review.avatar || \`https://avatar.vercel.sh/\${review.name}\`,
          width: '32',
          height: '32',
          alt: review.name
      });


      const nameContainer = this.createElement('div', [
          'name-container'
      ]);

      const nameElement = this.createElement('figcaption', [
          'name'
      ]);
      nameElement.textContent = review.name;

      const emailElement = this.createElement('p', [
          'email'
      ]);
      emailElement.textContent = 'email';


      const reviewText = this.createElement('blockquote', [
          'review-text'
      ]);
      reviewText.textContent = review.value;


      nameContainer.append(nameElement, emailElement);
      userInfoContainer.append(avatar, nameContainer);
      card.append(userInfoContainer, reviewText);

      return card;
  }


  createGradientOverlays() {
      const leftGradient = this.createElement('div', [
          'gradient',
          'left-gradient'
      ]);

      const rightGradient = this.createElement('div', [
          'gradient',
          'right-gradient'
      ]);

      return { leftGradient, rightGradient };
  }


  init() {
      const div = this.createElement('div', [
          'marquee-section'
      ]);

      const section = this.createElement('section', [
          'marquee-section'
      ]);


      const firstRowCards = this.config.reviews.firstRow.map(review =>
          this.createReviewCard(review)
      );


      const firstMarquee = this.createMarquee({
          children: firstRowCards,
          pauseOnHover: true
      });


      const secondRowCards = this.config.reviews.secondRow.map(review =>
          this.createReviewCard(review)
      );


      const secondMarquee = this.createMarquee({
          children: secondRowCards,
          pauseOnHover: true,
          reverse: true
      });

      const { leftGradient, rightGradient } = this.createGradientOverlays();


      section.append(firstMarquee, secondMarquee, leftGradient, rightGradient);


      let container = document.getElementById(this.config.containerId);
      if (!container) {
          container = document.createElement('div');
          container.id = this.config.containerId;
          document.body.appendChild(container);
      }


      container.innerHTML = '';
      container.appendChild(section);

      div.appendChild(container);
      document.body.appendChild(div);
  }


  static injectStyles() {
      const styleElement = document.createElement('style');
      styleElement.textContent = \` 
      .marquee-section {
          position: relative;
          z-index: 10;
          display: flex;
          height: 100%;
          width: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
      }

      .marquee-container {
          display: flex;
          overflow: hidden;
          padding: 0.5rem;
      }

      .marquee-row {
          display: flex;             
          justify-content: center;
          animation: marquee var(--duration, 20s) linear infinite;
      }

      .marquee-row.reverse {
          animation-direction: reverse;
      }

      .marquee-row.pause-on-hover:hover {
          animation-play-state: paused;
      }

      .review-card {
          position: relative;
          width: 16rem;
          cursor: pointer;
          overflow: hidden;
          border-radius: 0.75rem;
          border: 1px solid #000;  
          padding: 1rem;
          background-color: #E3E3E3;  

      }
      
      .review-card:hover {
          background-color: #e0e0e0;  
          border-color: #666666;  
      }

      @media (prefers-color-scheme: dark) {
          .review-card {
              border: 1px solid #03071225;
              background-color: #03071225;  
          }
      
          .review-card:hover {
              background-color: #03071235; 
              border: 1px solid #03071215;
          }
      }

      .user-info-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
      }

      .avatar {
          border-radius: 50%;
      }

      .name-container {
          display: flex;
          flex-direction: column;
      }

      .name {
          font-size: 0.875rem;
          font-weight: 500;
          color: #000000; 
      }

      .email {
          font-size: 0.75rem;
          font-weight: 500;
          color: #666666;  
      }

      .review-text {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #000000;  
      }

      .gradient {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 33%;
          pointer-events: none;
          z-index: 0;
      }

      .left-gradient {
          left: 0;
          background: linear-gradient(to right, #ffffff, transparent);
      }

      .right-gradient {
          right: 0;
          background: linear-gradient(to left, #ffffff, transparent);
      }

    
      @keyframes marquee {
          0% { transform: translateX(30%); }
          100% { transform: translateX(-40%); }
      }

     
      @media (prefers-color-scheme: dark) {
          .name {
              color: #000;  
          }

          .email {
              color: #000011;  
          }

          .left-gradient {
              background: linear-gradient(to right, #fff, transparent);
          }

          .right-gradient {
              background: linear-gradient(to left, #fff, transparent);
          }
      }
  \`;
      document.head.appendChild(styleElement);
  }

}


function initReviewMarquee() {

  document.documentElement.style.setProperty('--background-color', 'black');

  ReviewMarquee.injectStyles();


      const data = ${JSON.stringify(result)};

    
  const firstRow = data?.slice(0, data?.length / 2);
  const secondRow = data?.slice(data?.length / 2);

  const reviews = {
      firstRow,
      secondRow 
  };

  new ReviewMarquee({
      containerId: 'review-marquee-container',
      ...reviews
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReviewMarquee);
} else {
  initReviewMarquee();
  const reviewDiv = document.createElement("div",{
      classList:"review-marquee-container"
  })

  document.body.appendChild(reviewDiv)
}
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

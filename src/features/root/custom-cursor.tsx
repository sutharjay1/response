// "use client";

// import { cn } from "@/lib/utils";
// import { motion } from "motion/react";

// export const Cursor = () => (
//   <svg fill="none" height="18" viewBox="0 0 17 18" width="17">
//     <path
//       d="M15.5036 3.11002L12.5357 15.4055C12.2666 16.5204 10.7637 16.7146 10.22 15.7049L7.4763 10.6094L2.00376 8.65488C0.915938 8.26638 0.891983 6.73663 1.96711 6.31426L13.8314 1.65328C14.7729 1.28341 15.741 2.12672 15.5036 3.11002ZM7.56678 10.6417L7.56645 10.6416C7.56656 10.6416 7.56667 10.6416 7.56678 10.6417L7.65087 10.4062L7.56678 10.6417Z"
//       fill="var(--sky-500)"
//       stroke="var(--sky-400)"
//       strokeWidth="1.5"
//     />
//   </svg>
// );

// export const AnimatedCursor: React.FC<{ className?: string; text: string }> = ({
//   className,
//   text,
// }) => (
//   <motion.div
//     initial={{ x: 0, y: 0 }}
//     animate={{
//       x: [0, "100%", "100%", 0, 0],
//       y: [0, 0, "100%", "100%", 0],
//     }}
//     transition={{
//       duration: 10,
//       repeat: Infinity,
//       ease: "linear",
//     }}
//     className={cn("flex items-center gap-4 bg-indigo-600", className)}
//   >
//     <div className="w-fit rounded-full border border-sky-400 bg-sky-600 px-2 py-1 text-white">
//       {text}
//     </div>
//     <Cursor />
//   </motion.div>
// );

"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const Cursor = () => (
  <svg fill="none" height="18" viewBox="0 0 17 18" width="17">
    <path
      d="M15.5036 3.11002L12.5357 15.4055C12.2666 16.5204 10.7637 16.7146 10.22 15.7049L7.4763 10.6094L2.00376 8.65488C0.915938 8.26638 0.891983 6.73663 1.96711 6.31426L13.8314 1.65328C14.7729 1.28341 15.741 2.12672 15.5036 3.11002ZM7.56678 10.6417L7.56645 10.6416C7.56656 10.6416 7.56667 10.6416 7.56678 10.6417L7.65087 10.4062L7.56678 10.6417Z"
      fill="var(--sky-500)"
      stroke="var(--sky-400)"
      strokeWidth="1.5"
    />
  </svg>
);

export const AnimatedCursor: React.FC<{
  className?: string;
  text: string;
  containerWidth?: number;
  containerHeight?: number;
}> = ({ className, text, containerWidth = 400, containerHeight = 300 }) => {
  const [randomPath, setRandomPath] = useState<{ x: number[]; y: number[] }>({
    x: [0, 0, 0],
    y: [0, 0, 0],
  });

  useEffect(() => {
    // Generate a more random path
    const generateRandomPath = () => {
      return {
        x: [
          0,
          Math.random() * containerWidth * 0.7,
          Math.random() * containerWidth,
        ],
        y: [
          0,
          Math.random() * containerHeight * 0.6,
          Math.random() * containerHeight,
        ],
      };
    };

    // Regenerate path periodically
    const pathInterval = setInterval(() => {
      setRandomPath(generateRandomPath());
    }, 10000); // Change path every 10 seconds

    return () => clearInterval(pathInterval);
  }, [containerWidth, containerHeight]);

  return (
    <motion.div
      initial={{
        x: randomPath.x[0],
        y: randomPath.y[0],
        opacity: 0,
      }}
      animate={{
        x: randomPath.x,
        y: randomPath.y,
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      className={cn(
        "absolute z-50 flex items-center gap-4 bg-black text-white",
        "pointer-events-none",
        className,
      )}
    >
      <div className="w-fit rounded-full border border-sky-400 bg-sky-600/80 px-2 py-1 text-white">
        {text}
      </div>
      <Cursor />
    </motion.div>
  );
};

import React, { useEffect, useRef } from "react";

const VideoBlock = ({ block }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (block.autoplay && videoRef.current) {
      // Ensure video is loaded and try to play
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay failed:", error);
        });
      }
    }
  }, [block.autoplay, block.content]); // Watch for changes in autoplay or video src

  return (
    <video
      ref={videoRef}
      src={block.content}
      controls={block.controls}
      loop={block.loop}
      autoPlay={block.autoplay}
      muted={block.autoplay} // Required for autoplay to work in most browsers
      style={{
        width: block.width || "300px",
        borderRadius: block.borderRadius || "0px",
        maxWidth: "100%",
        height: "auto",
        objectFit: "cover",
      }}
    />
  );
};

export default VideoBlock;

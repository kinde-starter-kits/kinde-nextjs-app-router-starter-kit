"use client";

import { CldVideoPlayer } from "next-cloudinary";

import "next-cloudinary/dist/cld-video-player.css";

function CldVideo() {
  return (
    <div className="mx-auto max-w-md">
      <CldVideoPlayer
        width="1900"
        height="1080"
        src="Golden_Gate_Bridge__SaveYouTube_com__nlefau"
        className="w-full h-auto rounded-lg"/>
    </div>
  );
}

export default CldVideo;

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames], [0, 100]);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 48,
          backgroundColor: "rgba(255,255,255,0.15)",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #FF6B00, #FFD600)",
            borderRadius: 3,
            position: "relative",
          }}
        >
          {/* Glowing head dot at leading edge */}
          <div
            style={{
              position: "absolute",
              right: -10,
              top: "50%",
              transform: "translateY(-50%)",
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#FFD600",
              boxShadow: "0 0 12px 4px rgba(255,214,0,0.9), 0 0 24px 8px rgba(255,107,0,0.5)",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

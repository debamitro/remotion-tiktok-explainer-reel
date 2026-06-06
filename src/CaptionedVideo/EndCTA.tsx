import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TheBoldFont } from "../load-font";

const CTA_DURATION_SEC = 4;

export const EndCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const ctaStartFrame = durationInFrames - Math.round(CTA_DURATION_SEC * fps);

  if (frame < ctaStartFrame) return null;

  const localFrame = frame - ctaStartFrame;

  // Bottom pill: "FOLLOW FOR MORE"
  const followEnter = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.6 },
    durationInFrames: 18,
  });

  const followOpacity = interpolate(followEnter, [0, 0.3, 1], [0, 1, 1]);
  const followY = interpolate(followEnter, [0, 1], [100, 0]);

  // Pulsing fire emoji
  const emojiPulse = 1 + 0.12 * Math.sin(localFrame * 0.25);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 100,
        pointerEvents: "none",
        gap: 16,
        flexDirection: "column",
      }}
    >
      {/* Follow CTA */}
      <div
        style={{
          opacity: followOpacity,
          transform: `translateY(${followY}px)`,
          textAlign: "center",
          background: "linear-gradient(135deg, #FF4500, #FFD600)",
          padding: "22px 56px",
          borderRadius: 100,
          boxShadow:
            "0 8px 40px rgba(255,107,0,0.6), 0 0 80px rgba(255,214,0,0.3)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            transform: `scale(${emojiPulse})`,
            marginRight: 12,
            fontSize: 54,
          }}
        >
          🔥
        </span>
        <span
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: "white",
            fontFamily: TheBoldFont,
            textTransform: "uppercase",
            letterSpacing: 2,
            WebkitTextStroke: "4px rgba(0,0,0,0.4)",
            paintOrder: "stroke",
          }}
        >
          FOLLOW FOR MORE
        </span>
      </div>
    </AbsoluteFill>
  );
};

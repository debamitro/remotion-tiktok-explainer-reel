import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TheBoldFont } from "../load-font";

const HOOK_DURATION_SEC = 3;

export const HookBanner: React.FC<{ hookText: string }> = ({ hookText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hookDurationFrames = Math.round(HOOK_DURATION_SEC * fps);

  if (frame > hookDurationFrames) return null;

  const enterProgress = spring({
    frame,
    fps,
    config: { damping: 9, stiffness: 220, mass: 0.5 },
    durationInFrames: 14,
  });

  const exitStart = hookDurationFrames - 18;
  const exitProgress =
    frame > exitStart
      ? spring({
          frame: frame - exitStart,
          fps,
          config: { damping: 200 },
          durationInFrames: 18,
        })
      : 0;

  const scaleVal =
    interpolate(enterProgress, [0, 1], [0.3, 1]) *
    interpolate(exitProgress, [0, 1], [1, 0.85]);

  const opacity =
    interpolate(enterProgress, [0, 0.4, 1], [0, 1, 1]) *
    interpolate(exitProgress, [0, 1], [1, 0]);

  const translateYVal =
    interpolate(enterProgress, [0, 1], [80, 0]) +
    interpolate(exitProgress, [0, 1], [0, -50]);

  // Pulsing glow ring
  const glowPulse = 1 + 0.08 * Math.sin(frame * 0.3);
  const ringOpacity = interpolate(enterProgress, [0, 0.5, 1], [0, 0.6, 0.85]) *
    interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 120,
        pointerEvents: "none",
      }}
    >
      {/* Glow burst behind text */}
      <div
        style={{
          position: "absolute",
          width: 700 * glowPulse,
          height: 700 * glowPulse,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,214,0,0.35) 0%, rgba(255,107,0,0.15) 50%, transparent 75%)",
          opacity: ringOpacity,
          transform: `translateY(${translateYVal * 0.4}px)`,
        }}
      />
      <div
        style={{
          transform: `scale(${scaleVal}) translateY(${translateYVal}px)`,
          opacity,
          textAlign: "center",
          padding: "0 48px",
          maxWidth: "90%",
        }}
      >
        {/* Pill background */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(255,107,0,0.85), rgba(255,214,0,0.85))",
            borderRadius: 24,
            padding: "18px 40px",
            boxShadow: "0 8px 48px rgba(255,107,0,0.7), 0 0 80px rgba(255,214,0,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: "white",
              fontFamily: TheBoldFont,
              textTransform: "uppercase",
              WebkitTextStroke: "8px rgba(0,0,0,0.6)",
              paintOrder: "stroke",
              lineHeight: 1.15,
              filter:
                "drop-shadow(0 4px 16px rgba(0,0,0,0.8))",
            }}
          >
            {hookText}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Graphic = {
  startSec: number;
  endSec: number;
  emoji?: string;
  image?: string;
  label: string;
  position?: "center" | "top-left" | "top-right";
  accentColor?: string;
  imageWidth?: number;
  imageHeight?: number;
};

const GRAPHICS: Graphic[] = [
];

const GraphicBadge: React.FC<{
  graphic: Graphic;
  frame: number;
  fps: number;
  startFrame: number;
  endFrame: number;
}> = ({ graphic, frame, fps, startFrame, endFrame }) => {
  const localFrame = frame - startFrame;
  const durationFrames = endFrame - startFrame;

  const enterProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 8, stiffness: 400, mass: 0.6 },
    durationInFrames: 12,
  });

  const exitProgress =
    localFrame > durationFrames - 8
      ? spring({
          frame: localFrame - (durationFrames - 8),
          fps,
          config: { damping: 200 },
          durationInFrames: 8,
        })
      : 0;

  // Overshoot bounce: allow scale > 1 before settling
  const scaleValue =
    interpolate(enterProgress, [0, 0.6, 1], [0, 1.15, 1]) *
    interpolate(exitProgress, [0, 1], [1, 0]);

  const opacity = interpolate(enterProgress, [0, 0.4, 1], [0, 0.9, 1]) *
    interpolate(exitProgress, [0, 1], [1, 0]);

  const rotate = interpolate(enterProgress, [0, 0.7, 1], [-18, 4, 0]);

  // Gentle float
  const floatY = Math.sin(localFrame * 0.08) * 4;

  const accentColor = graphic.accentColor ?? "#FFD600";

  return (
    <div
      style={{
        position: "absolute",
        top: 180,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scaleValue}) rotate(${rotate}deg) translateY(${floatY}px)`,
        opacity,
      }}
    >
      {graphic.image ? (
        <Img
          src={staticFile(graphic.image)}
          style={{
            width: graphic.imageWidth ?? 240,
            height: graphic.imageHeight ?? 240,
            objectFit: "contain",
          }}
        />
      ) : (
        <div style={{ fontSize: 200, lineHeight: 1.2 }}>{graphic.emoji}</div>
      )}
      <div
        style={{
          marginTop: 12,
          fontSize: 64,
          fontWeight: 900,
          color: "white",
          textTransform: "uppercase",
          letterSpacing: 3,
          background: `linear-gradient(135deg, ${accentColor}cc, rgba(0,0,0,0.75))`,
          padding: "10px 28px",
          borderRadius: 16,
          backdropFilter: "blur(6px)",
          boxShadow: `0 4px 32px ${accentColor}88`,
          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        {graphic.label}
      </div>
    </div>
  );
};

export const ExplainerGraphics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {GRAPHICS.map((g) => {
        const startFrame = Math.round(g.startSec * fps);
        const endFrame = Math.round(g.endSec * fps);

        if (frame < startFrame || frame > endFrame) {
          return null;
        }

        return (
          <GraphicBadge
            key={g.startSec}
            graphic={g}
            frame={frame}
            fps={fps}
            startFrame={startFrame}
            endFrame={endFrame}
          />
        );
      })}
    </AbsoluteFill>
  );
};

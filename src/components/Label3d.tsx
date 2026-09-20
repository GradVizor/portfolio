import type { ReactNode } from "react";
import { project, type Camera, type PathD, type Vec3 } from "../lib/line3d";
import { MONO } from "./sceneVariants";

const TEXT = "rgba(196,204,232,0.95)";

export function ProjectedPaths({ paths, glow = false }: { paths: PathD[]; glow?: boolean }) {
  return (
    <>
      {paths.map((p, i) => (
        <g key={i}>
          {glow && (
            <path
              d={p.d}
              fill="none"
              stroke={p.stroke}
              strokeWidth={p.width * 3}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={p.dash}
              strokeOpacity={(p.alpha ?? 1) * 0.26}
            />
          )}
          <path
            d={p.d}
            fill="none"
            stroke={p.stroke}
            strokeWidth={p.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={p.dash}
            strokeOpacity={p.alpha ?? 1}
          />
        </g>
      ))}
    </>
  );
}

interface Label3dProps {
  at: Vec3;
  cam: Camera;
  dx?: number;
  dy?: number;
  anchor?: "start" | "middle" | "end";
  fill?: string;
  size?: number;
  children: ReactNode;
}

export default function Label3d({
  at,
  cam,
  dx = 8,
  dy = 0,
  anchor = "start",
  fill = TEXT,
  size = 17,
  children,
}: Label3dProps) {
  const s = project(at, cam);
  return (
    <text
      x={s.x + dx}
      y={s.y + dy}
      style={{ fontFamily: MONO, fontSize: size }}
      fill={fill}
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}
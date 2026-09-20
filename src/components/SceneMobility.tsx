import { motion } from "framer-motion";
import {
  boxEdges,
  circlePts,
  linePaths,
  pathOf,
  project,
  type Line3,
  type PathD,
  type Vec3,
} from "../lib/line3d";
import { makeVariants, type SceneProps } from "./sceneVariants";
import Label3d, { ProjectedPaths } from "./Label3d";

/* Differential rover — cyan 3D line-art, LiDAR sweep + nav path */
const CYAN = "rgba(103,232,249,0.96)";
const CYAN_SOFT = "rgba(103,232,249,0.65)";
const DIMS = "rgba(148,163,184,0.72)";
const DARK = "rgba(6,6,9,0.92)";

const WHEELS: ReadonlyArray<{ x: number; z: number }> = [
  { x: -55, z: -80 },
  { x: -55, z: 80 },
  { x: 55, z: -80 },
  { x: 55, z: 80 },
];

const LIDAR: Vec3 = { x: 0, y: 150, z: 55 };
const NAV: Vec3[] = [
  { x: 0, y: 1, z: 115 },
  { x: 85, y: 1, z: 205 },
  { x: 35, y: 1, z: 315 },
  { x: -70, y: 1, z: 385 },
];

export default function SceneMobility({ active, running, reduce, view }: SceneProps) {
  const V = makeVariants(reduce);
  const cam = view.cam;
  const spin = active && running && !reduce;
  const a = spin ? view.tick * 0.6 : 0;
  const phi = spin ? view.tick * 0.9 : 0.6;

  const body: Line3[] = [
    ...boxEdges({ x: 0, y: 55, z: 0 }, { x: 120, y: 30, z: 220 }).map(
      ([p, q]): Line3 => ({ a: p, b: q, stroke: CYAN, width: 1.7 }),
    ),
    ...boxEdges({ x: 0, y: 82, z: -30 }, { x: 70, y: 18, z: 120 }).map(
      ([p, q]): Line3 => ({ a: p, b: q, stroke: CYAN, width: 1.5 }),
    ),
    { a: { x: 0, y: 88, z: 55 }, b: LIDAR, stroke: CYAN, width: 1.8 },
    {
      a: { x: -35, y: 88, z: -80 },
      b: { x: -62, y: 175, z: -100 },
      stroke: CYAN_SOFT,
      width: 1.2,
    },
  ];

  const spokes: Line3[] = [];
  for (const w of WHEELS) {
    const y = 25;
    spokes.push(
      {
        a: { x: w.x, y: y + 20 * Math.cos(a), z: w.z + 20 * Math.sin(a) },
        b: { x: w.x, y: y - 20 * Math.cos(a), z: w.z - 20 * Math.sin(a) },
        stroke: CYAN_SOFT,
        width: 1,
      },
      {
        a: { x: w.x, y: y - 20 * Math.sin(a), z: w.z + 20 * Math.cos(a) },
        b: { x: w.x, y: y + 20 * Math.sin(a), z: w.z - 20 * Math.cos(a) },
        stroke: CYAN_SOFT,
        width: 1,
      },
    );
  }

  const nav: Line3[] = NAV.slice(0, -1).map((p, i): Line3 => {
    const q = NAV[i + 1];
    return { a: p, b: q, stroke: CYAN_SOFT, width: 1.5, dash: "4 4" };
  });

  const scanRing: PathD = {
    d: pathOf(circlePts({ x: 0, y: 1, z: 55 }, 220, "y", 64), cam, true),
    stroke: DIMS,
    width: 1.3,
    dash: "3 4",
  };
  const drumRing: PathD = {
    d: pathOf(circlePts(LIDAR, 13, "y", 20), cam, true),
    stroke: CYAN,
    width: 1.5,
  };
  const waypointRing: PathD = {
    d: pathOf(circlePts(NAV[3], 16, "y", 24), cam, true),
    stroke: CYAN_SOFT,
    width: 1.2,
    dash: "3 3",
  };

  const dimLines: Line3[] = [
    { a: { x: -108, y: 0, z: -80 }, b: { x: -108, y: 0, z: 80 }, stroke: DIMS, width: 0.9 },
    { a: { x: -113, y: 0, z: -80 }, b: { x: -103, y: 0, z: -80 }, stroke: DIMS, width: 0.9 },
    { a: { x: -113, y: 0, z: 80 }, b: { x: -103, y: 0, z: 80 }, stroke: DIMS, width: 0.9 },
    { a: { x: 78, y: 0, z: 115 }, b: { x: 78, y: 40, z: 115 }, stroke: DIMS, width: 0.9 },
    { a: { x: 74, y: 0, z: 115 }, b: { x: 82, y: 0, z: 115 }, stroke: DIMS, width: 0.9 },
    { a: { x: 74, y: 40, z: 115 }, b: { x: 82, y: 40, z: 115 }, stroke: DIMS, width: 0.9 },
  ];

  const dots: Array<{ p: Vec3; r: number; soft?: boolean }> = [
    { p: { x: -62, y: 175, z: -100 }, r: 2, soft: true },
    { p: NAV[3], r: 2.5 },
  ];

  return (
    <motion.g variants={V.group} initial="hidden" animate={active ? "visible" : "hidden"}>
      <motion.g variants={V.art}>
        <motion.g variants={V.fade}>
          <path
            d={scanRing.d}
            fill="none"
            stroke={scanRing.stroke}
            strokeWidth={scanRing.width}
            strokeDasharray={scanRing.dash}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ProjectedPaths paths={linePaths(nav, cam)} glow />
          <path
            d={waypointRing.d}
            fill="none"
            stroke={waypointRing.stroke}
            strokeWidth={waypointRing.width}
            strokeDasharray={waypointRing.dash}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {WHEELS.map((w, i) => {
            const hub = project({ x: w.x, y: 25, z: w.z }, cam);
            return (
              <g key={`w${i}`}>
                <path
                  d={pathOf(circlePts({ x: w.x, y: 25, z: w.z }, 22, "x", 20), cam, true)}
                  fill="none"
                  stroke={CYAN}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={pathOf(circlePts({ x: w.x, y: 25, z: w.z }, 14, "x", 16), cam, true)}
                  fill="none"
                  stroke={CYAN_SOFT}
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={Math.max(1.5, 3.5 * hub.scale)}
                  fill={DARK}
                  stroke={CYAN}
                  strokeWidth={1.2}
                />
              </g>
            );
          })}
          <ProjectedPaths paths={linePaths([...spokes, ...body], cam)} glow />
          <path
            d={drumRing.d}
            fill="none"
            stroke={drumRing.stroke}
            strokeWidth={drumRing.width}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ProjectedPaths
            paths={linePaths(
              [
                {
                  a: LIDAR,
                  b: {
                    x: 160 * Math.sin(phi),
                    y: LIDAR.y,
                    z: 55 + 160 * Math.cos(phi),
                  },
                  stroke: CYAN,
                  width: 1.2,
                },
              ],
              cam,
            )}
          />
          {dots.map((d, i) => {
            const s = project(d.p, cam);
            return (
              <circle
                key={`d${i}`}
                cx={s.x}
                cy={s.y}
                r={Math.max(1.2, d.r * s.scale)}
                fill={d.soft ? CYAN : DARK}
                stroke={d.soft ? undefined : CYAN}
                strokeWidth={d.soft ? 0 : 0.8}
              />
            );
          })}
        </motion.g>
      </motion.g>

      <motion.g variants={V.dims}>
        <motion.g variants={V.fade}>
          <ProjectedPaths paths={linePaths(dimLines, cam)} />
          <Label3d at={{ x: -108, y: 12, z: 0 }} cam={cam} dx={0} anchor="middle">
            WB 1040mm
          </Label3d>
          <Label3d at={{ x: 82, y: 20, z: 115 }} cam={cam}>
            GC 280mm
          </Label3d>
          <Label3d at={{ x: 22, y: 156, z: 55 }} cam={cam} dy={-8}>
            LIDAR
          </Label3d>
          <Label3d at={{ x: 22, y: 156, z: 55 }} cam={cam} dy={8}>
            360° · 30m
          </Label3d>
          <Label3d at={{ x: -56, y: 10, z: 385 }} cam={cam} dx={-8} anchor="end">
            NAV2 · SLAM
          </Label3d>
        </motion.g>
      </motion.g>
    </motion.g>
  );
}
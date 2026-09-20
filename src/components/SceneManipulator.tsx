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

/* 6-DoF arm — violet 3D line-art, blueprint dimensioning */
const VIOLET = "rgba(167,139,250,0.96)";
const VIOLET_SOFT = "rgba(167,139,250,0.65)";
const DIMS = "rgba(148,163,184,0.72)";
const DARK = "rgba(6,6,9,0.92)";

const PED: Vec3 = { x: -40, y: 40, z: 0 };
const PED_SIZE: Vec3 = { x: 70, y: 80, z: 70 };

/* joint pivots J2(shoulder) → J6(flange); r = center-dot radius */
const JOINTS: ReadonlyArray<{ p: Vec3; r: number }> = [
  { p: { x: -40, y: 150, z: 0 }, r: 3.5 },
  { p: { x: 60, y: 210, z: 45 }, r: 3 },
  { p: { x: 160, y: 165, z: 30 }, r: 2.6 },
  { p: { x: 205, y: 135, z: 18 }, r: 2.2 },
  { p: { x: 252, y: 112, z: 6 }, r: 2 },
];

const FIRST = JOINTS[0].p;
const LAST = JOINTS[4].p;

export default function SceneManipulator({ active, reduce, view }: SceneProps) {
  const V = makeVariants(reduce);
  const cam = view.cam;
  const R_OUT: Vec3 = {
    x: -40 + 260 * Math.SQRT1_2,
    y: 0,
    z: 260 * Math.SQRT1_2,
  };
  const A1: Vec3 = { x: 270, y: 84, z: -10 };
  const A2: Vec3 = { x: 272, y: 104, z: -12 };
  const TCP: Vec3 = { x: 294, y: 95, z: -6 };

  const art: Line3[] = [
    ...boxEdges(PED, PED_SIZE).map(
      ([a, b]): Line3 => ({ a, b, stroke: VIOLET_SOFT, width: 2 }),
    ),
    { a: { x: -40, y: 78, z: 0 }, b: FIRST, stroke: VIOLET, width: 4 },
    { a: FIRST, b: JOINTS[1].p, stroke: VIOLET, width: 3.5 },
    { a: JOINTS[1].p, b: JOINTS[2].p, stroke: VIOLET, width: 3 },
    { a: JOINTS[2].p, b: JOINTS[3].p, stroke: VIOLET, width: 2.5 },
    { a: JOINTS[3].p, b: LAST, stroke: VIOLET, width: 2.5 },
    { a: LAST, b: A1, stroke: VIOLET, width: 1.8 },
    { a: LAST, b: A2, stroke: VIOLET, width: 1.8 },
    { a: A1, b: { x: 294, y: 76, z: -12 }, stroke: VIOLET_SOFT, width: 1.3 },
    { a: A2, b: { x: 297, y: 108, z: -16 }, stroke: VIOLET_SOFT, width: 1.3 },
  ];

  const ticks: Line3[] = Array.from({ length: 8 }, (_, i) => {
    const t = (i / 8) * Math.PI * 2;
    return {
      a: { x: -40 + Math.cos(t) * 130, y: 0, z: Math.sin(t) * 130 },
      b: { x: -40 + Math.cos(t) * 140, y: 0, z: Math.sin(t) * 140 },
      stroke: VIOLET,
      width: 1.8,
    } as Line3;
  });

  const floorRing: PathD = {
    d: pathOf(circlePts({ x: -40, y: 0, z: 0 }, 130, "y", 48), cam, true),
    stroke: VIOLET_SOFT,
    width: 1.5,
  };
  const reachRing: PathD = {
    d: pathOf(circlePts({ x: -40, y: 0, z: 0 }, 260, "y", 72), cam, true),
    stroke: DIMS,
    width: 1.3,
    dash: "3 4",
  };
  const jointRings: PathD[] = JOINTS.map((j) => ({
    d: pathOf(circlePts(j.p, j.r * 2, "z", 20), cam, true),
    stroke: VIOLET,
    width: 1.5,
  }));

  const dimLines: Line3[] = [
    { a: { x: -170, y: 0, z: 0 }, b: { x: -170, y: 210, z: 0 }, stroke: DIMS, width: 0.9 },
    { a: { x: -173, y: 0, z: 0 }, b: { x: -167, y: 0, z: 0 }, stroke: DIMS, width: 0.9 },
    { a: { x: -173, y: 210, z: 0 }, b: { x: -167, y: 210, z: 0 }, stroke: DIMS, width: 0.9 },
    { a: { x: -40, y: 0, z: 0 }, b: R_OUT, stroke: DIMS, width: 0.9 },
    {
      a: { x: R_OUT.x - 3 * Math.SQRT1_2, y: 0, z: R_OUT.z + 3 * Math.SQRT1_2 },
      b: { x: R_OUT.x + 3 * Math.SQRT1_2, y: 0, z: R_OUT.z - 3 * Math.SQRT1_2 },
      stroke: DIMS,
      width: 0.9,
    },
    { a: { x: -62, y: 0, z: -37 }, b: { x: -62, y: 0, z: 37 }, stroke: DIMS, width: 0.9 },
    { a: { x: -62, y: -2, z: -37 }, b: { x: -62, y: 6, z: -37 }, stroke: DIMS, width: 0.9 },
    { a: { x: -62, y: -2, z: 37 }, b: { x: -62, y: 6, z: 37 }, stroke: DIMS, width: 0.9 },
    {
      a: { x: 60, y: 210, z: 45 },
      b: { x: 48.8, y: 203.3, z: 40 },
      stroke: DIMS,
      width: 0.75,
      dash: "2 2",
    },
    {
      a: { x: 60, y: 210, z: 45 },
      b: { x: 72.6, y: 204.3, z: 43.1 },
      stroke: DIMS,
      width: 0.75,
      dash: "2 2",
    },
  ];

  return (
    <motion.g variants={V.group} initial="hidden" animate={active ? "visible" : "hidden"}>
      <motion.g variants={V.art}>
        <motion.g variants={V.fade}>
          <path
            d={floorRing.d}
            fill="none"
            stroke={floorRing.stroke}
            strokeWidth={floorRing.width}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={reachRing.d}
            fill="none"
            stroke={reachRing.stroke}
            strokeWidth={reachRing.width}
            strokeDasharray={reachRing.dash}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ProjectedPaths paths={linePaths(ticks, cam)} glow />
          <ProjectedPaths paths={linePaths(art, cam)} glow />
        </motion.g>
        <motion.g variants={V.fade}>
          <ProjectedPaths paths={jointRings} glow />
          {JOINTS.map((j, i) => {
            const s = project(j.p, cam);
            return (
              <circle
                key={`c${i}`}
                cx={s.x}
                cy={s.y}
                r={Math.max(1.5, j.r * s.scale)}
                fill={DARK}
                stroke={VIOLET}
                strokeWidth={1.2}
              />
            );
          })}
        </motion.g>
      </motion.g>

      <motion.g variants={V.dims}>
        <motion.g variants={V.fade}>
          <ProjectedPaths paths={linePaths(dimLines, cam)} />
          <Label3d at={{ x: -40, y: 82, z: 0 }} cam={cam} dx={-6} dy={2} anchor="end">
            J1
          </Label3d>
          {JOINTS.map((j, i) => (
            <Label3d key={`l${i}`} at={j.p} cam={cam} dx={8} dy={4}>
              {`J${i + 2}`}
            </Label3d>
          ))}
          <Label3d at={TCP} cam={cam} dx={8} dy={2}>
            TCP
          </Label3d>
          <Label3d at={{ x: -166, y: 105, z: 0 }} cam={cam}>
            H 680mm
          </Label3d>
          <Label3d at={{ x: 57.9, y: 0, z: 91.9 }} cam={cam} dy={-4}>
            R 1250mm
          </Label3d>
          <Label3d at={{ x: -62, y: 14, z: 0 }} cam={cam} dx={0} anchor="middle">
            B 800mm
          </Label3d>
          <Label3d at={{ x: 76, y: 222, z: 48 }} cam={cam}>
            θ3
          </Label3d>
        </motion.g>
      </motion.g>
    </motion.g>
  );
}
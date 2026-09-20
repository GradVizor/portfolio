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

/* Quadcopter — fuchsia 3D line-art, fly-away exit */
const PINK = "rgba(240,171,252,0.96)";
const PINK_SOFT = "rgba(240,171,252,0.65)";
const DIMS = "rgba(148,163,184,0.72)";
const DARK = "rgba(6,6,9,0.92)";

const MOTORS: ReadonlyArray<Vec3> = [
  { x: -75, y: 170, z: -75 },
  { x: 75, y: 170, z: -75 },
  { x: -75, y: 170, z: 75 },
  { x: 75, y: 170, z: 75 },
];
const BODY: Vec3 = { x: 0, y: 170, z: 0 };

export default function SceneAerial({ active, running, reduce, view }: SceneProps) {
  const V = makeVariants(reduce);
  const cam = view.cam;
  const spin = active && running && !reduce;
  const beta = spin ? view.tick * 8 : 0;

  const orbitRing: PathD = {
    d: pathOf(circlePts({ x: 0, y: 2, z: 0 }, 230, "y", 72), cam, true),
    stroke: PINK_SOFT,
    width: 1.1,
    dash: "4 4",
  };
  const shadow: PathD = {
    d: pathOf(circlePts({ x: 0, y: 2, z: 0 }, 62, "y", 32), cam, true),
    stroke: PINK_SOFT,
    width: 1.2,
  };

  const drone: Line3[] = [
    ...boxEdges(BODY, { x: 40, y: 16, z: 40 }).map(
      ([a, b]): Line3 => ({ a, b, stroke: PINK, width: 1.6 }),
    ),
    ...MOTORS.map((m): Line3 => ({ a: BODY, b: m, stroke: PINK, width: 1.4 })),
    { a: { x: 0, y: 162, z: 0 }, b: { x: 0, y: 147, z: 0 }, stroke: PINK, width: 1.5 },
    { a: { x: 0, y: 178, z: 0 }, b: { x: 0, y: 198, z: 0 }, stroke: PINK_SOFT, width: 1.1 },
  ];

  const blades: Line3[] = [];
  for (const m of MOTORS) {
    blades.push(
      {
        a: { x: m.x - 17 * Math.cos(beta), y: m.y, z: m.z - 17 * Math.sin(beta) },
        b: { x: m.x + 17 * Math.cos(beta), y: m.y, z: m.z + 17 * Math.sin(beta) },
        stroke: PINK,
        width: 1.6,
      },
      {
        a: { x: m.x + 17 * Math.sin(beta), y: m.y, z: m.z - 17 * Math.cos(beta) },
        b: { x: m.x - 17 * Math.sin(beta), y: m.y, z: m.z + 17 * Math.cos(beta) },
        stroke: PINK,
        width: 1.6,
      },
    );
  }

  const altLine: Line3 = {
    a: { x: 0, y: 2, z: 70 },
    b: { x: 0, y: 168, z: 70 },
    stroke: DIMS,
    width: 1.1,
    dash: "3 4",
  };

  const mAngle = spin ? view.tick * 0.4 : 0.9;
  const marker: Vec3 = { x: 230 * Math.cos(mAngle), y: 2, z: 230 * Math.sin(mAngle) };

  const wsDim: Line3[] = [
    { a: MOTORS[0], b: MOTORS[3], stroke: DIMS, width: 1.1 },
    {
      a: { x: -75 - 2.8, y: 170, z: -75 + 2.8 },
      b: { x: -75 + 2.8, y: 170, z: -75 - 2.8 },
      stroke: DIMS,
      width: 1.1,
    },
    {
      a: { x: 75 - 2.8, y: 170, z: 75 + 2.8 },
      b: { x: 75 + 2.8, y: 170, z: 75 - 2.8 },
      stroke: DIMS,
      width: 1.1,
    },
  ];

  const motorDots = MOTORS.map((m, i) => {
    const s = project(m, cam);
    return (
      <g key={`m${i}`}>
        <path
          d={pathOf(circlePts(m, 5, "y", 16), cam, true)}
          fill="none"
          stroke={PINK}
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={s.x}
          cy={s.y}
          r={Math.max(1.5, 2.5 * s.scale)}
          fill={DARK}
          stroke={PINK}
          strokeWidth={1}
        />
      </g>
    );
  });

  const lens = project({ x: 0, y: 143, z: 0 }, cam);
  const tip = project({ x: 0, y: 200, z: 0 }, cam);
  const mdot = project(marker, cam);

  return (
    <motion.g variants={V.group} initial="hidden" animate={active ? "visible" : "hidden"}>
      <motion.g variants={V.art}>
        {/* orbit + shadow + altitude stay behind the fly-away */}
        <motion.g variants={V.fade}>
          <path
            d={orbitRing.d}
            fill="none"
            stroke={orbitRing.stroke}
            strokeWidth={orbitRing.width}
            strokeDasharray={orbitRing.dash}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={shadow.d}
            fill="none"
            stroke={shadow.stroke}
            strokeWidth={shadow.width}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ProjectedPaths paths={linePaths([altLine], cam)} />
          <circle
            cx={mdot.x}
            cy={mdot.y}
            r={Math.max(1.5, 2.5 * mdot.scale)}
            fill={PINK}
          />
        </motion.g>
        {/* drone fly-away cluster — plain children, no variants */}
        <motion.g variants={V.fade}>
          <motion.g
            animate={{
              y: -view.exit * 720,
              scale: 1 - view.exit * 0.55,
              opacity: 1 - view.exit * 0.9,
            }}
            transition={{ duration: 0.15, ease: "linear" }}
            style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5 }}
          >
            <ProjectedPaths paths={linePaths([...drone, ...blades], cam)} glow />
            {motorDots}
            <circle
              cx={lens.x}
              cy={lens.y}
              r={Math.max(2.5, 4 * lens.scale)}
              fill={DARK}
              stroke={PINK}
              strokeWidth={1}
            />
            <circle cx={lens.x} cy={lens.y} r={Math.max(1, 1.5 * lens.scale)} fill={PINK} />
            <circle cx={tip.x} cy={tip.y} r={Math.max(1.2, 2 * tip.scale)} fill={PINK} />
          </motion.g>
        </motion.g>
      </motion.g>

      <motion.g variants={V.dims}>
        <motion.g variants={V.fade}>
          <ProjectedPaths paths={linePaths(wsDim, cam)} />
          <Label3d at={{ x: 12, y: 170, z: 12 }} cam={cam} dx={0} dy={-14} anchor="middle">
            WS 520mm
          </Label3d>
          <Label3d at={{ x: 0, y: 85, z: 70 }} cam={cam} dx={8}>
            ALT 120m
          </Label3d>
          <Label3d at={{ x: -138, y: 176, z: -40 }} cam={cam}>
            AUTO · HOLD 120m
          </Label3d>
          <Label3d at={{ x: -138, y: 188, z: -40 }} cam={cam}>
            GPS · S-GPS
          </Label3d>
          <Label3d at={{ x: -138, y: 150, z: -40 }} cam={cam}>
            MTOW 890g
          </Label3d>
          <Label3d at={{ x: -138, y: 162, z: -40 }} cam={cam}>
            PX4 · WFB
          </Label3d>
        </motion.g>
      </motion.g>
    </motion.g>
  );
}
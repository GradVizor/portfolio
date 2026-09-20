export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Camera {
  azimuth: number;
  elevation: number;
  f: number;
  k: number;
  cx: number;
  cy: number;
}

export interface Screen {
  x: number;
  y: number;
  z: number;
  scale: number;
}

export function project(p: Vec3, c: Camera): Screen {
  const ca = Math.cos(c.azimuth);
  const sa = Math.sin(c.azimuth);
  const ce = Math.cos(c.elevation);
  const se = Math.sin(c.elevation);
  const x1 = p.x * ca + p.z * sa;
  const z1 = -p.x * sa + p.z * ca;
  const y1 = p.y;
  const y2 = y1 * ce - z1 * se;
  const z2 = y1 * se + z1 * ce;
  const sc = c.f / (c.f + z2);
  return { x: c.cx + x1 * sc * c.k, y: c.cy - y2 * sc * c.k, z: z2, scale: sc };
}

export interface Line3 {
  a: Vec3;
  b: Vec3;
  stroke: string;
  width: number;
  dash?: string;
  alpha?: number;
}

export interface PathD {
  d: string;
  stroke: string;
  width: number;
  dash?: string;
  alpha?: number;
  close?: boolean;
}

export function pathOf(pts: Vec3[], cam: Camera, close = false): string {
  if (pts.length === 0) return "";
  const s = pts.map((p) => project(p, cam));
  let d = `M${s[0].x.toFixed(2)},${s[0].y.toFixed(2)}`;
  for (let i = 1; i < s.length; i++) d += ` L${s[i].x.toFixed(2)},${s[i].y.toFixed(2)}`;
  if (close) d += " Z";
  return d;
}

export function linePaths(ls: Line3[], cam: Camera): PathD[] {
  return ls.map((l) => {
    const a = project(l.a, cam);
    const b = project(l.b, cam);
    const zavg = (a.z + b.z) / 2;
    const depth = depthAlpha(zavg);
    return {
      d: `M${a.x.toFixed(2)},${a.y.toFixed(2)} L${b.x.toFixed(2)},${b.y.toFixed(2)}`,
      stroke: l.stroke,
      width: l.width,
      dash: l.dash,
      alpha: (l.alpha ?? 1) * depth,
    };
  });
}

export function circlePts(
  center: Vec3,
  radius: number,
  axis: "x" | "y" | "z",
  seg = 24,
): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i < seg; i++) {
    const t = (i / seg) * Math.PI * 2;
    const cs = Math.cos(t) * radius;
    const sn = Math.sin(t) * radius;
    if (axis === "y") pts.push({ x: center.x + cs, y: center.y, z: center.z + sn });
    else if (axis === "x") pts.push({ x: center.x, y: center.y + cs, z: center.z + sn });
    else pts.push({ x: center.x + cs, y: center.y + sn, z: center.z });
  }
  return pts;
}

export function boxEdges(center: Vec3, size: Vec3): Array<[Vec3, Vec3]> {
  const hx = size.x / 2;
  const hy = size.y / 2;
  const hz = size.z / 2;
  const c = center;
  const corners: Vec3[] = [
    { x: c.x - hx, y: c.y - hy, z: c.z - hz },
    { x: c.x + hx, y: c.y - hy, z: c.z - hz },
    { x: c.x + hx, y: c.y + hy, z: c.z - hz },
    { x: c.x - hx, y: c.y + hy, z: c.z - hz },
    { x: c.x - hx, y: c.y - hy, z: c.z + hz },
    { x: c.x + hx, y: c.y - hy, z: c.z + hz },
    { x: c.x + hx, y: c.y + hy, z: c.z + hz },
    { x: c.x - hx, y: c.y + hy, z: c.z + hz },
  ];
  const idx: Array<[number, number]> = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];
  return idx.map(([i, j]) => [corners[i], corners[j]] as [Vec3, Vec3]);
}

export function groundGrid(
  extentX: number,
  extentZ: number,
  step: number,
  stroke: string,
  width: number,
): Line3[] {
  const lines: Line3[] = [];
  for (let x = -extentX; x <= extentX + 0.001; x += step) {
    lines.push({
      a: { x, y: 0, z: -extentZ },
      b: { x, y: 0, z: extentZ },
      stroke,
      width,
    });
  }
  for (let z = -extentZ; z <= extentZ + 0.001; z += step) {
    lines.push({
      a: { x: -extentX, y: 0, z },
      b: { x: extentX, y: 0, z },
      stroke,
      width,
    });
  }
  return lines;
}

export function depthAlpha(zavg: number): number {
  return Math.max(0.66, Math.min(1, 1.2 - ((zavg + 320) / 640) * 0.5));
}
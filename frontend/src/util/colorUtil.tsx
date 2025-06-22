import { interpolateRgb } from "d3-interpolate";

const normalize = (value: number, min: number, max: number): number => {
  return (value - min) / (max - min);
};

const rgbStringToHex = (rgb: string): string => {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) throw new Error("Invalid RGB format");

  const [r, g, b] = match.slice(1).map(Number);
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
};

export const getColorFromScale = (
  value: number,
  min: number,
  max: number,
  scale: [number, string][]
): string => {
  const normalizedValue = normalize(value, min, max);
  if (isNaN(normalizedValue)) return "#000000";
  if (normalizedValue <= scale[0][0]) return scale[0][1];
  if (normalizedValue >= scale[scale.length - 1][0])
    return scale[scale.length - 1][1];

  for (let i = 0; i < scale.length - 1; i++) {
    const [v0, c0] = scale[i];
    const [v1, c1] = scale[i + 1];
    if (normalizedValue >= v0 && normalizedValue <= v1) {
      const t = (normalizedValue - v0) / (v1 - v0);
      const rgb = interpolateRgb(c0, c1)(t);
      return rgbStringToHex(rgb);
    }
  }
  return "#000000"; // fallback
};

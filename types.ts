
export interface Coordinate {
  x: number;
  y: number;
}

export interface GradientColor {
  hex: string;
  name?: string;
}

export const AVATAR_COLORS: string[] = [
  "#FFB3D9", // Pastel pink (0)
  "#87CEEB", // Sky blue (1)
  "#4A90E2", // Medium blue (2)
  "#2C3E50", // Dark blue-gray (3)
  "#050510", // Deepest dark blue (Background) (4)
  "#FFFFFF", // Subtle White Highlight (5)
];

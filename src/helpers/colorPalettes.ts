/**
 * Determines an appropriate text color (black or white) based on a given background color to ensure readability.
 *
 * @param {String} [bgColor] -  A hexadecimal color code in the format "#RRGGBB".
 * @returns {String} - A string representing the text color, either #000000 for black or #ffffff for white.
 */
export const getTextColorBasedOnBg = (bgColor: string): string => {
  const r = parseInt(bgColor.substring(1, 3), 16);
  const g = parseInt(bgColor.substring(3, 5), 16);
  const b = parseInt(bgColor.substring(5, 7), 16);
  const color = (r * 299 + g * 587 + b * 114) / 1000;

  return color > 128 ? "#000000" : "#ffffff";
};

export interface IColorPalette {
  id: number;
  colors: Array<string>;
}

export const COLOR_PALETTES: Array<IColorPalette> = [
  {
    id: 0,
    colors: ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
  },
  {
    id: 1,
    colors: ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"],
  },
  {
    id: 2,
    colors: ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"],
  },
  {
    id: 3,
    colors: ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"],
  },
  {
    id: 4,
    colors: ["#000814", "#001d3d", "#003566", "#ffc300", "#ffd60a"],
  },
  {
    id: 5,
    colors: ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"],
  },
  {
    id: 6,
    colors: ["#22223b", "#4a4e69", "#9a8c98", "#c9ada7", "#f2e9e4"],
  },
  {
    id: 7,
    colors: ["#390099", "#9e0059", "#ff0054", "#ff5400", "#ffbd00"],
  },
  {
    id: 8,
    colors: ["#34a0a4", "#168aad", "#1a759f", "#1e6091", "#184e77"],
  },
  {
    id: 9,
    colors: ["#ff99c8", "#fcf6bd", "#d0f4de", "#a9def9", "#e4c1f9"],
  },
];

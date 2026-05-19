/**
 * Centralised color definitions used across the project.
 *
 * Each name describes how severe the color is (darker == more severe).
 * Components should import these names rather than hardcoding hex values.
 */
export const SEVERITY = {
  veryLight: '#ffeda0', // lowest severity
  light: '#fed976',
  lightMid: '#feb24c',
  mid: '#fd8d3c',
  midDark: '#fc4e2a',
  dark: '#e31a1c',
  veryDark: '#bd0026',
  extreme: '#7f0000', // highest severity
} as const;

export const GREEN_SEVERITY = {
  veryLight: '#ebfbf1',
  light: '#c6f5d5',
  lightMid: '#90e9b2',
  mid: '#53d486',
  midDark: '#28b763',
  dark: '#1b944d',
  veryDark: '#16753f',
  extreme: '#125f34',
} as const;

export const YELLOW_SEVERITY = {
  veryLight: '#ffffcc',
  light: '#ffeda0',
  lightMid: '#fed976',
  mid: '#feb24c',
  midDark: '#fd8d3c',
  dark: '#fc4e2a',
  veryDark: '#e31a1c',
  extreme: '#b10026',
} as const;

export const BLUE_SEVERITY = {
  veryLight: '#eff6ff',
  light: '#dbeafe',
  lightMid: '#bfdbfe',
  mid: '#93c5fd',
  midDark: '#60a5fa',
  dark: '#3b82f6',
  veryDark: '#2563eb',
  extreme: '#1d4ed8',
} as const;


/**
 * Choropleth scale definition that ties thresholds to named severity values.
 * Use `CHOROPLETH_SCALE` when rendering legends or building scale helpers.
 */
export const CHOROPLETH_SCALE_POVERTY: Array<{ threshold: number; colorName: keyof typeof SEVERITY; label: string }> = [
  { threshold: 0, colorName: 'veryLight', label: '< 4%' },
  { threshold: 4, colorName: 'light', label: '4 - 6%' },
  { threshold: 6, colorName: 'lightMid', label: '6 - 8%' },
  { threshold: 8, colorName: 'mid', label: '8 - 10%' },
  { threshold: 10, colorName: 'midDark', label: '10 - 12%' },
  { threshold: 12, colorName: 'dark', label: '12 - 15%' },
  { threshold: 15, colorName: 'veryDark', label: '15 - 20%' },
  { threshold: 20, colorName: 'extreme', label: '>= 20%' },
];

export const CHOROPLETH_SCALE_INCOME: Array<{ threshold: number; colorName: keyof typeof GREEN_SEVERITY; label: string }> = [
  { threshold: 0, colorName: 'veryLight', label: '< Rp 30rb' },
  { threshold: 30000, colorName: 'light', label: '30 - 40rb' },
  { threshold: 40000, colorName: 'lightMid', label: '40 - 50rb' },
  { threshold: 50000, colorName: 'mid', label: '50 - 60rb' },
  { threshold: 60000, colorName: 'midDark', label: '60 - 80rb' },
  { threshold: 80000, colorName: 'dark', label: '80 - 100rb' },
  { threshold: 100000, colorName: 'veryDark', label: '100 - 150rb' },
  { threshold: 150000, colorName: 'extreme', label: '>= 150rb' },
];

export const CHOROPLETH_SCALE_INEQUALITY: Array<{ threshold: number; colorName: keyof typeof BLUE_SEVERITY; label: string }> = [
  { threshold: 0, colorName: 'veryLight', label: '< 0.28' },
  { threshold: 0.28, colorName: 'light', label: '0.28 - 0.30' },
  { threshold: 0.30, colorName: 'lightMid', label: '0.30 - 0.32' },
  { threshold: 0.32, colorName: 'mid', label: '0.32 - 0.34' },
  { threshold: 0.34, colorName: 'midDark', label: '0.34 - 0.36' },
  { threshold: 0.36, colorName: 'dark', label: '0.36 - 0.38' },
  { threshold: 0.38, colorName: 'veryDark', label: '0.38 - 0.40' },
  { threshold: 0.40, colorName: 'extreme', label: '>= 0.40' },
];

export const CHOROPLETH_COLORS = CHOROPLETH_SCALE_POVERTY.map((s) => SEVERITY[s.colorName]);

export default {
  SEVERITY,
  GREEN_SEVERITY,
  YELLOW_SEVERITY,
  BLUE_SEVERITY,
  CHOROPLETH_SCALE: CHOROPLETH_SCALE_POVERTY,
  CHOROPLETH_COLORS,
};

export interface OrbitalRegion {
  innerRadius: number
  outerRadius: number
  color: string
  opacity: number
  particleCount: number
  particleColor: string
  particleSizeMin: number
  particleSizeMax: number
}

export const ORBITAL_REGIONS: OrbitalRegion[] = [
  {
    innerRadius: 2.45,
    outerRadius: 2.72,
    color: '#3d5a80',
    opacity: 0.40,
    particleCount: 800,
    particleColor: '#3d5a80',
    particleSizeMin: 0.015,
    particleSizeMax: 0.030,
  },
  {
    innerRadius: 2.82,
    outerRadius: 3.18,
    color: '#8fb4d8',
    opacity: 0.30,
    particleCount: 700,
    particleColor: '#8fb4d8',
    particleSizeMin: 0.015,
    particleSizeMax: 0.030,
  },
  {
    innerRadius: 3.22,
    outerRadius: 3.42,
    color: '#5a7fa8',
    opacity: 0.24,
    particleCount: 600,
    particleColor: '#5a7fa8',
    particleSizeMin: 0.010,
    particleSizeMax: 0.025,
  },
  {
    innerRadius: 3.50,
    outerRadius: 3.58,
    color: '#a8c4e8',
    opacity: 0.14,
    particleCount: 500,
    particleColor: '#a8c4e8',
    particleSizeMin: 0.008,
    particleSizeMax: 0.020,
  },
]

export const TOTAL_PARTICLES = ORBITAL_REGIONS.reduce(
  (sum, region) => sum + region.particleCount,
  0,
)

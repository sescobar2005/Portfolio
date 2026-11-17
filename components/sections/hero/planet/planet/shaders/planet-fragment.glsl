precision highp float;

uniform float uTime;
uniform mat3 uPlanetToRing;
uniform float uRingOrbitAngle;
uniform vec3 uLightDir;
uniform vec4 uRingBands1;
uniform vec4 uRingBands2;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;

// ── Hash & noise ─────────────────────────────────────────────────────
float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(
      mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
      mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x),
      f.y
    ),
    mix(
      mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
      mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x),
      f.y
    ),
    f.z
  );
}

float fbm(vec3 p, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;

  for (int i = 0; i < octaves; i++) {
    value += noise(p * frequency) * amplitude;
    p *= 2.0;
    amplitude *= 0.5;
    frequency *= 2.0;
  }

  return value;
}

float fbm2(vec2 p, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int i = 0; i < octaves; i++) {
    value += noise(vec3(p, 0.0)) * amplitude;
    p *= 2.0;
    amplitude *= 0.5;
  }

  return value;
}

// ── Domain warp ──────────────────────────────────────────────────────
vec2 domainWarp(vec2 p) {
  vec2 q = vec2(
    fbm2(p + vec2(0.0, 0.0), 4),
    fbm2(p + vec2(5.2, 1.3), 4)
  );
  vec2 r = vec2(
    fbm2(p + 4.0 * q + vec2(1.7, 9.2), 4),
    fbm2(p + 4.0 * q + vec2(8.3, 2.8), 4)
  );
  return p + r;
}

// ── Biome color palette ──────────────────────────────────────────────
// Deep oceans
const vec3 OCEAN_ABYSSAL = vec3(0.024, 0.036, 0.078);  // #061a32
const vec3 OCEAN_DEEP    = vec3(0.028, 0.070, 0.100);  // #0b3550
const vec3 OCEAN         = vec3(0.071, 0.095, 0.130);  // #12617a
const vec3 OCEAN_TURQ    = vec3(0.141, 0.608, 0.608);  // #249b9b
const vec3 OCEAN_SHALLOW = vec3(0.392, 0.788, 0.733);  // #64c9bb

// Forest & vegetation
const vec3 FOREST_DEEP   = vec3(0.090, 0.235, 0.196);  // #173c32
const vec3 FOREST_EMERALD= vec3(0.157, 0.420, 0.302);  // #286b4d
const vec3 FOREST_GREEN  = vec3(0.239, 0.525, 0.357);  // #3d865b
const vec3 FOREST_OLIVE  = vec3(0.471, 0.525, 0.325);  // #788653
const vec3 FOREST_MUTED  = vec3(0.627, 0.651, 0.427);  // #a0a66d

// Mountains & rocky terrain
const vec3 MOUNTAIN_SLATE  = vec3(0.224, 0.267, 0.290);  // #39444a
const vec3 MOUNTAIN_STONE  = vec3(0.400, 0.451, 0.435);  // #66736f
const vec3 MOUNTAIN_MINERAL= vec3(0.522, 0.545, 0.502);  // #858b80
const vec3 MOUNTAIN_LIGHT  = vec3(0.702, 0.710, 0.647);  // #b3b5a5
const vec3 MOUNTAIN_DEPOSIT= vec3(0.655, 0.486, 0.333);  // #a77c55

// Desert & mineral regions
const vec3 DESERT_OCHRE   = vec3(0.659, 0.529, 0.333);  // #a88755
const vec3 DESERT_SANDSTONE= vec3(0.741, 0.604, 0.412);  // #bd9a69
const vec3 DESERT_MINERAL = vec3(0.400, 0.325, 0.247);  // #66533f
const vec3 DESERT_RUST    = vec3(0.596, 0.400, 0.310);  // #98664f

// Ice & high-altitude
const vec3 ICE_GLACIER = vec3(0.867, 0.914, 0.910);  // #dce9e8
const vec3 ICE_PALE    = vec3(0.714, 0.831, 0.839);  // #b6d4d7
const vec3 ICE_COLD    = vec3(0.471, 0.620, 0.682);  // #789eae

// Procedural craters with raised rims and recessed interiors.
float craterField(vec3 p) {
  vec3 cell = floor(p);
  vec3 local = fract(p) - 0.5;

  float crater = 0.0;

  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      for (int z = -1; z <= 1; z++) {
        vec3 neighbor = vec3(float(x), float(y), float(z));
        vec3 id = cell + neighbor;

        vec3 center = vec3(
          hash(id + 1.7),
          hash(id + 4.2),
          hash(id + 8.6)
        ) - 0.5;

        vec3 offset = neighbor + center * 0.72;
        float distanceToCenter = length(local - offset);

        float radius = mix(0.10, 0.23, hash(id + 12.4));

        float bowl = 1.0 - smoothstep(radius * 0.42, radius, distanceToCenter);
        float rim = smoothstep(radius * 0.76, radius * 0.94, distanceToCenter)
          * (1.0 - smoothstep(radius * 0.94, radius * 1.18, distanceToCenter));

        crater += bowl * 0.65;
        crater -= rim * 0.22;
      }
    }
  }

  return crater;
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 direction = normalize(vPosition);

  float time = uTime * 0.002;

  vec3 terrainPosition = direction * 5.0;

  terrainPosition += vec3(
    fbm(terrainPosition * 1.4, 5),
    fbm(terrainPosition * 1.4 + 8.3, 5),
    fbm(terrainPosition * 1.4 + 3.7, 5)
  ) * 0.8;

  terrainPosition += vec3(time, 0.0, 0.0);

  // Natural continental shapes.
  float continents = fbm(terrainPosition * 1.35, 5);
  float continentalDetail = fbm(terrainPosition * 3.2, 5);

  float landMask = smoothstep(
    0.42,
    0.56,
    continents + continentalDetail * 0.10
  );

  // Geological surface variation.
  float mountains = fbm(terrainPosition * 5.0, 5);
  float fineDetail = fbm(terrainPosition * 14.0, 5);
  float elevation = mountains * 0.65 + fineDetail * 0.35;

  float craters = craterField(direction * 34.0);

  // Ocean colors — deep Earth blue, natural and subdued.
  vec3 oceanDeep = vec3(0.008, 0.020, 0.050);
  vec3 ocean = vec3(0.015, 0.045, 0.110);
  vec3 coastal = vec3(0.030, 0.080, 0.150);
  vec3 shallow = vec3(0.060, 0.130, 0.200);

  vec3 oceanColor = mix(
    oceanDeep,
    ocean,
    smoothstep(0.2, 0.55, continents)
  );
  oceanColor = mix(
    oceanColor,
    coastal,
    smoothstep(0.45, 0.72, continentalDetail) * 0.35
  );
  oceanColor = mix(
    oceanColor,
    shallow,
    smoothstep(0.60, 0.85, continentalDetail) * 0.20
  );

  // Land colors — natural earth tones: olive greens, browns, stone greys.
  vec3 landLow = vec3(0.180, 0.220, 0.160);
  vec3 landMid = vec3(0.280, 0.320, 0.240);
  vec3 landHigh = vec3(0.400, 0.440, 0.340);
  vec3 mountainColor = vec3(0.520, 0.500, 0.460);
  vec3 iceColor = vec3(0.900, 0.920, 0.940);

  vec3 landColor = mix(
    landLow,
    landMid,
    smoothstep(0.25, 0.65, elevation)
  );
  landColor = mix(
    landColor,
    landHigh,
    smoothstep(0.48, 0.78, elevation) * 0.60
  );
  landColor = mix(
    landColor,
    mountainColor,
    smoothstep(0.70, 0.90, elevation) * 0.50
  );

  // Crater coloration — darker spots.
  landColor *= 0.85 + craters * 0.30;

  // Ice at high latitudes and high elevations.
  float latitude = abs(normal.y);
  float iceMask = smoothstep(0.72, 0.95, latitude) *
                  smoothstep(0.65, 0.90, elevation);
  landColor = mix(landColor, iceColor, iceMask);
  oceanColor = mix(oceanColor, iceColor, iceMask * 0.50);

  vec3 color = mix(oceanColor, landColor, landMask);

  // Fine geological grain.
  float surfaceGrain = noise(terrainPosition * 45.0);
  color *= 0.90 + surfaceGrain * 0.18;

  // Lighting.
  vec3 lightDirection = normalize(uLightDir);

  float diffuse = max(dot(normal, lightDirection), 0.0);

  // Procedural ring shadows cast onto the planet surface.
  vec3 pRing = uPlanetToRing * vPosition;
  vec3 lRing = uPlanetToRing * lightDirection;

  // Apply ring orbital rotation so shadows follow ring movement.
  float cosA = cos(uRingOrbitAngle);
  float sinA = sin(uRingOrbitAngle);

  vec3 pRingOrbital = vec3(
    pRing.x * cosA - pRing.z * sinA,
    pRing.y,
    pRing.x * sinA + pRing.z * cosA
  );

  vec3 lRingOrbital = vec3(
    lRing.x * cosA - lRing.z * sinA,
    lRing.y,
    lRing.x * sinA + lRing.z * cosA
  );

  float ringShadow = 1.0;
  if (abs(lRingOrbital.y) > 0.001) {
    float t = -pRingOrbital.y / lRingOrbital.y;

    if (t > 0.0) {
      vec3 hit = pRingOrbital + t * lRingOrbital;
      float radius = sqrt(hit.x * hit.x + hit.z * hit.z);

      float softness = 0.08;
      float shadow = 0.0;

      // Band 1: 2.45 - 2.72
      if (radius >= uRingBands1.x && radius <= uRingBands1.y) {
        float d = min(radius - uRingBands1.x, uRingBands1.y - radius);
        shadow = max(shadow, smoothstep(0.0, softness, d));
      }
      // Band 2: 2.82 - 3.18
      if (radius >= uRingBands1.z && radius <= uRingBands1.w) {
        float d = min(radius - uRingBands1.z, uRingBands1.w - radius);
        shadow = max(shadow, smoothstep(0.0, softness, d));
      }
      // Band 3: 3.22 - 3.42
      if (radius >= uRingBands2.x && radius <= uRingBands2.y) {
        float d = min(radius - uRingBands2.x, uRingBands2.y - radius);
        shadow = max(shadow, smoothstep(0.0, softness, d));
      }
      // Band 4: 3.50 - 3.58
      if (radius >= uRingBands2.z && radius <= uRingBands2.w) {
        float d = min(radius - uRingBands2.z, uRingBands2.w - radius);
        shadow = max(shadow, smoothstep(0.0, softness, d));
      }

      ringShadow = 1.0 - shadow * 0.5;
    }
  }

  diffuse *= ringShadow;

  float ambient = 0.13;
  float lighting = ambient + diffuse * 1.18;

  vec3 viewDirection = normalize(vViewPosition);

  float fresnel = pow(
    1.0 - max(dot(normal, viewDirection), 0.0),
    3.0
  );

  // Subtle Earth-like atmospheric rim.
  vec3 atmosphereColor = vec3(0.300, 0.500, 0.750);

  color *= lighting;
  color += atmosphereColor * fresnel * 0.22;

  gl_FragColor = vec4(color, 1.0);
}

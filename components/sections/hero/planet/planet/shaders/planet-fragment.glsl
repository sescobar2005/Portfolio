precision highp float;

uniform float uTime;
uniform vec3 uLightDir;

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
const vec3 OCEAN_ABYSSAL = vec3(0.012, 0.063, 0.122);  // #03101f
const vec3 OCEAN_DEEP    = vec3(0.024, 0.114, 0.196);  // #061d32
const vec3 OCEAN         = vec3(0.039, 0.208, 0.314);  // #0a3550
const vec3 OCEAN_TURQ    = vec3(0.071, 0.376, 0.471);  // #126078
const vec3 OCEAN_SHALLOW = vec3(0.145, 0.553, 0.569);  // #258d91

// Forest & vegetation
const vec3 FOREST_DEEP   = vec3(0.063, 0.184, 0.161);  // #102f29
const vec3 FOREST_EMERALD= vec3(0.098, 0.275, 0.220);  // #194638
const vec3 FOREST_GREEN  = vec3(0.157, 0.420, 0.302);  // #286b4d
const vec3 FOREST_OLIVE  = vec3(0.212, 0.525, 0.357);  // #36865b
const vec3 FOREST_MUTED  = vec3(0.388, 0.525, 0.353);  // #63865a
const vec3 FOREST_DARKER = vec3(0.490, 0.537, 0.345);  // #7d8958

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

  // ── Domain-warped terrain sampling ─────────────────────────────
  vec3 terrainPosition = direction * 5.0;

  terrainPosition += vec3(
    fbm(terrainPosition * 1.4, 5),
    fbm(terrainPosition * 1.4 + 8.3, 5),
    fbm(terrainPosition * 1.4 + 3.7, 5)
  ) * 0.8;

  terrainPosition += vec3(time, 0.0, 0.0);

  // ── Continental distribution with domain warp ──────────────────
  vec2 dw = domainWarp(terrainPosition.xz * 0.8);
  float continents = fbm(
    vec3(terrainPosition.xz * 1.35 + dw * 0.5, terrainPosition.y),
    5
  );
  float continentalDetail = fbm(
    vec3(terrainPosition.xz * 3.2 + dw.yx * 0.3, terrainPosition.y),
    5
  );

  float landMask = smoothstep(
    0.40,
    0.55,
    continents + continentalDetail * 0.12
  );

  // ── Elevation from multi-scale noise ───────────────────────────
  float mountains = fbm(terrainPosition * 5.0, 5);
  float fineDetail = fbm(terrainPosition * 14.0, 5);
  float elevation = mountains * 0.65 + fineDetail * 0.35;

  float craters = craterField(direction * 34.0);

  // ── Ocean colors — layered depth palette ───────────────────────
  // Distance-from-land factor for coastal transitions
  float distFromLand = 1.0 - landMask;

  vec3 oceanColor = mix(
    OCEAN_ABYSSAL,
    OCEAN_DEEP,
    smoothstep(0.3, 0.7, distFromLand)
  );
  oceanColor = mix(
    oceanColor,
    OCEAN,
    smoothstep(0.5, 0.85, distFromLand)
  );
  oceanColor = mix(
    oceanColor,
    OCEAN_TURQ,
    smoothstep(0.75, 0.95, distFromLand) * 0.5
  );
  oceanColor = mix(
    oceanColor,
    OCEAN_SHALLOW,
    smoothstep(0.88, 1.0, distFromLand) * 0.3
  );

  // ── Land colors — biome classification ───────────────────────────
  // Moisture-like field from low-frequency noise
  float moisture = fbm2(terrainPosition.xy * 0.9 + dw * 0.4, 4);
  moisture = smoothstep(0.35, 0.65, moisture);

  // Vegetation texture: multi-frequency noise variation for natural detail
  float vegFine = noise(terrainPosition * 22.0);
  float vegMid  = noise(terrainPosition * 8.0);
  float vegVariation = vegFine * 0.5 + vegMid * 0.5;

  // Desert likelihood: dry (low moisture) + mid-to-high elevation
  float desertFactor = (1.0 - moisture) * smoothstep(0.40, 0.75, elevation);

  // Mountain factor: high elevation
  float mountainFactor = smoothstep(0.55, 0.85, elevation);

  // Forest factor: moisture + lower-to-mid elevation
  float forestFactor = moisture * (1.0 - mountainFactor) * (1.0 - desertFactor);

  // Base terrain: forest with multi-shade vegetation texture
  vec3 forestBase = mix(
    FOREST_DEEP,
    FOREST_EMERALD,
    smoothstep(0.20, 0.55, elevation)
  );
  forestBase = mix(
    forestBase,
    FOREST_GREEN,
    smoothstep(0.40, 0.70, elevation) * forestFactor * 0.4
  );
  forestBase = mix(
    forestBase,
    FOREST_OLIVE,
    vegVariation * moisture * 0.35
  );
  forestBase = mix(
    forestBase,
    FOREST_MUTED,
    (1.0 - vegVariation) * (1.0 - moisture) * 0.25
  );

  vec3 landColor = forestBase;

  // Apply mountain stone at high elevations
  landColor = mix(
    landColor,
    mix(MOUNTAIN_SLATE, MOUNTAIN_LIGHT, smoothstep(0.5, 0.8, elevation)),
    mountainFactor * 0.80
  );

  // Mineral deposits in mountain regions
  float mineralDeposit = fbm(terrainPosition * 9.0, 4);
  landColor = mix(
    landColor,
    MOUNTAIN_DEPOSIT,
    mineralDeposit * mountainFactor * 0.25
  );

  // ── Crater coloration — darker spots on land ───────────────────
  landColor *= 0.85 + craters * 0.30;

  // ── Ice at high latitudes and high elevations ──────────────────
  float latitude = abs(normal.y);
  float iceMask = smoothstep(0.72, 0.95, latitude) *
                  smoothstep(0.65, 0.90, elevation);
  landColor = mix(landColor, ICE_GLACIER, iceMask);
  oceanColor = mix(oceanColor, ICE_PALE, iceMask * 0.50);

  // ── Combine ocean and land ─────────────────────────────────────
  vec3 color = mix(oceanColor, landColor, landMask);

  // ── Fine geological grain ──────────────────────────────────────
  float surfaceGrain = noise(terrainPosition * 45.0);
  color *= 0.90 + surfaceGrain * 0.18;

  // ── Lighting ───────────────────────────────────────────────────
  vec3 lightDirection = normalize(uLightDir);

  // Diffuse lighting with subtle ambient for dark-side visibility.
  float diffuse = max(dot(normal, lightDirection), 0.0);
  float ambient = 0.10;
  float lighting = ambient + diffuse * 1.15;

  // ── Atmospheric Fresnel rim ────────────────────────────────────
  vec3 viewDirection = normalize(vViewPosition);

  float fresnel = pow(
    1.0 - max(dot(normal, viewDirection), 0.0),
    3.0
  );

  // Subtle Earth-like atmospheric rim.
  vec3 atmosphereColor = vec3(0.300, 0.500, 0.750);

  color *= lighting;
  color += atmosphereColor * fresnel * 0.20;

  gl_FragColor = vec4(color, 1.0);
}

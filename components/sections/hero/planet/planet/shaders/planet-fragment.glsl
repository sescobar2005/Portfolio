precision highp float;

uniform float uTime;
uniform mat3 uPlanetToRing;
uniform vec3 uLightDir;
uniform vec4 uRingBands1;
uniform vec4 uRingBands2;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;

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

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int i = 0; i < 5; i++) {
    value += noise(p) * amplitude;
    p *= 2.0;
    amplitude *= 0.5;
  }

  return value;
}

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
    fbm(terrainPosition * 1.4),
    fbm(terrainPosition * 1.4 + 8.3),
    fbm(terrainPosition * 1.4 + 3.7)
  ) * 0.8;

  terrainPosition += vec3(time, 0.0, 0.0);

  // Natural continental shapes.
  float continents = fbm(terrainPosition * 1.35);
  float continentalDetail = fbm(terrainPosition * 3.2);

  float landMask = smoothstep(
    0.42,
    0.56,
    continents + continentalDetail * 0.10
  );

  // Geological surface variation.
  float mountains = fbm(terrainPosition * 5.0);
  float fineDetail = fbm(terrainPosition * 14.0);
  float elevation = mountains * 0.65 + fineDetail * 0.35;

  float craters = craterField(direction * 34.0);

  // Ocean colors — deep Earth blue, less turquoise.
  vec3 oceanDeep = vec3(0.010, 0.025, 0.060);
  vec3 ocean = vec3(0.020, 0.060, 0.140);
  vec3 coastal = vec3(0.040, 0.100, 0.180);
  vec3 shallow = vec3(0.080, 0.160, 0.240);

  vec3 oceanColor = mix(
    oceanDeep,
    ocean,
    smoothstep(0.2, 0.55, continents)
  );
  oceanColor = mix(
    oceanColor,
    coastal,
    smoothstep(0.45, 0.72, continentalDetail) * 0.40
  );
  oceanColor = mix(
    oceanColor,
    shallow,
    smoothstep(0.60, 0.85, continentalDetail) * 0.25
  );

  // Land colors — purple/violet palette, not emerald.
  vec3 landLow = vec3(0.120, 0.080, 0.200);
  vec3 landMid = vec3(0.220, 0.160, 0.340);
  vec3 landHigh = vec3(0.380, 0.280, 0.480);
  vec3 mountainColor = vec3(0.500, 0.420, 0.550);
  vec3 iceColor = vec3(0.950, 0.920, 0.980);

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

  float ringShadow = 1.0;
  if (abs(lRing.y) > 0.001) {
    float t = -pRing.y / lRing.y;

    if (t > 0.0) {
      vec3 hit = pRing + t * lRing;
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

  // Subtle violet atmospheric rim complementing the purple planet.
  vec3 atmosphereColor = vec3(0.350, 0.450, 0.800);

  color *= lighting;
  color += atmosphereColor * fresnel * 0.22;

  gl_FragColor = vec4(color, 1.0);
}

precision highp float;

uniform float uTime;
uniform float uOpacity;
uniform float uSeed;
uniform float uFrequency;
uniform float uAspect;
uniform vec3 uTint;

varying vec2 vUv;

// --------------------------------------------------
// HASH
// --------------------------------------------------

float hash(vec2 p) {
    return fract(
        sin(dot(p, vec2(127.1, 311.7)))
        * 43758.5453
    );
}

// --------------------------------------------------
// VALUE NOISE
// --------------------------------------------------

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(
        mix(a, b, f.x),
        mix(c, d, f.x),
        f.y
    );
}

// --------------------------------------------------
// FBM
// --------------------------------------------------

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
        value += noise(p) * amplitude;
        p *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}

// --------------------------------------------------
// NEBULA
// --------------------------------------------------

void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uAspect;

    float time = uTime * 0.012;

    vec2 p = uv * uFrequency + uSeed;

    // Large-scale distortion
    vec2 warp = vec2(
        fbm(p * 0.65 + vec2(time, 0.0)),
        fbm(p * 0.65 + vec2(3.7, 5.2))
    );

    // Organic cloud deformation
    vec2 distorted = p + (warp - 0.5) * 3.0;

    // Multiple cloud scales
    float largeClouds = fbm(distorted * 0.8);

    float mediumClouds = fbm(
        distorted * 1.8 + vec2(8.2, 2.4)
    );

    float smallClouds = fbm(
        distorted * 3.5 + vec2(4.1, 7.3)
    );

    float cloudField =
        largeClouds * 0.55 +
        mediumClouds * 0.30 +
        smallClouds * 0.15;

    // Expanded density range
    float density = smoothstep(
        0.32,
        0.62,
        cloudField
    );

    // Preserve internal variations
    density *= 0.75 + mediumClouds * 0.5;

    
    // --------------------------------------------------
    // RECTANGULAR EDGE FALLOFF
    // --------------------------------------------------

    float normalizedX = abs(uv.x) / uAspect;
    float normalizedY = abs(uv.y);

    float edgeX = 1.0 - smoothstep(
        0.72,
        1.0,
        normalizedX
    );

    float edgeY = 1.0 - smoothstep(
        0.72,
        1.0,
        normalizedY
    );

    float edge = edgeX * edgeY;

    // Color
    vec3 deepBlue = vec3(0.025, 0.045, 0.16);
    vec3 violet = vec3(0.28, 0.09, 0.55);
    vec3 cyan = vec3(0.08, 0.38, 0.65);

    vec3 color = mix(
        deepBlue,
        uTint,
        smoothstep(0.25, 0.75, density)
    );

    color = mix(
        color,
        violet,
        mediumClouds * 0.35
    );

    color = mix(
        color,
        cyan,
        smallClouds * density * 0.3
    );

    // Final alpha
    float alpha = density * edge * uOpacity;

    gl_FragColor = vec4(color, alpha);
}
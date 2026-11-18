uniform float uTime;

varying vec3 vPosition;
varying float vDepth;

void main() {
  // Spiral coordinates
  float angle = atan(vPosition.x, vPosition.z);
  float radius = sqrt(vPosition.x * vPosition.x + vPosition.z * vPosition.z);

  // Spiral pattern - multiple arms
  float spiral = sin(angle * 3.0 - radius * 0.1 - uTime * 0.3) * 0.3 + 0.7;

  // Distance gradient from center
  float dist = radius / 150.0;

  // Base color - deep space to colorful
  vec3 color = mix(vec3(0.2, 0.3, 0.6), vec3(0.4, 0.2, 0.8), dist);

  // Bright glow near center
  float glow = exp(-radius * 0.02);
  color += vec3(0.2, 0.3, 0.5) * glow * 0.3;

  // Alpha based on distance and spiral brightness
  float alpha = spiral * 0.2 * glow;

  gl_FragColor = vec4(color, alpha);
}

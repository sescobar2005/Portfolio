uniform float uTime;

varying vec3 vPosition;
varying float vDepth;

void main() {
  // Noise-based density for nebula clouds
  float noise = fract(sin(dot(vPosition.xyz, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
  float noise2 = fract(sin(dot(vPosition.xyz, vec3(45.164, 12.9898, 78.233))) * 43758.5453);
  
  float density = noise * 0.6 + noise2 * 0.4;
  
  // Color based on position
  vec3 color = mix(vec3(0.2, 0.3, 0.6), vec3(0.4, 0.2, 0.8), vPosition.x * 0.5 + 0.5);
  color = mix(color, vec3(0.8, 0.3, 0.5), vPosition.z * 0.5 + 0.5);
  
  float alpha = density * 0.15;
  
  gl_FragColor = vec4(color, alpha);
}

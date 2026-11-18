uniform float uTime;

varying vec3 vPosition;
varying float vDepth;

void main() {
  // Ruido para nebulosa
  float noise = fract(sin(dot(vPosition.xyz, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
  float noise2 = fract(sin(dot(vPosition.xyz, vec3(45.164, 12.9898, 78.233))) * 43758.5453);
  float noise3 = fract(sin(dot(vPosition.xyz, vec3(78.233, 45.164, 12.9898))) * 43758.5453);

  float density = noise * 0.4 + noise2 * 0.4 + noise3 * 0.2;

  // Colores nebulosa
  vec3 color = vec3(0.0);
  
  // Azul profundo
  color += vec3(0.1, 0.2, 0.5) * noise * 0.4;
  // Cian brillante
  color += vec3(0.2, 0.6, 0.8) * noise2 * 0.3;
  // Violeta/magenta
  color += vec3(0.6, 0.2, 0.6) * noise3 * 0.3;

  float alpha = density * 0.1;
  
  gl_FragColor = vec4(color, alpha);
}

uniform float uTime;

varying vec3 vPosition;
varying float vDepth;

void main() {
  // Coordenadas espirales
  float angle = atan(position.x, position.z);
  float radius = sqrt(position.x * position.x + position.z * position.z);
  
  // Patrón espiral con múltiples brazos
  float spiral = sin(angle * 3.0 - radius * 0.1 - uTime * 0.3) * 0.3 + 0.7;
  
  // Gradiente de color basado en la distancia radial
  float dist = radius / 150.0;
  vec3 color = mix(vec3(0.2, 0.3, 0.6), vec3(0.4, 0.2, 0.8), dist);
  
  // Añadir brillo en el centro
  float glow = exp(-radius * 0.02);
  color += vec3(0.2, 0.3, 0.5) * glow * 0.3;
  
  // Alpha basado en distancia y brillo
  float alpha = density * 0.2 * glow;
  
  gl_FragColor = vec4(color, alpha);
}

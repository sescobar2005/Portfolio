uniform float uTime;

varying vec3 vPosition;
varying float vDepth;

void main() {
  // Spiral spiral pattern
  float angle = atan(position.x, position.z);
  float radius = sqrt(position.x * position.x + position.z * position.z);
  
  // Spiral arm modulation
  float spiral = sin(angle * 3.0 - radius * 0.1 - uTime * 0.3) * 0.3;
  float yOffset = spiral * 2.0;
  
  vec3 newPos = vec3(position.x, position.y + yOffset, position.z);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  vPosition = newPos;
  vDepth = -newPos.z;
}

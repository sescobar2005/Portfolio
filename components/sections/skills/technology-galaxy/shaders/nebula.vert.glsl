varying vec3 vPosition;
varying float vDepth;

void main() {
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vDepth = -position.z;
}

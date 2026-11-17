varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vPosition = position;

  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);

  vViewPosition = -viewPosition.xyz;
  vNormal = normalize(normalMatrix * normal);

  gl_Position = projectionMatrix * viewPosition;
}
varying vec3 vColor;

void main() {
  vec2 centered = gl_PointCoord - vec2(0.5);
  float distanceToCenter = length(centered);

  if (distanceToCenter > 0.5) {
    discard;
  }

  float glow = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
  float alpha = pow(glow, 2.0);

  gl_FragColor = vec4(vColor, alpha);
}

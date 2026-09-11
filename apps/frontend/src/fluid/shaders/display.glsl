#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture;

out vec4 outColor;

// Attempt vibrant HSV to RGB
vec3 hsv2rgb(float h, float s, float v) {
  vec3 c = vec3(h, s, v);
  vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return c.z * mix(vec3(1.0), rgb, c.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec4 data = texture(u_texture, uv);

  float dye = data.b;
  vec2 vel = data.rg;
  float hue = fract(u_time * 0.08 + uv.x * 0.3 + uv.y * 0.2 + length(vel) * 2.0);
  vec3 rainbow = hsv2rgb(hue, 1.0, 1.0);
  vec3 color = rainbow * dye;
  color = mix(vec3(0.0), color, smoothstep(0.001, 0.05, dye));

  outColor = vec4(color, 1.0);
}

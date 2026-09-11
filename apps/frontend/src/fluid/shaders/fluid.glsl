#version 300 es
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_dt;
uniform sampler2D u_prevFrame;

// Fluid parameters
uniform float u_viscosity;     // viscosity coefficient
uniform float u_vorticity;     // vorticity confinement strength
uniform float u_dissipation;   // how fast dye fades
uniform float u_forceRadius;   // radius of injected force
uniform vec2  u_forcePos;      // normalized position of force injection (-1 = inactive)
uniform vec2  u_forceDir;      // direction/magnitude of force

out vec4 outColor;

// Channels: R = velocity.x, G = velocity.y, B = dye/density, A = pressure
vec4 sampleTex(vec2 uv) {
  return texture(u_prevFrame, uv);
}

void main() {
  vec2 texel = 1.0 / u_resolution;
  vec2 uv = gl_FragCoord.xy * texel;

  vec4 C = sampleTex(uv);
  vec4 L = sampleTex(uv + vec2(-texel.x, 0.0));
  vec4 R = sampleTex(uv + vec2( texel.x, 0.0));
  vec4 T = sampleTex(uv + vec2(0.0,  texel.y));
  vec4 B = sampleTex(uv + vec2(0.0, -texel.y));

  // Velocity field
  vec2 vel = C.rg;

  // Semi-Lagrangian advection: trace back and sample
  // Scale by resolution so advection is resolution-independent
  float rdx = min(u_resolution.x, u_resolution.y);
  vec2 prevUV = uv - vel * u_dt / rdx;
  vec4 advected = sampleTex(prevUV);

  // Diffusion (Jacobi iteration approximation)
  float alpha = 1.0 / (u_viscosity * u_dt);
  float rBeta = 1.0 / (4.0 + alpha);
  vec2 diffusedVel = (L.rg + R.rg + T.rg + B.rg + alpha * advected.rg) * rBeta;

  // Pressure solve (simplified single-pass Jacobi)
  float div = 0.5 * ((R.r - L.r) + (T.g - B.g));
  float pressure = (L.a + R.a + T.a + B.a - div) * 0.25;

  // Pressure gradient subtraction
  vec2 gradP = 0.5 * vec2(R.a - L.a, T.a - B.a);
  vec2 newVel = diffusedVel - gradP;

  // Vorticity confinement
  float vL = (sampleTex(uv + vec2(-texel.x, texel.y)).g - sampleTex(uv + vec2(-texel.x, -texel.y)).g) * 0.5 -
             (sampleTex(uv + vec2(0.0, texel.y)).r - sampleTex(uv + vec2(0.0, -texel.y)).r) * 0.5;
  float vR = (sampleTex(uv + vec2(texel.x, texel.y)).g - sampleTex(uv + vec2(texel.x, -texel.y)).g) * 0.5 -
             (sampleTex(uv + vec2(0.0, texel.y)).r - sampleTex(uv + vec2(0.0, -texel.y)).r) * 0.5;
  float vort = (sampleTex(uv + vec2(0.0, texel.y)).r - sampleTex(uv + vec2(0.0, -texel.y)).r) -
               (sampleTex(uv + vec2(texel.x, 0.0)).g - sampleTex(uv + vec2(-texel.x, 0.0)).g);
  vec2 vortForce = u_vorticity * vec2(abs(vR) - abs(vL), abs(vR) - abs(vL));
  vortForce = length(vortForce) > 0.0 ? normalize(vortForce) * vort * vec2(1.0, -1.0) : vec2(0.0);
  newVel += vortForce * 0.0005;

  // Velocity damping to prevent unbounded accumulation
  newVel *= 0.999;

  // Dye: advect + dissipate
  float dye = advected.b * u_dissipation;

  // External force injection
  if (u_forcePos.x >= 0.0) {
    float dist = length(uv - u_forcePos);
    float influence = exp(-dist * dist / (u_forceRadius * u_forceRadius));
    newVel += u_forceDir * influence * 0.5;
    dye += influence * 0.3;
  }

  // Init
  if (u_time < 0.05) {
    newVel = vec2(0.0);
    dye = 0.0;
    pressure = 0.0;
  }

  outColor = vec4(newVel, clamp(dye, 0.0, 1.0), pressure);
}

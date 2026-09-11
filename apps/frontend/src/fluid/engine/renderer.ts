import * as twgl from "twgl.js";
import { compileProgram, type ShaderProgram } from "./program";
import {
  createPingPongBuffers,
  swap,
  resizeBuffers,
  type PingPongBuffers,
} from "./framebuffer";

import quadVert from "../shaders/quad.vert?raw";
import fluidFrag from "../shaders/fluid.glsl?raw";
import displayFrag from "../shaders/display.glsl?raw";

export type ShaderName = "fluid";

export interface RendererState {
  gl: WebGL2RenderingContext;
  buffers: PingPongBuffers;
  quadBufferInfo: twgl.BufferInfo;
  simPrograms: Record<ShaderName, ShaderProgram>;
  displayProgram: ShaderProgram;
  activeShader: ShaderName;
  uniforms: Record<string, unknown>;
  time: number;
  running: boolean;
  animFrameId: number;
  brushPos: [number, number];
  brushActive: boolean;
  lastFrameTime: number;
}

export function createRenderer(canvas: HTMLCanvasElement): RendererState {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    preserveDrawingBuffer: false,
  });
  if (!gl) throw new Error("WebGL2 not available");

  // Required extension for float framebuffers
  gl.getExtension("EXT_color_buffer_float");
  gl.getExtension("OES_texture_float_linear");

  // Fullscreen quad: two triangles covering clip space
  const quadBufferInfo = twgl.createBufferInfoFromArrays(gl, {
    a_position: {
      numComponents: 2,
      data: [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1],
    },
  });

  const simPrograms = {
    fluid: compileProgram(gl, "fluid", quadVert, fluidFrag),
  };

  const displayProgram = compileProgram(gl, "display", quadVert, displayFrag);

  const buffers = createPingPongBuffers(gl, canvas.width, canvas.height);

  return {
    gl,
    buffers,
    quadBufferInfo,
    simPrograms,
    displayProgram,
    activeShader: "fluid",
    uniforms: {},
    time: 0,
    running: false,
    animFrameId: 0,
    brushPos: [-1, -1],
    brushActive: false,
    lastFrameTime: 0,
  };
}

export function setUniforms(
  state: RendererState,
  uniforms: Record<string, unknown>,
): void {
  Object.assign(state.uniforms, uniforms);
}

export function setBrush(
  state: RendererState,
  x: number,
  y: number,
  active: boolean,
): void {
  state.brushPos = [x, y];
  state.brushActive = active;
}

function renderFrame(state: RendererState, timestampMs: number): void {
  const { gl, buffers, quadBufferInfo, simPrograms, displayProgram } = state;

  // timestampMs is in milliseconds from requestAnimationFrame
  const now = timestampMs / 1000;
  const dt = state.lastFrameTime > 0 ? now - state.lastFrameTime : 0.016;
  state.lastFrameTime = now;
  state.time += dt;

  const width = gl.canvas.width;
  const height = gl.canvas.height;

  const simProgram = simPrograms.fluid;
  const substeps = 1;

  gl.useProgram(simProgram.programInfo.program);
  twgl.setBuffersAndAttributes(gl, simProgram.programInfo, quadBufferInfo);

  for (let step = 0; step < substeps; step++) {
    // --- Simulation pass ---
    twgl.bindFramebufferInfo(gl, buffers.write);
    gl.viewport(0, 0, width, height);

    const simUniforms: Record<string, unknown> = {
      u_resolution: [width, height],
      u_time: state.time,
      u_dt: 1.0, // fixed timestep for simulation stability
      ...state.uniforms,
      u_prevFrame: buffers.read.attachments[0],
    };

    // Brush uniforms (only on first substep to avoid over-injection)
    if (step === 0 && state.brushActive) {
      simUniforms.u_brushPos = state.brushPos;
      simUniforms.u_forcePos = state.brushPos;
    } else {
      simUniforms.u_brushPos = [-1, -1];
      simUniforms.u_forcePos = [-1, -1];
    }

    twgl.setUniforms(simProgram.programInfo, simUniforms);
    twgl.drawBufferInfo(gl, quadBufferInfo);

    swap(buffers);
  }

  // --- Display pass ---
  twgl.bindFramebufferInfo(gl, null); // render to screen
  gl.viewport(0, 0, width, height);
  gl.useProgram(displayProgram.programInfo.program);
  twgl.setBuffersAndAttributes(gl, displayProgram.programInfo, quadBufferInfo);

  const displayUniforms: Record<string, unknown> = {
    u_resolution: [width, height],
    u_time: state.time,
    u_texture: buffers.read.attachments[0],
  };

  twgl.setUniforms(displayProgram.programInfo, displayUniforms);
  twgl.drawBufferInfo(gl, quadBufferInfo);
}

function loop(state: RendererState): void {
  if (!state.running) return;

  state.animFrameId = requestAnimationFrame((ts) => {
    renderFrame(state, ts);
    loop(state);
  });
}

export function start(state: RendererState): void {
  if (state.running) return;
  state.running = true;
  loop(state);
}

export function stop(state: RendererState): void {
  state.running = false;
  if (state.animFrameId) {
    cancelAnimationFrame(state.animFrameId);
    state.animFrameId = 0;
  }
}

export function resize(
  state: RendererState,
  width: number,
  height: number,
): void {
  const { gl } = state;
  (gl.canvas as HTMLCanvasElement).width = width;
  (gl.canvas as HTMLCanvasElement).height = height;
  state.buffers = resizeBuffers(gl, state.buffers, width, height);
  // Reset time so simulation re-initializes
  state.time = 0;
  state.lastFrameTime = 0;
}

export function destroy(state: RendererState): void {
  stop(state);
  const { gl, buffers } = state;
  gl.deleteFramebuffer(buffers.read.framebuffer);
  gl.deleteFramebuffer(buffers.write.framebuffer);
  for (const att of buffers.read.attachments) gl.deleteTexture(att);
  for (const att of buffers.write.attachments) gl.deleteTexture(att);
}

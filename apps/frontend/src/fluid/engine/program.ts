import * as twgl from "twgl.js";

export interface ShaderProgram {
  programInfo: twgl.ProgramInfo;
  name: string;
}

export function compileProgram(
  gl: WebGL2RenderingContext,
  name: string,
  vertSrc: string,
  fragSrc: string,
): ShaderProgram {
  const programInfo = twgl.createProgramInfo(gl, [vertSrc, fragSrc], (msg) => {
    console.error(`[${name}] Shader error:`, msg);
  });
  return { programInfo, name };
}

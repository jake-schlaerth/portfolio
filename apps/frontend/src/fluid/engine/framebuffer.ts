import * as twgl from "twgl.js";

export interface PingPongBuffers {
  read: twgl.FramebufferInfo;
  write: twgl.FramebufferInfo;
}

export function createPingPongBuffers(
  gl: WebGL2RenderingContext,
  width: number,
  height: number,
): PingPongBuffers {
  const opts: twgl.TextureOptions = {
    width,
    height,
    min: gl.LINEAR,
    mag: gl.LINEAR,
    wrap: gl.CLAMP_TO_EDGE,
    internalFormat: gl.RGBA32F as number,
    format: gl.RGBA,
    type: gl.FLOAT,
  };

  // Ensure float textures are available
  const ext = gl.getExtension("EXT_color_buffer_float");
  if (!ext) {
    console.warn("EXT_color_buffer_float not available, falling back to RGBA8");
    opts.internalFormat = gl.RGBA8 as number;
    opts.type = gl.UNSIGNED_BYTE;
  }

  const read = twgl.createFramebufferInfo(
    gl,
    [{ ...opts, attachmentPoint: gl.COLOR_ATTACHMENT0 }],
    width,
    height,
  );

  const write = twgl.createFramebufferInfo(
    gl,
    [{ ...opts, attachmentPoint: gl.COLOR_ATTACHMENT0 }],
    width,
    height,
  );

  return { read, write };
}

export function swap(buffers: PingPongBuffers): void {
  const tmp = buffers.read;
  buffers.read = buffers.write;
  buffers.write = tmp;
}

export function resizeBuffers(
  gl: WebGL2RenderingContext,
  buffers: PingPongBuffers,
  width: number,
  height: number,
): PingPongBuffers {
  gl.deleteFramebuffer(buffers.read.framebuffer);
  gl.deleteFramebuffer(buffers.write.framebuffer);
  for (const att of buffers.read.attachments) gl.deleteTexture(att);
  for (const att of buffers.write.attachments) gl.deleteTexture(att);
  return createPingPongBuffers(gl, width, height);
}

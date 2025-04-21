use wasm_bindgen::prelude::*;
use web_sys::{WebGlProgram, WebGlRenderingContext, WebGlShader};

// Function to compile shaders
pub fn compile_shader(
    context: &WebGlRenderingContext,
    shader_type: u32,
    source: &str,
) -> Result<WebGlShader, String> {
    let shader = context
        .create_shader(shader_type)
        .ok_or_else(|| String::from("Unable to create shader object"))?;

    context.shader_source(&shader, source);
    context.compile_shader(&shader);

    if context
        .get_shader_parameter(&shader, WebGlRenderingContext::COMPILE_STATUS)
        .as_bool()
        .unwrap_or(false)
    {
        Ok(shader)
    } else {
        Err(context
            .get_shader_info_log(&shader)
            .unwrap_or_else(|| String::from("Unknown error creating shader")))
    }
}

pub fn link_program(
    context: &WebGlRenderingContext,
    vert_shader: &WebGlShader,
    frag_shader: &WebGlShader,
) -> Result<WebGlProgram, String> {
    let program = context
        .create_program()
        .ok_or_else(|| String::from("Unable to create shader object"))?;

    context.attach_shader(&program, vert_shader);
    context.attach_shader(&program, frag_shader);
    context.link_program(&program);

    if context
        .get_program_parameter(&program, WebGlRenderingContext::LINK_STATUS)
        .as_bool()
        .unwrap_or(false)
    {
        Ok(program)
    } else {
        Err(context
            .get_program_info_log(&program)
            .unwrap_or_else(|| String::from("Unknown error creating program")))
    }
}

pub struct ShaderSources {
    pub vertex: &'static str,
    pub fragment: &'static str,
}

impl ShaderSources {
    pub fn new() -> Self {
        Self {
            vertex: include_str!("shaders/vertex.glsl"),
            fragment: include_str!("shaders/fragment.glsl"),
        }
    }
}

pub fn create_program(
    context: &WebGlRenderingContext,
    sources: &ShaderSources,
) -> Result<WebGlProgram, JsValue> {
    // Compile vertex shader
    let vert_shader = compile_shader(
        context,
        WebGlRenderingContext::VERTEX_SHADER,
        sources.vertex,
    )
    .map_err(|e| JsValue::from_str(&format!("Vertex shader error: {}", e)))?;

    // Compile fragment shader
    let frag_shader = compile_shader(
        context,
        WebGlRenderingContext::FRAGMENT_SHADER,
        &sources.fragment
            .replace("#pragma glslify: random = require('./random.glsl')", include_str!("shaders/random.glsl"))
            .replace("#pragma glslify: scanline = require('./scanline.glsl')", include_str!("shaders/scanline.glsl"))
            .replace("#pragma glslify: vhsNoise = require('./vhs_noise.glsl')", include_str!("shaders/vhs_noise.glsl"))
            .replace("#pragma glslify: horizontalDistortionEffect = require('./horizontal_distortion.glsl')", include_str!("shaders/horizontal_distortion.glsl"))
            .replace("#pragma glslify: dotMatrix = require('./dot_matrix.glsl')", include_str!("shaders/dot_matrix.glsl"))
            .replace("#pragma glslify: vignette = require('./vignette.glsl')", include_str!("shaders/vignette.glsl"))
            .replace("#pragma glslify: tapeNoise = require('./tape_noise.glsl')", include_str!("shaders/tape_noise.glsl"))
            .replace("#pragma glslify: trackingJitter = require('./tracking_jitter.glsl')", include_str!("shaders/tracking_jitter.glsl"))
            .replace("#pragma glslify: bloom = require('./bloom.glsl')", include_str!("shaders/bloom.glsl")),
    )
    .map_err(|e| JsValue::from_str(&format!("Fragment shader error: {}", e)))?;

    let program = link_program(context, &vert_shader, &frag_shader)
        .map_err(|e| JsValue::from_str(&format!("Program linking error: {}", e)))?;

    Ok(program)
} 
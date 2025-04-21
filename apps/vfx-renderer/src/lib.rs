use wasm_bindgen::prelude::*;
use web_sys::{WebGlRenderingContext, WebGlProgram};

mod shader_loader;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello from Rust WebGL renderer!");
}

#[wasm_bindgen]
pub fn init_webgl(canvas_id: &str) -> Result<WebGlRenderingContext, JsValue> {
    let document = web_sys::window().unwrap().document().unwrap();
    let canvas = document.get_element_by_id(canvas_id).unwrap();
    let canvas: web_sys::HtmlCanvasElement = canvas.dyn_into::<web_sys::HtmlCanvasElement>()?;

    let context = canvas
        .get_context("webgl")?
        .unwrap()
        .dyn_into::<WebGlRenderingContext>()?;

    Ok(context)
}

#[wasm_bindgen]
pub fn render_scene(
    context: &WebGlRenderingContext,
    time: f32,
    distortion_amount: f32,
    scanline_intensity: f32,
    glitch_intensity: f32,
    color_shift: f32,
    dot_matrix_intensity: f32,
    chromatic_aberration: f32,
    vignette_intensity: f32,
    horizontal_distortion: f32,
    tape_noise_intensity: f32,
    tracking_jitter_intensity: f32,
    bloom_intensity: f32
) -> Result<(), JsValue> {
    context.clear_color(0.0, 0.0, 0.0, 1.0);
    context.clear(WebGlRenderingContext::COLOR_BUFFER_BIT);

    let shader_sources = shader_loader::ShaderSources::new();
    
    let program = shader_loader::create_program(context, &shader_sources)?;
    
    context.use_program(Some(&program));

    let vertices: [f32; 12] = [
        -1.0, -1.0, 0.0, // bottom left
        1.0, -1.0, 0.0, // bottom right
        1.0, 1.0, 0.0, // top right
        -1.0, 1.0, 0.0, // top left
    ];

    let buffer = context.create_buffer().ok_or("Failed to create buffer")?;
    context.bind_buffer(WebGlRenderingContext::ARRAY_BUFFER, Some(&buffer));

    unsafe {
        let vert_array = js_sys::Float32Array::view(&vertices);

        context.buffer_data_with_array_buffer_view(
            WebGlRenderingContext::ARRAY_BUFFER,
            &vert_array,
            WebGlRenderingContext::STATIC_DRAW,
        );
    }

    let position_location = context.get_attrib_location(&program, "position") as u32;
    context.vertex_attrib_pointer_with_i32(
        position_location,
        3, // numComponents
        WebGlRenderingContext::FLOAT,
        false,
        0, // stride
        0, // offset
    );
    context.enable_vertex_attrib_array(position_location);

    let time_location = context.get_uniform_location(&program, "time");
    context.uniform1f(time_location.as_ref(), time);

    let distortion_location = context.get_uniform_location(&program, "distortion");
    context.uniform1f(distortion_location.as_ref(), distortion_amount);

    let scanline_location = context.get_uniform_location(&program, "scanlineIntensity");
    context.uniform1f(scanline_location.as_ref(), scanline_intensity);

    let glitch_location = context.get_uniform_location(&program, "glitchIntensity");
    context.uniform1f(glitch_location.as_ref(), glitch_intensity);

    let color_shift_location = context.get_uniform_location(&program, "colorShift");
    context.uniform1f(color_shift_location.as_ref(), color_shift);

    let dot_matrix_location = context.get_uniform_location(&program, "dotMatrixIntensity");
    context.uniform1f(dot_matrix_location.as_ref(), dot_matrix_intensity);

    let chromatic_aberration_location = context.get_uniform_location(&program, "chromaticAberration");
    context.uniform1f(chromatic_aberration_location.as_ref(), chromatic_aberration);

    let vignette_location = context.get_uniform_location(&program, "vignetteIntensity");
    context.uniform1f(vignette_location.as_ref(), vignette_intensity);

    let horizontal_distortion_location = context.get_uniform_location(&program, "horizontalDistortion");
    context.uniform1f(horizontal_distortion_location.as_ref(), horizontal_distortion);

    let tape_noise_location = context.get_uniform_location(&program, "tapeNoiseIntensity");
    context.uniform1f(tape_noise_location.as_ref(), tape_noise_intensity);

    let tracking_jitter_location = context.get_uniform_location(&program, "trackingJitterIntensity");
    context.uniform1f(tracking_jitter_location.as_ref(), tracking_jitter_intensity);

    let bloom_location = context.get_uniform_location(&program, "bloomIntensity");
    context.uniform1f(bloom_location.as_ref(), bloom_intensity);

    context.draw_arrays(WebGlRenderingContext::TRIANGLE_FAN, 0, 4);

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_compile() {
        assert!(true);
    }
}

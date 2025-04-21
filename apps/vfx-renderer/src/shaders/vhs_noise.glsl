float vhsNoise(vec2 uv, float time, float glitchIntensity) {
    // Import random function
    #pragma glslify: random = require('./random.glsl')
    
    float noise = random(vec2(uv.y * 100.0, time));
    return noise * noise * glitchIntensity;
}
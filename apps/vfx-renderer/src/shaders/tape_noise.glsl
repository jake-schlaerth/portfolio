vec3 tapeNoise(vec2 uv, vec3 color, float time, float intensity) {
    if (intensity < 0.001) return color;
    
    // Import random function
    #pragma glslify: random = require('./random.glsl')
    
    // Create multiple layers of noise with different frequencies
    // Fast horizontal noise (tape tracking)
    float hNoise = random(vec2(uv.y * 100.0, time * 10.0)) * 0.1 * intensity;
    
    // Vertical noise lines (signal interference)
    float vNoise = random(vec2(floor(uv.x * 100.0) / 100.0, time)) * intensity;
    vNoise = smoothstep(0.8, 0.95, vNoise) * intensity * 0.2;
    
    // Color bleeding/shifting effect
    float colorShift = sin(uv.y * 20.0 + time) * intensity * 0.01;
    
    // Main horizontal noise lines that move slowly up the screen
    float yPos = fract(uv.y * 5.0 - time * 0.1);
    float hLine = smoothstep(0.95, 1.0, yPos) * intensity * 0.3;
    
    // Apply horizontal noise to position (tape jitter)
    vec2 jitterPos = uv;
    jitterPos.x += hNoise * 0.005;
    
    // Occasional dropouts (blank lines)
    float dropout = step(0.995, random(vec2(floor(uv.y * 42.0), time * 0.5)));
    dropout *= intensity * 2.0;
    
    // Color effects
    vec3 result = color;
    
    // Apply color bleeding
    result.r += colorShift;
    result.b -= colorShift;
    
    // Add noise to the image
    result += vec3(hNoise + vNoise - hLine);
    
    // Simulate dropouts
    result = mix(result, vec3(0.1, 0.1, 0.1), dropout * intensity);
    
    // Add subtle grain everywhere
    float grain = random(uv * time * 0.01) * 0.03 * intensity;
    result += vec3(grain);
    
    // Occasionally reduce saturation in small bands to simulate tape wear
    float wear = step(0.97, random(vec2(floor(uv.y * 31.0), floor(time))));
    float satReduction = wear * 0.3 * intensity;
    float luma = dot(result, vec3(0.299, 0.587, 0.114));
    result = mix(result, vec3(luma), satReduction);
    
    return result;
} 
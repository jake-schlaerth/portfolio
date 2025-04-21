vec2 trackingJitter(vec2 uv, float time, float intensity) {
    if (intensity < 0.001) return uv;
    
    // Import random function
    #pragma glslify: random = require('./random.glsl')
    
    vec2 jitteredUV = uv;
    
    // Analog-style noise calculations
    float noiseTime = time * 0.5;
    
    // Slow analog wave pattern (wobble)
    float analogWave = sin(noiseTime * 0.23) * cos(noiseTime * 0.13) * sin(noiseTime * 0.57 + 1.234);
    analogWave *= 0.0025 * intensity;
    
    // Subtle continuous drift (tape stretching effect)
    float drift = sin(noiseTime * 0.11) * sin(noiseTime * 0.19) * 0.002 * intensity;
    
    // Smoothed random jumps - mimics tape head misalignment
    float jumpTime = floor(time * 1.5);
    float jumpRandom = random(vec2(jumpTime, 0.5));
    float nextJumpRandom = random(vec2(jumpTime + 1.0, 0.5));
    
    // Interpolate between jump states for smoother transition
    float jumpProgress = smoothstep(0.0, 1.0, fract(time * 1.5));
    float jumpEffect = mix(jumpRandom, nextJumpRandom, jumpProgress);
    jumpEffect = (jumpEffect * 2.0 - 1.0) * 0.004 * intensity;
    
    // Periodic vertical shift with smooth easing
    float shiftTime = floor(time * 0.7);
    float shiftTrigger = step(0.85, random(vec2(shiftTime, 3.0)));
    float shiftAmount = random(vec2(shiftTime, 4.0)) * 0.03 * intensity;
    // Ease in and out of the shift
    float shiftProgress = fract(time * 0.7);
    float shiftEase = shiftTrigger * shiftAmount * sin(shiftProgress * 3.14159);
    
    // Rolling distortion - smoother and more analog-looking
    float rollIntensity = 0.006 * intensity * (0.5 + 0.5 * sin(noiseTime * 0.3));
    float rollEffect = sin(uv.y * 40.0 + noiseTime * 2.0) * rollIntensity;
    
    // Occasional horizontal bends
    float bendTime = floor(time * 0.4);
    float bendTrigger = smoothstep(0.7, 0.9, random(vec2(bendTime, 6.0)));
    float bendAmount = bendTrigger * sin(uv.y * 2.0) * 0.005 * intensity;
    
    // Apply all effects with smoothing
    jitteredUV.y += analogWave + drift + jumpEffect + shiftEase;
    jitteredUV.x += rollEffect + bendAmount;
    
    return jitteredUV;
} 
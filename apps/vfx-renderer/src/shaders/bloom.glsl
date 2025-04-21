vec3 bloom(vec3 color, float intensity, float time) {
    if (intensity < 0.001) return color;
    
    // Extract bright areas of the image
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    float brightPass = smoothstep(0.6, 1.0, luminance);
    
    // Create the glow color - skew toward purple/pink for vaporwave feel
    vec3 brightColor = color + vec3(0.2, 0.0, 0.4) * brightPass;
    
    // Spread and soften
    vec3 bloomColor = brightColor * vec3(1.2, 1.0, 1.5); // Enhance pink/purple
    
    // Add pulsing to the bloom for that dreamy vaporwave feel
    float pulse = sin(time * 0.5) * 0.5 + 0.5;
    float bloomAmount = intensity * (0.8 + pulse * 0.4);
    
    // Mix original with bloom
    vec3 result = mix(color, bloomColor, bloomAmount * brightPass);
    
    // Add extra saturation to enhance the bloom
    float colorIntensity = length(result);
    float sat = 1.0 + intensity * 0.5;
    vec3 saturated = mix(vec3(colorIntensity), result, sat);
    
    return saturated;
} 
float dotMatrix(vec2 uv, float intensity) {
    if (intensity < 0.001) return 1.0;
    
    float dotSize = 0.005 + intensity * 0.0001; 
    
    float dotSpacing = 0.02 + intensity * 0.04; 
    
    vec2 dotPos = mod(uv, vec2(dotSpacing)) - vec2(dotSpacing/2.0);
    float dotDistance = length(dotPos);
    
    return smoothstep(dotSize, dotSize * 0.95, dotDistance);
} 
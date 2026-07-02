class PerlinNoise {
    constructor() {
        // Ken Perlin's standard permutation table (duplicated to avoid overflow wrapping)
        const p = [
            151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,
            23,190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,
            56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,
            122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54, 65,25,63,161, 1,216,80,73,209,
            76,132,187,208, 89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,
            226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,162,119,171,121,6,22,251,
            44,48,178,16,145,31,65,85,42,146,25,130,213,130,228,89,249,255,97,160,34,38,65,44,223,252,11,
            22,1,16,38,54,58,10,128,122,21,61,84,135,76,132,15,2,118,126,85,151,12,105,103,111,34,163,
            23,221,181,139,18,91,219,189,207,205,178,211,19,98,108,110,79,113,224,232,178,185, 112,104,218,
            246,97,228,251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,49,192,
            214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,138,236,205,93,222,114,
            67,29,24,72,243,141,128,195,78,66,215,61,156,180
        ];
        this.perm = new Array(512);
        for (let i = 0; i < 256; i++) {
            this.perm[i] = p[i];
            this.perm[i + 256] = p[i];
        }
    }

    // Fade function smooths out transitions: 6t^5 - 15t^4 + 10t^3
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    // Linear interpolation
    lerp(t, a, b) {
        return a + t * (b - a);
    }

    // Calculates the dot product of a constant gradient vector and distance vector
    dotGridGradient(ix, iy, x, y) {
        // Get pseudo-random gradient index from table
        const h = this.perm[this.perm[ix & 255] + (iy & 255)] & 7;
        
        // Convert to 8 possible 2D gradient vectors
        let dx = x - ix;
        let dy = y - iy;
        
        switch (h) {
            case 0: return dx + dy;
            case 1: return -dx + dy;
            case 2: return dx - dy;
            case 3: return -dx - dy;
            case 4: return dx;
            case 5: return -dx;
            case 6: return dy;
            case 7: return -dy;
        }
        return 0;
    }

    // Get a noise value between -1.0 and 1.0 (re-mapped to 0.0 to 1.0 for ease of use)
    noise(x, y) {
        let X = Math.floor(x);
        let Y = Math.floor(y);

        let xf = x - X;
        let yf = y - Y;

        // Calculate dot products for 4 corners
        let n00 = this.dotGridGradient(X, Y, x, y);
        let n10 = this.dotGridGradient(X + 1, Y, x, y);
        let n01 = this.dotGridGradient(X, Y + 1, x, y);
        let n11 = this.dotGridGradient(X + 1, Y + 1, x, y);

        // Compute fade curves for smoothly changing weights
        let u = this.fade(xf);
        let v = this.fade(yf);

        // Interpolate values along x and y axis
        let x1 = this.lerp(u, n00, n10);
        let x2 = this.lerp(u, n01, n11);

        let total = this.lerp(v, x1, x2);
        
        // Re-map from [-1, 1] to [0, 1]
        return (total + 1) / 2;
    }
}

export const perlin = new PerlinNoise();
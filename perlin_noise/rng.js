export class RNG {
    static seed = 99;
    static getRandom(seed) {
        seed = seed ?? RNG.seed;
        RNG.seed = (seed * 1103515245 + 12345) % (2147483647);
        return RNG.seed / 2147483647;
    }
    static setSeed(seed) {
        RNG.seed = seed ?? 99;
    }
}
//# sourceMappingURL=rng.js.map
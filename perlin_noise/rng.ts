export class RNG {
    static seed = 99;
    static getRandom(seed?: number) {
        seed = seed ?? RNG.seed;
        RNG.seed = (seed * 1103515245 + 12345) % (2147483647);
        return RNG.seed;
    }
    static setSeed(seed: number) {
        RNG.seed = seed;
    }
}
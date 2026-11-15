// Method: Bridson's Alg
/*
 * Requires a minimum dsitance: r
 * Cells with width 1/sqrt2
 */

import { PoissonBox } from "../components/PoissonBox";
import { RNG } from "../util.js";

function getNewPoint(x: number, y: number, vec: Array<number>): Array<number> {
    let mag: number = vec[0]!;
    let theta: number = vec[1]!;
    let xOff: number = mag * Math.cos(theta);
    let yOff: number = mag * Math.sin(theta);
    return [x + xOff, y + yOff];
}

function getRandomVector(): Array<number> {
    return [RNG.getRandom() + 1, RNG.getRandom() * Math.PI * 2];
}

function getPoints(): Array<number> { // make in square thingie.... but don't need to display all
    let k = 50;
    let points: Array<number> = [];
    let activeWave = [];
    let nextWave = [];

    let width = 100;
    let grid: Array<Array<PoissonBox>> = [];
    for (let i = 0; i < width; i++) {
        let row: Array<PoissonBox> = [];
        for (let j = 0; j < width; j++) {
            let newThingie = new PoissonBox(
                i > 0 ? grid[i-1]![j]! : null,
                null,
                null,
                j > 0 ? row[j-1]! : null
            )
            row.push(newThingie);

            if (i > 0) grid[i-1]![j]!.bottom = newThingie;
            if (j > 0) grid[i]![j-1]!.right = newThingie;
        }
        grid.push(row);
    }



    activeWave.push();
}
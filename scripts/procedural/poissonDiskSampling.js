// Method: Bridson's Alg
/*
 * Requires a minimum dsitance: r
 * Cells with width 1/sqrt2
 */
import { BridcidentBox, PoissonBox } from "../components/PoissonBox.js";
import { RNG } from "../util.js";
let canvas = document.getElementById("whiteboard");
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
function getNewPoint(x, y, vec) {
    let mag = vec[0];
    let theta = vec[1];
    let xOff = mag * Math.cos(theta);
    let yOff = mag * Math.sin(theta);
    return [x + xOff, y + yOff];
}
function getRandomVector() {
    return [RNG.getRandom() * Math.SQRT2 + Math.SQRT2, RNG.getRandom() * Math.PI * 2];
}
function getBridcidentPoints() {
    let k = 50;
    let points = [];
    let activeWave = [];
    let nextWave = [];
    let width = 100;
    let grid = [];
    for (let i = 0; i < width; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            let newThingie = new BridcidentBox(i > 0 ? grid[i - 1][j] : null, null, null, j > 0 ? row[j - 1] : null);
            row.push(newThingie);
            if (i > 0)
                grid[i - 1][j].bottom = newThingie;
            if (j > 0)
                row[j - 1].right = newThingie;
        }
        grid.push(row);
    }
    let init = [
        RNG.getRandom() * width,
        RNG.getRandom() * width,
    ];
    activeWave.push(init);
    points.push(init);
    grid[Math.floor(init[1])][Math.floor(init[0])].addPoint(init[0] % 1, init[1] % 1);
    while (activeWave.length > 0) {
        let dot = activeWave.pop();
        for (let i = 0; i < k; i++) {
            let randomVector = getRandomVector();
            let newX = dot[0] + randomVector[0] * Math.cos(randomVector[1]);
            let newY = dot[1] + randomVector[0] * Math.sin(randomVector[1]);
            if (newX >= width || newX < 0 || newY >= width || newY < 0)
                continue;
            if (grid[Math.floor(newY)][Math.floor(newX)].tryPoint(newX % 1, newY % 1)) {
                points.push([newX, newY]);
                nextWave.push([newX, newY]);
                break;
            }
        }
        if (activeWave.length == 0) {
            let t = activeWave;
            activeWave = nextWave;
            nextWave = t;
        }
    }
    for (let i = 0; i < points.length; i++) {
        points[i][0] /= width;
        points[i][1] /= width;
    }
    return points;
}
function getPoints() {
    let k = 50;
    let points = [];
    let activeWave = [];
    let nextWave = [];
    let width = 200; // unit is boxes
    let grid = [];
    for (let i = 0; i < width; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            let newThingie = new PoissonBox(i > 0 ? grid[i - 1][j] : null, null, null, j > 0 ? row[j - 1] : null);
            row.push(newThingie);
            if (i > 0)
                grid[i - 1][j].bottom = newThingie;
            if (j > 0)
                row[j - 1].right = newThingie;
        }
        grid.push(row);
    }
    let init = [
        RNG.getRandom() * width,
        RNG.getRandom() * width,
    ];
    activeWave.push(init);
    points.push(init);
    grid[Math.floor(init[1])][Math.floor(init[0])].addPoint(init[0] % 1, init[1] % 1);
    while (activeWave.length > 0) {
        let dot = activeWave.pop();
        for (let i = 0; i < k; i++) {
            let randomVector = getRandomVector();
            let newX = dot[0] + randomVector[0] * Math.cos(randomVector[1]);
            let newY = dot[1] + randomVector[0] * Math.sin(randomVector[1]);
            if (newX >= width || newX < 0 || newY >= width || newY < 0)
                continue;
            if (grid[Math.floor(newY)][Math.floor(newX)].tryPoint(newX % 1, newY % 1)) {
                points.push([newX, newY]);
                nextWave.push([newX, newY]);
            }
        }
        if (activeWave.length == 0) {
            let t = activeWave;
            activeWave = nextWave;
            nextWave = t;
        }
    }
    for (let i = 0; i < points.length; i++) {
        points[i][0] /= width;
        points[i][1] /= width;
    }
    return points;
}
function drawPoints(points, rad, color = "black") {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let basis = Math.max(width, height);
    console.log(points);
    for (const [x, y] of points) {
        ctx.beginPath();
        ctx.arc(x * basis, y * basis, rad, 0, Math.PI * 2);
        ctx.fill();
    }
}
drawPoints(getPoints(), 1);
//# sourceMappingURL=poissonDiskSampling.js.map
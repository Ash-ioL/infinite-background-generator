import { RNG } from "./rng.js";
class Box {
    cornerVectors = [];
    width = 1;
    constructor(top, left) {
        for (let i = 0; i < 4; i++) {
            let rangle = RNG.getRandom() * 2 * Math.PI;
            let vec = [Math.cos(rangle), Math.sin(rangle)];
            this.cornerVectors.push(vec);
        }
        if (top) {
            this.cornerVectors[0] = top.cornerVectors[2];
            this.cornerVectors[1] = top.cornerVectors[3];
        }
        if (left) {
            this.cornerVectors[0] = left.cornerVectors[1];
            this.cornerVectors[2] = left.cornerVectors[3];
        }
    }
    getNoise(x, y) {
        let dotProducts = [];
        for (let i = 0; i < 4; i++) {
            let [xComponent, yComponent] = this.cornerVectors[i];
            let distanceXComponent, distanceYComponent;
            if (i == 0) {
                distanceXComponent = x;
                distanceYComponent = y;
            }
            else if (i == 1) {
                distanceXComponent = x - this.width;
                distanceYComponent = y;
            }
            else if (i == 2) {
                distanceXComponent = x;
                distanceYComponent = y - this.width;
            }
            else {
                distanceXComponent = x - this.width;
                distanceYComponent = y - this.width;
            }
            dotProducts.push(Box.getDotProduct(xComponent, yComponent, distanceXComponent, distanceYComponent));
        }
        let xWeight = Box.getWeight(x);
        let yWeight = Box.getWeight(y);
        let topLerp = Box.getLerp(dotProducts[0], dotProducts[1], xWeight);
        let bottomLerp = Box.getLerp(dotProducts[2], dotProducts[3], xWeight);
        let totalValue = Box.getLerp(topLerp, bottomLerp, yWeight);
        return totalValue;
    }
    static getWeight(dx) {
        return 6 * Math.pow(dx, 5) - 15 * Math.pow(dx, 4) + 10 * Math.pow(dx, 3);
    }
    static getDotProduct(v1x, v1y, v2x, v2y) {
        return v1x * v2x + v1y * v2y;
    }
    static getLerp(a, b, w) {
        return a + w * (b - a);
    }
    static getGrid(width) {
        let boxGrid = [];
        for (let i = 0; i < width; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push(null);
            }
            boxGrid.push(row);
        }
        boxGrid[0][0] = new Box();
        for (let j = 1; j < width; j++) {
            boxGrid[0][j] = new Box(null, boxGrid[0][j - 1]);
        }
        for (let i = 1; i < width; i++) {
            boxGrid[i][0] = new Box(boxGrid[i - 1][0]);
        }
        for (let i = 1; i < width; i++) {
            for (let j = 1; j < width; j++) {
                boxGrid[i][j] = new Box(boxGrid[i - 1][j], boxGrid[i][j - 1]);
            }
        }
        return boxGrid;
    }
}
let canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
draw();
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
});
function draw() {
    RNG.setSeed();
    //fullPerlinNoise(1);
    drawRawPerlinGrid(getPerlinGrid(1));
}
export function drawIslands() {
    let numIslands = 5;
    let blockSize = 1;
    let prob = 0.42;
    let cornerProb = 0.1;
    let grid = [];
    for (let i = 0; i < window.innerHeight; i += blockSize) {
        let row = [];
        for (let j = 0; j < window.innerWidth; j += blockSize) {
            row.push(false);
        }
        grid.push(row);
    }
    let pointers = [];
    for (let i = 0; i < numIslands; i++) {
        let x = Math.floor(RNG.getRandom() * grid[0].length);
        let y = Math.floor(RNG.getRandom() * grid.length);
        while (grid[y][x]) {
            x = Math.floor(RNG.getRandom() * grid[0].length);
            y = Math.floor(RNG.getRandom() * grid.length);
        }
        grid[y][x] = true;
        pointers.push([y, x]);
    }
    console.log(grid);
    let batch = [];
    while (pointers.length > 0) {
        let pointer = pointers.pop();
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let chance = Math.abs(i * j) == 1 ? cornerProb : prob;
                if (pointer[0] + i > -1 && pointer[1] + j > -1 && pointer[0] + i < grid.length && pointer[1] + j < grid[0].length) {
                    if (!grid[pointer[0] + i][pointer[1] + j] && RNG.getRandom() < chance) {
                        grid[pointer[0] + i][pointer[1] + j] = true;
                        batch.push([pointer[0] + i, pointer[1] + j]);
                    }
                }
            }
        }
        if (pointers.length == 0) {
            pointers = batch;
            batch = [];
        }
    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j]) {
                ctx.fillStyle = "green";
            }
            else {
                ctx.fillStyle = "blue";
            }
            ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
            //ctx.strokeRect(j * blockSize, i*blockSize, blockSize, blockSize);
        }
    }
    console.log(grid);
}
export function drawCaves() {
    class TunnelCarver {
        static splitChance = 0.001;
        direction;
        x;
        y;
        rad;
        constructor(x, y, size, dir) {
            this.direction = dir ?? (RNG.getRandom() * 2 * Math.PI);
            this.x = x;
            this.y = y;
            this.rad = size;
        }
        contains(x, y) {
            let dist = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
            return dist < this.rad;
        }
        update() {
            let drdt = this.rad * 0.1 + 0.5;
            let dddt = 0.4;
            let minRad = 1;
            this.rad += (RNG.getRandom() * drdt) * (RNG.getRandom() < 0.5 ? 1 : -1);
            this.rad = Math.max(this.rad, minRad);
            this.direction += (RNG.getRandom() * dddt) * (RNG.getRandom() < 0.5 ? 1 : -1);
            while (this.direction < 0)
                this.direction += Math.PI * 2;
            while (this.direction >= Math.PI * 2)
                this.direction -= Math.PI * 2;
            let dir = this.direction;
            if (dir <= (Math.PI / 8) || dir > (Math.PI * 15 / 8)) {
                this.x += 1;
            }
            else if (dir <= Math.PI * 3 / 8) {
                this.x += 1;
                this.y -= 1;
            }
            else if (dir <= Math.PI * 5 / 8) {
                this.y -= 1;
            }
            else if (dir <= Math.PI * 7 / 8) {
                this.x -= 1;
                this.y -= 1;
            }
            else if (dir <= Math.PI * 9 / 8) {
                this.x -= 1;
            }
            else if (dir <= Math.PI * 11 / 8) {
                this.x -= 1;
                this.y += 1;
            }
            else if (dir <= Math.PI * 13 / 8) {
                this.y += 1;
            }
            else {
                this.x += 1;
                this.y += 1;
            }
        }
    }
    let grid = [];
    let blockSize = 5;
    for (let i = 0; i < window.innerHeight; i += blockSize) {
        let row = [];
        for (let j = 0; j < window.innerWidth; j += blockSize) {
            row.push(false);
        }
        grid.push(row);
    }
    let tunnels = [];
    let numTunnels = Math.floor(RNG.getRandom() * 10) + 1;
    // RNG.getRandom();RNG.getRandom();RNG.getRandom();
    for (let i = 0; i < numTunnels; i++) {
        let outcome = Math.floor(RNG.getRandom() * 4);
        let dev = (RNG.getRandom() < 0.5 ? -1 : 1) * (RNG.getRandom() * Math.PI * 0.2);
        if (outcome == 0) {
            tunnels.push(new TunnelCarver(0, Math.floor(RNG.getRandom() * grid.length), 5, 0 + dev));
        }
        else if (outcome == 1) {
            tunnels.push(new TunnelCarver(Math.floor(RNG.getRandom() * grid[0].length), 0, 5, Math.PI * 3 / 2 + dev));
        }
        else if (outcome == 2) {
            tunnels.push(new TunnelCarver(grid[0].length - 1, Math.floor(RNG.getRandom() * grid.length), 5, Math.PI + dev));
        }
        else {
            tunnels.push(new TunnelCarver(Math.floor(RNG.getRandom() * grid[0].length), grid.length - 1, 5, Math.PI / 2 + dev));
        }
    }
    let splits = 0;
    while (tunnels.length > 0) {
        let tunnel = tunnels.pop();
        while (true) {
            // flood fill the radius
            let pointers = [];
            let batch = [];
            pointers.push([tunnel.y, tunnel.x, tunnel.direction]);
            console.log([tunnel.x, tunnel.y, tunnel.direction]);
            if (!(tunnel.x < 0 || tunnel.y < 0 || tunnel.x >= grid[0].length || tunnel.y >= grid.length)) {
                grid[tunnel.y][tunnel.x] = true;
            }
            else {
                break;
            }
            while (pointers.length > 0) {
                let pointer = pointers.pop();
                for (let [i, j] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
                    if (!(pointer[0] + i < 0 || pointer[1] + j < 0 || pointer[1] + j >= grid[0].length || pointer[0] + i >= grid.length) && grid[pointer[0] + i][pointer[1] + j] == false && tunnel.contains(pointer[1] + j, pointer[0] + i)) {
                        grid[pointer[0] + i][pointer[1] + j] = true;
                        batch.push([pointer[0] + i, pointer[1] + j]);
                    }
                }
                if (pointers.length == 0) {
                    pointers = batch;
                    batch = [];
                }
            }
            // update
            tunnel.update();
            if (RNG.getRandom() < TunnelCarver.splitChance && splits < 100) {
                splits += 1;
                tunnels.push(new TunnelCarver(tunnel.x, tunnel.y, tunnel.rad, tunnel.direction));
            }
        }
    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j]) {
                ctx.fillStyle = "black";
            }
            else {
                ctx.fillStyle = "#39261C";
            }
            ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
            //ctx.strokeRect(j * blockSize, i*blockSize, blockSize, blockSize);
        }
    }
    console.log(grid);
}
function singleBox() {
    let box = new Box();
    let imgData = ctx.createImageData(canvas.width, canvas.height);
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    for (let i = 0; i < screenHeight; i++) {
        for (let j = 0; j < screenWidth; j++) {
            let idx = (i * screenWidth + j) * 4;
            let x = j / (screenWidth);
            let y = i / (screenHeight);
            let val = (box.getNoise(x, y) + 0.7072) / 1.4144 * 255;
            imgData.data[idx] = val;
            imgData.data[idx + 1] = val;
            imgData.data[idx + 2] = val;
            imgData.data[idx + 3] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}
//singleBox();
function oneOctave() {
    let imgData = ctx.createImageData(window.innerWidth, window.innerHeight);
    let boxGrid = Box.getGrid(10);
    for (let i = 0; i < window.innerHeight; i++) {
        for (let j = 0; j < window.innerWidth; j++) {
            let idx = (window.innerWidth * i + j) * 4;
            let x = (j / window.innerWidth) * 10;
            let y = (i / window.innerHeight) * 10;
            let val = boxGrid[Math.floor(y)][Math.floor(x)].getNoise(x % 1, y % 1);
            imgData.data[idx] = Math.max(0, Math.min(255, ((val + 0.7072) / 1.4144) * 255));
            imgData.data[idx + 1] = Math.max(0, Math.min(255, ((val + 0.7072) / 1.4144) * 255));
            imgData.data[idx + 2] = Math.max(0, Math.min(255, ((val + 0.7072) / 1.4144) * 255));
            imgData.data[idx + 3] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}
//oneOctave();
function fullPerlinNoise(octaves) {
    let imgData = ctx.createImageData(window.innerWidth, window.innerHeight);
    let tempData = new Array(window.innerHeight * window.innerWidth * 4).fill(0);
    let totalRange = 0;
    for (let o = 0; o < octaves; o++) {
        let boxGrid = Box.getGrid(10 * Math.pow(2, o));
        for (let i = 0; i < window.innerHeight; i++) {
            for (let j = 0; j < window.innerWidth; j++) {
                let idx = (window.innerWidth * i + j) * 4;
                let x = Math.max(0, Math.min(10 * Math.pow(2, o) - 0.0001, (j / window.innerWidth) * (10 * Math.pow(2, o))));
                let y = Math.max(0, Math.min(10 * Math.pow(2, o) - 0.0001, (i / window.innerHeight) * (10 * Math.pow(2, o))));
                let val = boxGrid[Math.floor(y)][Math.floor(x)].getNoise(x % 1, y % 1) / (Math.pow(2, o));
                tempData[idx] += val;
                tempData[idx + 1] += val;
                tempData[idx + 2] += val;
            }
        }
        totalRange += 1.4144 / Math.pow(2, o);
    }
    for (let i = 0; i < window.innerHeight * window.innerWidth * 4; i++) {
        imgData.data[i] = Math.max(0, Math.min(255, (tempData[i] / (totalRange) + 0.5) * 255));
        if (i % 4 == 3) {
            imgData.data[i] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}
export function drawRawPerlinGrid(perlinGrid) {
    let width = perlinGrid[0].length;
    let height = perlinGrid.length;
    let imgData = ctx.createImageData(width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let idx = (i * width + j) * 4;
            imgData.data[idx] = perlinGrid[i][j] * 255;
            imgData.data[idx + 1] = perlinGrid[i][j] * 255;
            imgData.data[idx + 2] = perlinGrid[i][j] * 255;
            imgData.data[idx + 3] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}
export function getPerlinGrid(octaves) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let tempData = new Array(height * width).fill(0);
    let grid = new Array(height * width).fill(0);
    let totalRange = 0;
    for (let o = 0; o < octaves; o++) {
        let boxGrid = Box.getGrid(10 * Math.pow(2, o));
        for (let i = 0; i < window.innerHeight; i++) {
            for (let j = 0; j < window.innerWidth; j++) {
                let idx = (window.innerWidth * i + j);
                let x = Math.max(0, Math.min(10 * Math.pow(2, o) - 0.0001, (j / window.innerWidth) * (10 * Math.pow(2, o))));
                let y = Math.max(0, Math.min(10 * Math.pow(2, o) - 0.0001, (i / window.innerHeight) * (10 * Math.pow(2, o))));
                let val = boxGrid[Math.floor(y)][Math.floor(x)].getNoise(x % 1, y % 1) / (Math.pow(2, o));
                tempData[idx] += val;
            }
        }
        totalRange += 1.4144 / Math.pow(2, o);
    }
    for (let i = 0; i < window.innerHeight * window.innerWidth; i++) {
        grid[i] = Math.max(0, Math.min(1, (tempData[i] / (totalRange) + 0.5)));
    }
    let newGrid = [];
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            row.push(grid[i * width + j]);
        }
        newGrid.push(row);
    }
    console.log("total range" + totalRange);
    return newGrid;
}
getPerlinGrid(4);
function drawGrid() {
}
//fullPerlinNoise(4);
export function drawMap(perlinGrid) {
    let grid = perlinGrid ?? getPerlinGrid(4);
    let height = grid.length;
    let width = grid[0].length;
    let imgData = ctx.createImageData(width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let idx = (i * width + j) * 4;
            let elevation = grid[i][j];
            let r = 0, g = 0, b = 0;
            if (elevation < 0.43) {
                r = 25;
                g = 60;
                b = 160;
            }
            else if (elevation < 0.48) {
                r = 45;
                g = 140;
                b = 210;
            }
            else if (elevation < 0.52) {
                r = 225;
                g = 205;
                b = 145;
            }
            else if (elevation < 0.70) {
                r = 55;
                g = 145;
                b = 65;
                // if (elevation > 85) {
                //     let randNum = Math.floor(RNG.getRandom() * 3);
                //     if (randNum === 0) {
                //         r = 255; g = 0; b = 0;
                //     } else if (randNum === 1) {
                //         r = 0; g = 255; b = 0;
                //     } else {
                //         r = 0; g = 0; b = 255;
                //     }
                // }
            }
            else if (elevation < 0.80) {
                r = 121;
                g = 121;
                b = 121;
            }
            else {
                r = 255;
                g = 255;
                b = 255;
            }
            imgData.data[idx] = r;
            imgData.data[idx + 1] = g;
            imgData.data[idx + 2] = b;
            imgData.data[idx + 3] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}
//oneOctave();
//drawIslands();
//drawCaves();
// for (let i = 0; i < 2; i++) {
//     RNG.setSeed(10);
//     for (let i: number = 0; i < 10; i++) {
//         console.log(RNG.getRandom());
//     }
//     console.log("\n");
//
//# sourceMappingURL=perlin.js.map
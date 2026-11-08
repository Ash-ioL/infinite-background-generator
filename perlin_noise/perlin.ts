import { RNG } from "./rng.js";

let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //drawIslands();
    drawCaves();
});

function draw() {

}

function drawIslands() {
    let numIslands: number = 5
    let blockSize = 1;
    let prob = 0.42;
    let cornerProb = 0.1;
    let grid: Array<Array<boolean>> = []
    for (let i = 0; i < window.innerHeight; i+=blockSize) {
        let row: Array<boolean> = [];
        for (let j = 0; j < window.innerWidth; j+=blockSize) {
            row.push(false);
        }
        grid.push(row);
    }
    let pointers: Array<Array<number>> = [];
    for (let i = 0; i < numIslands; i++) {
        let x: number = Math.floor(RNG.getRandom() * grid[0]!.length);
        let y: number = Math.floor(RNG.getRandom() * grid!.length);
        while (grid[y]![x]) {
            x = Math.floor(RNG.getRandom() * grid[0]!.length);
            y = Math.floor(RNG.getRandom() * grid!.length);
        }
        grid[y]![x] = true;
        pointers.push([y, x]);
    }
    console.log(grid);
    let batch: Array<Array<number>> = []; 
    while (pointers.length > 0) {
        let pointer = pointers.pop();

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let chance = Math.abs(i * j) == 1 ? cornerProb : prob;
                if (pointer![0]! + i > -1 && pointer![1]! + j > -1 && pointer![0]! + i < grid.length && pointer![1]! + j < grid[0]!.length) {
                    if (!grid[pointer![0]! + i]![pointer![1]! + j] && RNG.getRandom() < chance) {
                        grid[pointer![0]! + i]![pointer![1]! + j] = true;
                        batch.push([pointer![0]! + i, pointer![1]! + j]);
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
        for (let j = 0; j < grid[0]!.length; j++) {
            if (grid[i]![j]) {
                ctx.fillStyle = "green";
            } else {
                ctx.fillStyle = "blue";
            }
            ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
            //ctx.strokeRect(j * blockSize, i*blockSize, blockSize, blockSize);
        }
    }

    console.log(grid);
}


function drawCaves() {
    RNG.setSeed(201022);
    class TunnelCarver {
        static splitChance = 0.01;

        direction: number;
        x: number;
        y: number;
        rad: number;

        constructor(x: number, y: number, size: number, dir?: number) {
            this.direction = dir ?? (RNG.getRandom() * 2 * Math.PI);
            this.x = x;
            this.y = y;
            this.rad = size;
        }

        contains(x: number, y: number) {
            let dist = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
            return dist < this.rad;
        }

        update() {
            let drdt = this.rad * 0.1;
            let dddt = 0.2;
            let minRad = 1;

            this.rad += (RNG.getRandom() * drdt) * (RNG.getRandom() < 0.5 ? 1 : -1);
            this.rad = Math.max(this.rad, minRad);
            this.direction += (RNG.getRandom() * dddt) * (RNG.getRandom() < 0.5 ? 1 : -1);
            while (this.direction < 0) this.direction += Math.PI * 2;
            while (this.direction >= Math.PI * 2) this.direction -= Math.PI * 2;
            let dir = this.direction;
            if (dir <= (Math.PI / 8) || dir > (Math.PI*15 / 8)) {
                this.x += 1;
            } else if (dir <= Math.PI*3 / 8) {
                this.x += 1;
                this.y -= 1;
            } else if (dir <= Math.PI*5 / 8) {
                this.y -= 1;
            } else if (dir <= Math.PI*7 / 8) {
                this.x -= 1;
                this.y -= 1;
            } else if (dir <= Math.PI*9 / 8) {
                this.x -= 1;
            } else if (dir <= Math.PI*11 / 8) {
                this.x -= 1;
                this.y += 1;
            } else if (dir <= Math.PI*13 / 8) {
                this.y += 1;
            } else {
                this.x += 1;
                this.y += 1;
            }
        }
    }

    let grid: Array<Array<boolean>> = [];
    let blockSize = 10;
    for (let i = 0; i < window.innerHeight; i += blockSize) {
        let row: Array<boolean> = [];
        for (let j = 0; j < window.innerWidth; j += blockSize) {
            row.push(false);
        }
        grid.push(row);
    }

    let tunnels: Array<TunnelCarver> = [];

    let numTunnels = Math.floor(RNG.getRandom() * 10) + 1;

    for (let i = 0; i < numTunnels; i++) {
        let outcome = Math.floor(RNG.getRandom() * 4);
        let dev = (RNG.getRandom() < 0.5 ? -1 : 1) * (RNG.getRandom() * Math.PI * 0.2);
        if (outcome == 0) {
            tunnels.push(new TunnelCarver(0, Math.floor(RNG.getRandom() * grid.length), 5, 0 + dev));
        } else if (outcome == 1) {
            tunnels.push(new TunnelCarver(Math.floor(RNG.getRandom() * grid[0]!.length), 0, 5, Math.PI / 2 + dev));
        } else if (outcome == 2) {
            tunnels.push(new TunnelCarver(grid[0]!.length - 1, Math.floor(RNG.getRandom() * grid.length), 5, Math.PI + dev));
        } else {
            tunnels.push(new TunnelCarver(Math.floor(RNG.getRandom() * grid[0]!.length), grid.length - 1, 5, Math.PI * 3 / 2 + dev));
        }
    }

    while (tunnels.length > 0) {
        let tunnel: TunnelCarver = tunnels.pop()!;
        while (true) {
            // flood fill the radius
            let pointers: Array<Array<number>> = [];
            let batch: Array<Array<number>> = [];
            pointers.push([tunnel.y, tunnel.x]);
            if (!(tunnel.x < 0 || tunnel.y < 0 || tunnel.x >= grid[0]!.length || tunnel.y >= grid.length)) {
                grid[tunnel.y]![tunnel.x] = true;
            } else {
                break;
            }
            while (pointers.length > 0) {
                let pointer = pointers.pop();
                for (let [i, j] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
                    if (!(pointer![0]! + i! < 0 || pointer![1]! + j! < 0 || pointer![1]! + j! >= grid[0]!.length || pointer![0]! + i! >= grid.length) && grid[pointer![0]! + i!]![pointer![1]! + j!] == false && tunnel.contains(pointer![1]! + j!, pointer![0]! + i!)) {
                        grid[pointer![0]! + i!]![pointer![1]! + j!] = true;
                        batch.push([pointer![0]! + i!, pointer![1]! + j!]);
                    }
                }
                if (pointers.length == 0) {
                    pointers = batch;
                    batch = [];
                }
            }

            // update
            tunnel.update();

            if (RNG.getRandom() < TunnelCarver.splitChance) {
                tunnels.push(new TunnelCarver(tunnel.x, tunnel.y, tunnel.rad, tunnel.direction));
            }
        }
    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0]!.length; j++) {
            if (grid[i]![j]) {
                ctx.fillStyle = "black";
            } else {
                ctx.fillStyle = "#39261C";
            }
            ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
            //ctx.strokeRect(j * blockSize, i*blockSize, blockSize, blockSize);
        }
    }
    console.log(grid);
}

drawCaves();

//drawIslands();

// for (let i = 0; i < 2; i++) {
//     RNG.setSeed(10);
//     for (let i: number = 0; i < 10; i++) {
//         console.log(RNG.getRandom());
//     }
//     console.log("\n");
// }
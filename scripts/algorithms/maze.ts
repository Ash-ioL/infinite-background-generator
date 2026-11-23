// DFS Maze Generation

import { Deque } from "../components/Deque.js";
import { MazeBox } from "../components/MazeBox.js";

// Perfect Maze - Every point has exactly one path tha tcan be reached form any other point, no loops

// grid full of wall

// random unvisited cell
// go to celll,
// mark visited
// backtrack if no univisited
// repeat untill all cells are visited

const grid: Array<Array<MazeBox>> = [];
const visited: Array<Array<boolean>> = [];
const pointers: Deque<number> = new Deque<number>();

let mazeSize = 50;

function expandIdx(i: number) {
    return [i / mazeSize, i % mazeSize];
}


function compressIdx(i: number, j: number) {
    return i * mazeSize + j;
}

function getMaze(): Array<Array<MazeBox>> {
    grid.length = 0;
    visited.length = 0;
    for (let i = 0; i < mazeSize; i++) {
        grid.push([]);
        visited.push([]);
        for (let j = 0; j < mazeSize; j++) {
            grid[i]!.push(new MazeBox(true, true));
            visited[i]!.push(false);
        }
    }
    dfs(...randPoint());
    clearVisted();
    return grid;
}

function clearVisted() {
    for (let i = 0; i < mazeSize; i++) {
        for (let j = 0; j < mazeSize; j++) {
            visited[i]![j]! = false;
        }
    }
}

function randPoint(): [number, number] {
    const x = Math.floor(Math.random() * mazeSize);
    const y = Math.floor(Math.random() * mazeSize);
    return [x, y];
}
function dfs(i: number, j: number) {
    visited[i]![j]! = true;
    const directions = [
        [0, 1], 
        [1, 0], 
        [0, -1],
        [-1, 0],
    ];

    for (let k = directions.length - 1; k > 0; k--) {
        const l = Math.floor(Math.random() * (k + 1));
        [directions[k], directions[l]] = [directions[l]!, directions[k]!];
    }

    for (const [di, dj] of directions) {
        const ni = i + di!;
        const nj = j + dj!;
        if (ni >= 0 && ni < mazeSize && nj >= 0 && nj < mazeSize && !visited[ni]![nj]!) {
            visited[ni]![nj]! = true;
            if (di === 0 && dj === 1) {
                grid[i]![j+1]!.left = false;
            } else if (di === 1 && dj === 0) {
                grid[i+1]![j]!.top = false;
            } else if (di === 0 && dj === -1) {
                grid[i]![j]!.left = false;
            } else if (di === -1 && dj === 0) {
                grid[i]![j]!.top = false;
            }
            dfs(ni, nj);
        }
    }
}

function drawMaze(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, grid: Array<Array<MazeBox>>, primaryColor = "white") {
    const w = Math.min(canvas.width, canvas.height);
    const cellSize = w / mazeSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    for (let i = 0; i < mazeSize; i++) {
        for (let j = 0; j < mazeSize; j++) {
            const x = j * cellSize;
            const y = i * cellSize;
            if (grid[i]![j]!.top) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + cellSize, y);
                ctx.stroke();
            }
            if (grid[i]![j]!.left) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + cellSize);
                ctx.stroke();
            }
        }
    }
}

export { getMaze, drawMaze };
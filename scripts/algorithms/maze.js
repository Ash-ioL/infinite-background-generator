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
const grid = [];
const visited = [];
const pointers = new Deque();
let mode = "DFS";
let mazeSize = 50;
let prevTime = -1;
let interval = 2;
function expandIdx(i) {
    return [Math.floor(i / mazeSize), i % mazeSize];
}
function compressIdx(i, j) {
    return i * mazeSize + j;
}
function makeMaze() {
    grid.length = 0;
    visited.length = 0;
    for (let i = 0; i < mazeSize; i++) {
        grid.push([]);
        visited.push([]);
        for (let j = 0; j < mazeSize; j++) {
            grid[i].push(new MazeBox(true, true));
            visited[i].push(false);
        }
    }
    dfs(...randPoint());
    clearVisited();
    return grid;
}
function clearVisited() {
    for (let i = 0; i < mazeSize; i++) {
        for (let j = 0; j < mazeSize; j++) {
            visited[i][j] = false;
        }
    }
}
function putInitPointer() {
    pointers.clear();
    pointers.push(0);
    visited[0][0] = true;
}
function randPoint() {
    const x = Math.floor(Math.random() * mazeSize);
    const y = Math.floor(Math.random() * mazeSize);
    return [x, y];
}
function dfs(i, j) {
    visited[i][j] = true;
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    for (let k = directions.length - 1; k > 0; k--) {
        const l = Math.floor(Math.random() * (k + 1));
        [directions[k], directions[l]] = [directions[l], directions[k]];
    }
    for (const [di, dj] of directions) {
        const ni = i + di;
        const nj = j + dj;
        if (ni >= 0 && ni < mazeSize && nj >= 0 && nj < mazeSize && !visited[ni][nj]) {
            visited[ni][nj] = true;
            if (di === 0 && dj === 1) {
                grid[i][j + 1].left = false;
            }
            else if (di === 1 && dj === 0) {
                grid[i + 1][j].top = false;
            }
            else if (di === 0 && dj === -1) {
                grid[i][j].left = false;
            }
            else if (di === -1 && dj === 0) {
                grid[i][j].top = false;
            }
            dfs(ni, nj);
        }
    }
}
function findEnd() {
    console.log(visited);
    if (pointers.isEmpty())
        return true;
    const idx = pointers.pop();
    const [i, j] = expandIdx(idx);
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    for (const [di, dj] of directions) {
        const ni = i + di;
        const nj = j + dj;
        if (ni === mazeSize - 1 && nj === mazeSize - 1) {
            visited[ni][nj] = true;
            return true;
        }
        if (ni >= 0 && ni < mazeSize && nj >= 0 && nj < mazeSize && !visited[ni][nj]) {
            if ((j + 1 < mazeSize && di === 0 && dj === 1 && !grid[i][j + 1].left) ||
                (i + 1 < mazeSize && di === 1 && dj === 0 && !grid[i + 1][j].top) ||
                (di === 0 && dj === -1 && !grid[i][j].left) ||
                (di === -1 && dj === 0 && !grid[i][j].top)) {
                visited[ni][nj] = true;
                if (mode === "DFS") {
                    pointers.push(compressIdx(ni, nj));
                }
                else if (mode === "BFS") {
                    pointers.pushleft(compressIdx(ni, nj));
                }
            }
        }
    }
    return false;
}
function traverseIfTime() {
    const currentTime = Date.now();
    if (currentTime - prevTime >= interval) {
        prevTime = currentTime;
        return findEnd();
    }
    return false;
}
function drawMaze(canvas, ctx, primaryColor = "white", secondaryColor = "white") {
    const w = Math.min(canvas.width, canvas.height);
    const cellSize = w / mazeSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    for (let i = 0; i < mazeSize; i++) {
        for (let j = 0; j < mazeSize; j++) {
            const x = j * cellSize;
            const y = i * cellSize;
            if (grid[i][j].top) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + cellSize, y);
                ctx.stroke();
            }
            if (grid[i][j].left) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + cellSize);
                ctx.stroke();
            }
            if (visited[i][j] || (i === 0 && j === 0) || (i === mazeSize - 1 && j === mazeSize - 1)) {
                ctx.fillStyle = secondaryColor;
                if (i === 0 && j === 0) {
                    ctx.fillStyle = "green";
                }
                else if (i === mazeSize - 1 && j === mazeSize - 1) {
                    ctx.fillStyle = "red";
                }
                ctx.fillRect(x, y, cellSize, cellSize);
            }
        }
    }
    ctx.moveTo(0, mazeSize * cellSize);
    ctx.lineTo(mazeSize * cellSize, mazeSize * cellSize);
    ctx.stroke();
    ctx.moveTo(mazeSize * cellSize, 0);
    ctx.lineTo(mazeSize * cellSize, mazeSize * cellSize);
    ctx.stroke();
}
function setMode(modeStr) {
    mode = modeStr;
}
export { makeMaze, drawMaze, traverseIfTime, setMode, clearVisited, putInitPointer };
//# sourceMappingURL=maze.js.map
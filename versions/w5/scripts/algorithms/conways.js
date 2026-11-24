import { RNG } from "../util.js";
let isLoading = false;
// Conways game of life
// Rules:
// No neigbhors, dead, 1 neigthbor, dead, 2 neighbors, alive
// 3 live neighbors cause a new cell to be born
// 4 r more neighbors = deadd
// 128, 64, 32, 16, 8, 4, 2, 1
let grid = [0, 0, 0, 0, 0, 0, 0, 0];
let nextGrid = [0, 0, 0, 0, 0, 0, 0, 0];
let prevTime = Date.now();
let prevUpdates = 0;
let updateStreak = 1;
let interval = 50;
function initGrid() {
    for (let i = 0; i < grid.length; i++) {
        grid[i] = Math.floor(RNG.getRandom() * 256); // & Math.floor(RNG.getRandom() * 256);
    }
    clearNextGrid();
}
// export function startLoading() {
//     isLoading = true;
//     loadingScreen.style.display = "";
//     initGrid();
//     loop();
// }
// export function stopLoading() {
//     loadingScreen.style.display = "none";
//     isLoading = false;
// }
function clearNextGrid() {
    for (let i = 0; i < nextGrid.length; i++) {
        nextGrid[i] = 0;
    }
}
function copyNextGrid() {
    for (let i = 0; i < nextGrid.length; i++) {
        grid[i] = nextGrid[i];
    }
}
function updateGrid() {
    clearNextGrid();
    let i = 128;
    let updates = 0;
    while (i > 0) {
        for (let j = 0; j < grid.length; j++) {
            let neighbors = 0;
            if (j > 0 && grid[j - 1] & i)
                neighbors++;
            if (j < grid.length - 1 && grid[j + 1] & i)
                neighbors++;
            if (i < 128 && grid[j] & (i * 2))
                neighbors++;
            if (i > 1 && grid[j] & (i / 2))
                neighbors++;
            if (i > 1 && j > 0 && grid[j - 1] & (i / 2))
                neighbors++;
            if (i > 1 && j < grid.length - 1 && grid[j + 1] & (i / 2))
                neighbors++;
            if (i < 128 && j > 0 && grid[j - 1] & (i * 2))
                neighbors++;
            if (i < 128 && j < grid.length - 1 && grid[j + 1] & (i * 2))
                neighbors++;
            if (neighbors == 2 && grid[j] & i) {
                nextGrid[j] |= i;
                updates += 1;
            }
            else if (neighbors == 3) {
                nextGrid[j] |= i;
                updates += 1;
            }
        }
        i /= 2;
    }
    copyNextGrid();
    if (updates == prevUpdates) {
        updateStreak++;
        if (updateStreak > 10) {
            initGrid();
            updateStreak = 1;
        }
    }
    else {
        updateStreak = 1;
    }
    prevUpdates = updates;
}
export function updateGridIfTime() {
    if (prevTime === -1)
        prevTime = Date.now();
    let curTime = Date.now();
    let deltaTime = curTime - prevTime;
    if (deltaTime > interval) {
        prevTime = curTime;
        updateGrid();
    }
}
export function drawGrid(canvas, ctx, primaryColor = "white", secondaryColor = "white") {
    let w = Math.min(canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = secondaryColor;
    ctx.fillStyle = primaryColor;
    ctx.lineWidth = 3;
    let cellWidth = w / grid.length;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < 8; j++) {
            let mask = 2 ** j;
            ctx.strokeRect(i * cellWidth, j * cellWidth, cellWidth, cellWidth);
            if (grid[i] & mask) {
                ctx.fillRect(i * cellWidth, j * cellWidth, cellWidth, cellWidth);
            }
        }
    }
}
// loop();
// function loop() {
//     if (prevTime === -1) prevTime = Date.now();
//     let curTime = Date.now();
//     let deltaTime = curTime - prevTime;
//     if (deltaTime > 150) {
//         prevTime = curTime;
//         clearNextGrid();
//         updateGrid();
//         drawGrid();
//     }
//     if (isLoading)
//         requestAnimationFrame(loop);
// }
//# sourceMappingURL=conways.js.map
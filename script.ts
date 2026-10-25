const canvas: HTMLCanvasElement = document.getElementById("whiteboard") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


console.log(canvas); 

enum CursorMode {
    None
}

enum BackgroundMode {
    Black,
    White,
    Checkerboard
}

let currentCursorMode: CursorMode = CursorMode.None as CursorMode;
let currentBackgroundMode: BackgroundMode = BackgroundMode.White as BackgroundMode;

if (currentCursorMode === CursorMode.None) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 100, 100);
}

if (currentBackgroundMode === BackgroundMode.Black) {
    canvas.style.background = "black";
} else if (currentBackgroundMode === BackgroundMode.White) {
    canvas.style.background = "white";
}
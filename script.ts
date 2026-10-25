const canvas: HTMLCanvasElement = document.getElementById("whiteboard") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
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
let currentBackgroundMode: BackgroundMode = BackgroundMode.Checkerboard as BackgroundMode;

function draw() {
    if (currentCursorMode === CursorMode.None) {
        
    }

    if (currentBackgroundMode === BackgroundMode.Black) {
        canvas.style.background = "black";
    } else if (currentBackgroundMode === BackgroundMode.White) {
        canvas.style.background = "white";
    } else if (currentBackgroundMode == BackgroundMode.Checkerboard) {
        const size: number = 100;
        const width: number = window.innerWidth;
        const height: number = window.innerHeight;
        let outerToggle: boolean = false;
        for (let i: number = 0; i < height; i+=size) {
            let innerToggle: boolean = outerToggle ? false : true;
            for (let j: number = 0; j < width; j+=size) {
                if (innerToggle) ctx.fillStyle = "white";
                else ctx.fillStyle = "black";
                innerToggle = !innerToggle;
                ctx.fillRect(j, i, size, size);
            }
            outerToggle = !outerToggle;
        }
    }
}

draw();
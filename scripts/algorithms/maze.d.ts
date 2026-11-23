import { MazeBox } from "../components/MazeBox.js";
declare function getMaze(): Array<Array<MazeBox>>;
declare function drawMaze(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, grid: Array<Array<MazeBox>>, primaryColor?: string): void;
export { getMaze, drawMaze };
//# sourceMappingURL=maze.d.ts.map
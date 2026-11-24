import { MazeBox } from "../components/MazeBox.js";
declare function makeMaze(): Array<Array<MazeBox>>;
declare function clearVisited(): void;
declare function putInitPointer(): void;
declare function traverseIfTime(): boolean;
declare function drawMaze(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, primaryColor?: string, secondaryColor?: string): void;
declare function setMode(modeStr: string): void;
export { makeMaze, drawMaze, traverseIfTime, setMode, clearVisited, putInitPointer };
//# sourceMappingURL=maze.d.ts.map
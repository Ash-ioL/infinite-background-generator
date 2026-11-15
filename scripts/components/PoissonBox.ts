import { RNG } from "../util.js";

export class PoissonBox {
    width: number = 1;
    top: PoissonBox | null;
    right: PoissonBox | null;
    bottom: PoissonBox | null;
    left: PoissonBox | null;
    coord: Array<number> | null = null;
    constructor(top: PoissonBox | null, right: PoissonBox | null, bottom: PoissonBox | null, left: PoissonBox | null) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }

    hasPoint(): boolean {
        return this.coord != null;
    }
    
    addPoint(x: number, y: number) {
        this.coord = [x, y];
    }

    getNearestDistance(x: number, y: number) {
        let current: number = Infinity;
        if (this.top != null && this.top.coord != null) {
            let xDist = Math.abs(this.top.coord![0]! - x);
            let yDist = Math.abs(this.top.coord![1]! - 1 - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.left != null && this.left.coord != null) {
            let xDist = Math.abs(this.left.coord![0]! - 1 - x);
            let yDist = Math.abs(this.left.coord![1]! - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.bottom != null && this.bottom.coord != null) {
            let xDist = Math.abs(this.bottom.coord![0]! - x);
            let yDist = Math.abs(this.bottom.coord![1]! + 1 - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.right != null && this.right.coord != null) {
            let xDist = Math.abs(this.right.coord![0]! + 1 - x);
            let yDist = Math.abs(this.right.coord![1]! - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }

        for (let i = -2; i < 3; i++) {
            for (let j = -2; j < 3; j++) {
                if (i == 0 && j == 0) continue;

                let xOff = i;
                let yOff = j;

                let xStart: number;
                let yStart: number;

                try {
                    if (i == -2 && j == -2) {
                        let startCoord: Array<number> = this.bottom!.bottom!.left!.left!.coord!;
                        xStart = startCoord![0]!;
                        yStart = startCoord![1]!;
                    }
                } catch {
                        continue;
                    }
            }
        }
        //checking diagonals and like a 9 other boxes T_T
        return current;
    }

    tryPoint(x: number, y: number): boolean {
        if (this.hasPoint()) return false;
        let distance: number = this.getNearestDistance(x, y);
        if (distance === Infinity || distance > this.width * Math.SQRT2) {
            this.addPoint(x, y);
            return true;
        }
        return false;
    }
}

export class BridcidentBox extends PoissonBox {
    override getNearestDistance(x: number, y: number) {
        let current: number = Infinity;
        if (this.top != null && this.top.coord != null) {
            let xDist = Math.abs(this.top.coord![0]! - x);
            let yDist = Math.abs(this.top.coord![1]! - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.left != null && this.left.coord != null) {
            let xDist = Math.abs(this.left.coord![0]! - x);
            let yDist = Math.abs(this.left.coord![1]! - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.bottom != null && this.bottom.coord != null) {
            let xDist = Math.abs(this.bottom.coord![0]! - x);
            let yDist = Math.abs(this.bottom.coord![1]! - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.right != null && this.right.coord != null) {
            let xDist = Math.abs(this.right.coord![0]! - x);
            let yDist = Math.abs(this.right.coord![1]! - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        return current;
    }
}
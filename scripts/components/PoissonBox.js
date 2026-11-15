import { RNG } from "../util.js";
export class PoissonBox {
    width = 1;
    top;
    right;
    bottom;
    left;
    coord = null;
    constructor(top, right, bottom, left) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
    hasPoint() {
        return this.coord != null;
    }
    addPoint(x, y) {
        this.coord = [x, y];
    }
    getNearestDistance(x, y) {
        let current = Infinity;
        if (this.top != null && this.top.coord != null) {
            let xDist = Math.abs(this.top.coord[0] - x);
            let yDist = Math.abs(this.top.coord[1] - 1 - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.left != null && this.left.coord != null) {
            let xDist = Math.abs(this.left.coord[0] - 1 - x);
            let yDist = Math.abs(this.left.coord[1] - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.bottom != null && this.bottom.coord != null) {
            let xDist = Math.abs(this.bottom.coord[0] - x);
            let yDist = Math.abs(this.bottom.coord[1] + 1 - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.right != null && this.right.coord != null) {
            let xDist = Math.abs(this.right.coord[0] + 1 - x);
            let yDist = Math.abs(this.right.coord[1] - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        for (let i = -2; i < 3; i++) {
            for (let j = -2; j < 3; j++) {
                if (i == 0 && j == 0)
                    continue;
                let xOff = i;
                let yOff = j;
                let xStart;
                let yStart;
                try {
                    if (i == -2 && j == -2) {
                        let startCoord = this.bottom.bottom.left.left.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == -1 && j == -2) {
                        let startCoord = this.bottom.bottom.left.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 0 && j == -2) {
                        let startCoord = this.bottom.bottom.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 1 && j == -2) {
                        let startCoord = this.bottom.bottom.right.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 2 && j == -2) {
                        let startCoord = this.bottom.bottom.right.right.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == -2 && j == -1) {
                        let startCoord = this.bottom.left.left.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == -1 && j == -1) {
                        let startCoord = this.bottom.left.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 0 && j == -1) {
                        let startCoord = this.bottom.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 1 && j == -1) {
                        let startCoord = this.bottom.right.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 2 && j == -1) {
                        let startCoord = this.bottom.right.right.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == -2 && j == 0) {
                        let startCoord = this.left.left.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == -1 && j == 0) {
                        let startCoord = this.left.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 1 && j == 0) {
                        let startCoord = this.right.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 2 && j == 0) {
                        let startCoord = this.right.right.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == -2 && j == 1) {
                        let startCoord = this.top.left.left.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == -1 && j == 1) {
                        let startCoord = this.top.left.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 0 && j == 1) {
                        let startCoord = this.top.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 1 && j == 1) {
                        let startCoord = this.top.right.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 2 && j == 1) {
                        let startCoord = this.top.right.right.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == -2 && j == 2) {
                        let startCoord = this.top.top.left.left.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == -1 && j == 2) {
                        let startCoord = this.top.top.left.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 0 && j == 2) {
                        let startCoord = this.top.top.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 1 && j == 2) {
                        let startCoord = this.top.top.right.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                    else if (i == 2 && j == 2) {
                        let startCoord = this.top.top.right.right.coord;
                        xStart = startCoord[0];
                        yStart = startCoord[1];
                    }
                }
                catch {
                    continue;
                }
                let xDist = Math.abs(x - (xStart + xOff));
                let yDist = Math.abs(x - (yStart + yOff));
                let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
                current = Math.min(current, hypot);
            }
        }
        //checking diagonals and like a 9 other boxes T_T
        return current;
    }
    tryPoint(x, y) {
        if (this.hasPoint())
            return false;
        let distance = this.getNearestDistance(x, y);
        if (distance === Infinity || distance > this.width * Math.SQRT2) {
            this.addPoint(x, y);
            return true;
        }
        return false;
    }
}
export class BridcidentBox extends PoissonBox {
    getNearestDistance(x, y) {
        let current = Infinity;
        if (this.top != null && this.top.coord != null) {
            let xDist = Math.abs(this.top.coord[0] - x);
            let yDist = Math.abs(this.top.coord[1] - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.left != null && this.left.coord != null) {
            let xDist = Math.abs(this.left.coord[0] - x);
            let yDist = Math.abs(this.left.coord[1] - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.bottom != null && this.bottom.coord != null) {
            let xDist = Math.abs(this.bottom.coord[0] - x);
            let yDist = Math.abs(this.bottom.coord[1] - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.right != null && this.right.coord != null) {
            let xDist = Math.abs(this.right.coord[0] - x);
            let yDist = Math.abs(this.right.coord[1] - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        return current;
    }
}
//# sourceMappingURL=PoissonBox.js.map
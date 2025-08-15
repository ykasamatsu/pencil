import { CellState } from "../Board/Cell/CellState";

type Grid = number[][];

export class PuzzleGenerator {

    private width: number;
    private height: number;
    private grid: Grid;

    /**
     * Generates a single valid puzzle solution.
     * @param width The width of the grid (must be even).
     * @param height The height of the grid (must be even).
     * @returns A grid representing the puzzle solution, or null if not found.
     */
    public generate(width: number, height: number): Grid | null {
        if (width % 2 !== 0 || height % 2 !== 0) {
            console.error("Grid dimensions must be even.");
            return null;
        }

        this.width = width;
        this.height = height;

        // Retry until a valid board with unique rows/columns is found.
        for (let i = 0; i < 100; i++) { // Max 100 retries to prevent infinite loops
            this.grid = this.createEmptyGrid();
            if (this.solve(0, 0)) {
                if (this.hasUniqueRows() && this.hasUniqueColumns()) {
                    return this.grid;
                }
            }
        }

        console.error("Failed to generate a valid puzzle after multiple attempts.");
        return null;
    }

    private createEmptyGrid(): Grid {
        return Array.from({ length: this.height }, () => Array(this.width).fill(CellState.Empty));
    }

    /**
     * The main recursive backtracking solver.
     */
    private solve(y: number, x: number): boolean {
        if (y === this.height) {
            // Base case: successfully filled the whole board
            return true;
        }

        const nextY = (x === this.width - 1) ? y + 1 : y;
        const nextX = (x === this.width - 1) ? 0 : x + 1;

        const colorsToTry = Math.random() > 0.5 ? [CellState.Colored, CellState.White] : [CellState.White, CellState.Colored];

        for (const color of colorsToTry) {
            this.grid[y][x] = color;
            if (this.isValid(y, x)) {
                if (this.solve(nextY, nextX)) {
                    return true;
                }
            }
        }

        // Backtrack
        this.grid[y][x] = CellState.Empty;
        return false;
    }

    /**
     * Checks if the grid is valid after placing a color at (y, x).
     */
    private isValid(y: number, x: number): boolean {
        return (
            this.checkConsecutive(y, x) &&
            this.checkColorCount(y, x)
        );
    }

    /**
     * Rule 1: No more than two consecutive cells of the same color.
     */
    private checkConsecutive(y: number, x: number): boolean {
        const color = this.grid[y][x];
        // Check horizontal
        if (x > 1 && this.grid[y][x - 1] === color && this.grid[y][x - 2] === color) return false;
        // Check vertical
        if (y > 1 && this.grid[y - 1][x] === color && this.grid[y - 2][x] === color) return false;
        return true;
    }

    /**
     * Rule 2: Each row and column must have an equal number of red and white cells.
     */
    private checkColorCount(y: number, x: number): boolean {
        let rowCount = { [CellState.Colored]: 0, [CellState.White]: 0 };
        let colCount = { [CellState.Colored]: 0, [CellState.White]: 0 };

        for (let i = 0; i < this.width; i++) {
            if(this.grid[y][i] !== CellState.Empty) rowCount[this.grid[y][i]]++;
        }
        for (let i = 0; i < this.height; i++) {
            if(this.grid[i][x] !== CellState.Empty) colCount[this.grid[i][x]]++;
        }

        if (rowCount[CellState.Colored] > this.width / 2) return false;
        if (rowCount[CellState.White] > this.width / 2) return false;
        if (colCount[CellState.Colored] > this.height / 2) return false;
        if (colCount[CellState.White] > this.height / 2) return false;

        return true;
    }

    /**
     * Rule 3: All rows must be unique.
     */
    private hasUniqueRows(): boolean {
        const rowStrings = new Set<string>();
        for (let y = 0; y < this.height; y++) {
            const rowStr = this.grid[y].join(',');
            if (rowStrings.has(rowStr)) return false;
            rowStrings.add(rowStr);
        }
        return true;
    }

    /**
     * Rule 3: All columns must be unique.
     */
    private hasUniqueColumns(): boolean {
        const colStrings = new Set<string>();
        for (let x = 0; x < this.width; x++) {
            const col = [];
            for (let y = 0; y < this.height; y++) {
                col.push(this.grid[y][x]);
            }
            const colStr = col.join(',');
            if (colStrings.has(colStr)) return false;
            colStrings.add(colStr);
        }
        return true;
    }

    // --- Digger and Solver Logic ---

    /**
     * Generates a puzzle with a unique solution from a solved grid.
     * This is the main entry point to get a playable puzzle.
     */
    public generatePuzzle(width: number, height: number): Grid | null {
        const solution = this.generate(width, height);
        if (!solution) {
            console.error("Could not generate a solution board.");
            return null;
        }
        return this.dig(solution);
    }

    /**
     * Removes cells from a solution grid to create a puzzle.
     * @param solution A fully solved grid.
     * @returns A puzzle grid with some cells set to Empty.
     */
    private dig(solution: Grid): Grid {
        const puzzle = JSON.parse(JSON.stringify(solution));

        const coords = [];
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                coords.push({ y, x });
            }
        }

        // Shuffle coordinates to remove cells in random order
        for (let i = coords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [coords[i], coords[j]] = [coords[j], coords[i]];
        }

        for (const { y, x } of coords) {
            const originalColor = puzzle[y][x];
            puzzle[y][x] = CellState.Empty;

            const tempSolver = new PuzzleGenerator();
            const solutions = tempSolver.countSolutions(puzzle);

            if (solutions !== 1) {
                // If the puzzle is no longer uniquely solvable, revert the change.
                puzzle[y][x] = originalColor;
            }
        }

        return puzzle;
    }

    /**
     * Counts the number of possible solutions for a given grid.
     * @param grid The puzzle grid to solve.
     * @returns The number of solutions (0, 1, or 2 for "more than 1").
     */
    private countSolutions(grid: Grid): number {
        this.grid = JSON.parse(JSON.stringify(grid));
        this.width = this.grid[0].length;
        this.height = this.grid.length;
        return this._solveAndCount();
    }

    /**
     * Recursive solver that counts solutions. Stops when more than 1 solution is found.
     */
    private _solveAndCount(): number {
        let y = -1, x = -1;
        // Find the first empty cell
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                if (this.grid[r][c] === CellState.Empty) {
                    y = r;
                    x = c;
                    break;
                }
            }
            if (y !== -1) break;
        }

        // If no empty cells, a solution is found
        if (y === -1) {
            // Final check for unique rows/columns rule
            if(this.hasUniqueRows() && this.hasUniqueColumns()) {
                return 1;
            }
            return 0;
        }

        let solutionCount = 0;
        const colorsToTry = [CellState.Colored, CellState.White];

        for (const color of colorsToTry) {
            this.grid[y][x] = color;
            if (this.isValid(y, x)) {
                solutionCount += this._solveAndCount();
                // Optimization: if we already found more than one solution, stop searching.
                if (solutionCount > 1) {
                    break;
                }
            }
        }

        // Backtrack
        this.grid[y][x] = CellState.Empty;
        return solutionCount;
    }
}

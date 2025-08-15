import { PuzzleGenerator } from "../logic/PuzzleGenerator";
import { Point } from "../Lib/Point";
import { Util } from "../Lib/Util";
import { Board } from "./Board";
import { Cell } from "./Cell/Cell";
import { CellMap } from "./Cell/CellMap";
import { CellObject } from "./Cell/CellObject";
import { CellState } from "./Cell/CellState";
import { EdgeMap } from "./Edge/EdgeMap";
import { EdgeObject } from "./Edge/EdgeObject";

export class BoardBinairo extends Board {

	constructor(boardElem) {
		super(boardElem)
		Board.main = this
	}

	initInput() {
		super.initInput()

		for (let cell of this.cellMap) {
			cell.object.elem.addEventListener("pointerdown", e => { if (!e.isPrimary) return; cell.object.onDown(e); })
			cell.object.elem.addEventListener("pointerover", (e) => { if (!e.isPrimary) return; cell.object.onOver(e) })
			cell.object.elem.addEventListener("pointerout", (e) => { if (!e.isPrimary) return; cell.object.onOut(e) })
		}
	}

	initCellMap(size: number = 6) {
		// Set board size from parameter
		this.w = size;
		this.h = size;

		this.elem.setAttribute("w", `${this.w}`);
		this.elem.setAttribute("h", `${this.h}`);
		this.elem.setAttribute("viewBox", `0 0 ${this.w} ${this.h}`);

		this.cellMap = new CellMap(this.w, this.h);

		// Initialize CellObjects
		for (let y = 0; y < this.h; y++) {
			for (let x = 0; x < this.w; x++) {
				let cell = this.cellMap.get(x, y);
				let cellObject = new CellObject(cell);
				this.cellMapObject.addChild(cellObject);
			}
		}

		// Generate a new puzzle with a unique solution
		const generator = new PuzzleGenerator();
		const puzzle = generator.generatePuzzle(this.w, this.h);

		if (puzzle) {
			// Set cell states from the generated puzzle
			for (let y = 0; y < this.h; y++) {
				for (let x = 0; x < this.w; x++) {
					const cell = this.cellMap.get(x, y);
					const state = puzzle[y][x];
					cell.object.updateState(state);
					// Lock the pre-filled cells, leave empty ones unlocked
					if (state !== CellState.Empty) {
						cell.object.lock(true);
					} else {
						cell.object.lock(false);
					}
				}
			}
		} else {
			console.error("Failed to generate puzzle.");
		}
	}

	onCellChange(): void {
		// Future: Add rule validation logic here
		console.log("Cell changed. Board validation should run.");
	}

	initEdgeMap() {
		this.edgeMap = new EdgeMap(this.w, this.h)
		for (let x = 0; x < this.w * 2 + 1; x++) {
			for (let y = 0; y < this.h * 2 + 1; y++) {
				let edge = this.edgeMap.get(x, y)
				if ((x % 2 + y % 2) % 2 == 1) {
					let edgeObject = new EdgeObject(edge)
					if (x == 0 || y == 0 || x == this.w * 2 || y == this.h * 2) edge.setBorder(true)//outer
					edgeObject.drawEdge()
					this.edgeMapObject.addChild(edgeObject)
				}
			}
		}

		for (let cell of this.cellMap) {
			for (let i = 0; i < 8; i++) {
				let edge = this.edgeMap.get(cell.x * 2 + 1 + Point.around[i].x, cell.y * 2 + 1 + Point.around[i].y)
				edge.cells.push(cell)
				cell.edges[i] = edge
			}
		}

		this.cellMap.createRegion()

		for (let cell of this.cellMap) {
			cell.object.drawPath()
		}
	}

	getHint() {
		for (let cell of this.cellMap) {
			if (cell.state !== CellState.Empty) {
				continue;
			}

			let possibleStates = [];
			let reasons = {};

			for (let state of CellState.ColoredAndWhite) {
				let reason = this.checkViolation(cell, state);
				if (!reason) {
					possibleStates.push(state);
				} else {
					reasons[state] = reason;
				}
			}

			if (possibleStates.length === 1) {
				const state = possibleStates[0];
				const oppositeState = CellState.getOpposite(state);
				const reason = reasons[oppositeState];
				return { cell, state, reason };
			}
		}
		return null;
	}

	checkViolation(cell: Cell, state: number): string | null {
		let reason = this.isTriumvirate(cell, state);
		if (reason) return reason;

		reason = this.isBalanceViolated(cell, state);
		if (reason) return reason;

		reason = this.isUniquenessViolated(cell, state);
		if (reason) return reason;

		return null;
	}

	isTriumvirate(cell: Cell, state: number): string | null {
		const { x, y } = cell;
		const w = this.cellMap.w;
		const h = this.cellMap.h;

		// Horizontal check
		if (x > 1 && this.cellMap.get(x - 1, y).state === state && this.cellMap.get(x - 2, y).state === state) return "三連禁止";
		if (x < w - 2 && this.cellMap.get(x + 1, y).state === state && this.cellMap.get(x + 2, y).state === state) return "三連禁止";
		if (x > 0 && x < w - 1 && this.cellMap.get(x - 1, y).state === state && this.cellMap.get(x + 1, y).state === state) return "三連禁止";

		// Vertical check
		if (y > 1 && this.cellMap.get(x, y - 1).state === state && this.cellMap.get(x, y - 2).state === state) return "三連禁止";
		if (y < h - 2 && this.cellMap.get(x, y + 1).state === state && this.cellMap.get(x, y + 2).state === state) return "三連禁止";
		if (y > 0 && y < h - 1 && this.cellMap.get(x, y - 1).state === state && this.cellMap.get(x, y + 1).state === state) return "三連禁止";

		return null;
	}

	isBalanceViolated(cell: Cell, state: number): string | null {
		const row = this.cellMap.rows[cell.y];
		const column = this.cellMap.columns[cell.x];
		const maxCount = this.cellMap.w / 2;

		let rowCount = 0;
		for (let c of row) {
			if (c.state === state) rowCount++;
		}
		if (rowCount >= maxCount) return `バランス (行)`;

		let colCount = 0;
		for (let c of column) {
			if (c.state === state) colCount++;
		}
		if (colCount >= maxCount) return `バランス (列)`;

		return null;
	}

	isUniquenessViolated(cell: Cell, state: number): string | null {
		// Temporarily set the state
		cell.state = state;

		const checkUniqueness = (line: CellMap, allLines: CellMap[]): boolean => {
			if (line.some(c => c.state === CellState.Empty)) {
				return false; // Not a complete line
			}

			const lineSignature = line.map(c => c.state).join('');

			for (let otherLine of allLines) {
				if (line === otherLine) continue;
				if (otherLine.some(c => c.state === CellState.Empty)) continue;

				const otherLineSignature = otherLine.map(c => c.state).join('');
				if (lineSignature === otherLineSignature) {
					return true; // Found a duplicate
				}
			}
			return false;
		}

		let isViolated = false;
		const row = this.cellMap.rows[cell.y];
		if (checkUniqueness(row, this.cellMap.rows)) {
			isViolated = true;
		}

		if (!isViolated) {
			const column = this.cellMap.columns[cell.x];
			if (checkUniqueness(column, this.cellMap.columns)) {
				isViolated = true;
			}
		}

		// Revert the state
		cell.state = CellState.Empty;

		return isViolated ? `ユニーク` : null;
	}
}
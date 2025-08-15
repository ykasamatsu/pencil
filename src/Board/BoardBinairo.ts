import { PuzzleGenerator } from "../logic/PuzzleGenerator";
import { Point } from "../Lib/Point";
import { Util } from "../Lib/Util";
import { Board } from "./Board";
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
	}


}
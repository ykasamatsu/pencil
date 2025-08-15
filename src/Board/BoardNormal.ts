import { Point } from "../Lib/Point";
import { Util } from "../Lib/Util";
import { Board } from "./Board";
import { CellMap } from "./Cell/CellMap";
import { CellObject } from "./Cell/CellObject";
import { CellState } from "./Cell/CellState";
import { EdgeMap } from "./Edge/EdgeMap";
import { EdgeObject } from "./Edge/EdgeObject";

export class BoardNormal extends Board {

	initCellMap() {
		let data: number[] = Util.toNumber64(this.elem.getAttribute("data"))
		this.w = +this.elem.getAttribute("w")
		this.h = +this.elem.getAttribute("h")

		this.elem.setAttribute("viewBox", `0 0 ${this.w} ${this.h}`);

		this.cellMap = new CellMap(this.w, this.h)

		//init
		for (let x = 0; x < this.w; x++) {
			for (let y = 0; y < this.h; y++) {
				let cell = this.cellMap.get(x, y)
				let cellObject = new CellObject(cell)
				this.cellMapObject.addChild(cellObject)
			}
		}

		//set
		let cellIndex = 0
		let state = 0
		let repeat = 0
		for (let i = 0; i < data.length; i++) {
			let value = data[i]
			let cell = this.cellMap[cellIndex]

			if (repeat == 0) {
				if (value >= 62) {
					state = CellState.Empty
				} else if (value >= 54) {
					repeat = value - 53
				} else {
					state = value
				}
			} else {
				repeat--
				i--
			}

			if (state != CellState.Empty) {
				cell.object.updateState(state)
				cell.object.lock(true)
			}

			cellIndex++
		}
	}

	initEdgeMap() {
		this.edgeMap = new EdgeMap(this.w, this.h)
		for (let x = 0; x < this.w * 2 + 1; x++) {
			for (let y = 0; y < this.h * 2 + 1; y++) {
				let edge = this.edgeMap.get(x, y)
				if ((x % 2 + y % 2) % 2 == 1) {
					let edgeObject = new EdgeObject(edge)
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


}
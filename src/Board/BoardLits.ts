import { Point } from "../Lib/Point";
import { Util } from "../Lib/Util";
import { Board } from "./Board";
import { CellMap } from "./Cell/CellMap";
import { CellObject } from "./Cell/CellObject";
import { EdgeMap } from "./Edge/EdgeMap";
import { EdgeObject } from "./Edge/EdgeObject";

export class BoardLits extends Board {

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

	initCellMap() {
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
	}

	initEdgeMap() {
		let data: number[] = Util.toNumber64(this.elem.getAttribute("data"))

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

		let edgeIndex = 0
		for (let x = 1; x < this.w * 2; x++) {
			for (let y = 1; y < this.h * 2; y++) {
				if (x % 2 + y % 2 == 1) {
					let edge = this.edgeMap.get(x, y)
					if (data[Math.floor(edgeIndex / 6)] & Math.pow(2, edgeIndex % 6)) edge.setBorder(true)
					edgeIndex++
				}
			}
		}

		this.cellMap.createRegion()

		for (let cell of this.cellMap) {
			cell.object.drawPath()
		}
	}

}
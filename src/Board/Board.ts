import { SvgObject } from "../Lib/GameObject/SvgObject"
import { Point } from "../Lib/Point"
import { Util } from "../Lib/Util"
import { BoardBinairo } from "./BoardBinairo"
import { BoardLits } from "./BoardLits"
import { BoardNormal } from "./BoardNormal"
import { CellMap } from "./Cell/CellMap"
import { CellObject } from "./Cell/CellObject"
import { CellState } from "./Cell/CellState"
import { EdgeMap } from "./Edge/EdgeMap"
import { EdgeObject } from "./Edge/EdgeObject"

export class Board extends SvgObject {

	static main: Board

	w: number
	h: number

	cellMap: CellMap
	edgeMap: EdgeMap

	cellMapObject: SvgObject
	edgeMapObject: SvgObject
	symbolMapObject: SvgObject

	constructor(boardElem) {
		super()
		this.elem = boardElem

		this.cellMapObject = new SvgObject()
		this.cellMapObject.createElement("g")
		this.cellMapObject.addClass("cellMap")
		this.addChild(this.cellMapObject)

		this.edgeMapObject = new SvgObject()
		this.edgeMapObject.createElement("g")
		this.edgeMapObject.addClass("edgeMap")
		this.addChild(this.edgeMapObject)

		this.symbolMapObject = new SvgObject()
		this.symbolMapObject.createElement("g")
		this.symbolMapObject.addClass("symbolMap")
		this.addChild(this.symbolMapObject)
	}

	init() {
		this.initCellMap()
		this.initEdgeMap()
		this.initInput()
	}

	initInput() {
		this.elem.addEventListener("touchmove", (e) => {
			if (e.touches.length >= 1) {
				e.preventDefault();
			}
		})
		this.elem.addEventListener("touchend", preventDefault)
		this.elem.addEventListener("touchcancel", preventDefault)
		this.elem.addEventListener("contextmenu", preventDefault)

		function preventDefault(e) {
			e.preventDefault();
		}

	}

	initCellMap() {
	}

	initEdgeMap() {
	}

	onCellChange() {
	}

	getHint() {
	}

}
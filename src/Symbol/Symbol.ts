import { CellMap } from "../Board/Cell/CellMap"
import { Edge } from "../Board/Edge/Edge"
import { SvgObject } from "../Lib/GameObject/SvgObject"

export class Symbol extends SvgObject {

	static id: number = -1
	id: number = -1
	deactive: boolean
	edge: Edge

	fixedOrder: number

	constructor(id: number) {
		super()
		this.id = id
		this.deactive = false
	}

	setToEdge(edge: Edge) {
		this.edge = edge
		this.elem.style.transform = "translate(" + edge.x * 0.5 + "px," + edge.y * 0.5 + "px)"
	}

	check(targetCellMap: CellMap): boolean {
		return false
	}

}
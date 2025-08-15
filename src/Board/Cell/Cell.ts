import { Edge } from "../Edge/Edge"
import { CellObject } from "./CellObject"
import { CellState } from "./CellState"
import { Region } from "./Region"

export class Cell {

	x: number
	y: number

	state: number = CellState.Empty
	answer: number = CellState.Empty
	fixedOrder: number = 0

	object: CellObject

	edges: Edge[]

	region: Region

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
		this.edges = new Array(8)
	}

}




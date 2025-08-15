import { Cells } from "../Cell/Cells";
import { EdgeObject } from "./EdgeObject";

export class Edge {

	cells: Cells

	x: number
	y: number

	object: EdgeObject

	isBorder: boolean = false
	isUnion: boolean = false

	constructor(x: number, y: number) {
		this.cells = new Cells()
		this.x = x
		this.y = y
	}


	setBorder(flag: boolean) {
		this.isBorder = flag
		this.object.toggleAttribute("border", flag)
	}

	setUnion(flag: boolean) {
		this.isUnion = flag
		this.object.toggleAttribute("union", flag)
	}

}
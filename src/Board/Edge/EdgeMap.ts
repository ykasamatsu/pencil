import { Point } from "../../Lib/Point"
import { Edge } from "./Edge"

export class EdgeMap extends Array<Edge> {

	w: number
	h: number

	constructor(w: number, h: number) {
		super((w * 2 + 1) * (h * 2 + 1))
		this.w = w * 2 + 1
		this.h = h * 2 + 1

		for (let x = 0; x < this.w; x++) {
			for (let y = 0; y < this.h; y++) {
				let edge = new Edge(x, y)
				this[x + y * this.w] = edge
			}
		}
	}

	get(x: number, y: number): Edge {
		if (!this.isIn(x, y)) return null
		return this[x + y * this.w]
	}

	getByCell(x: number, y: number, direction: number = 8): Edge {

		let around = Point.around[direction]
		x = x * 2 + 1 + around.x
		y = y * 2 + 1 + around.y
		if (!this.isIn(x, y)) return null
		return this[x + y * this.w]
	}

	isIn(x: number, y: number) {
		if (x < 0 || y < 0 || x >= this.w || y >= this.h) return false
		return true
	}

}
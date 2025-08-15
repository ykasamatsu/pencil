import { SvgPath } from "../../Lib/GameObject/Svg/SvgPath"
import { Edge } from "./Edge"

export class EdgeObject extends SvgPath {
	edge: Edge

	constructor(edge: Edge) {
		super()
		this.addClass("edge")
		this.edge = edge
		edge.object = this
	}

	drawEdge() {
		let x = this.edge.x
		let y = this.edge.y
		if (x % 2 == 0) this.d = `M${x / 2},${y / 2 - 0.5} L${x / 2},${y / 2 + 0.5}`
		else this.d += `M${x / 2 - 0.5},${y / 2} L${x / 2 + 0.5},${y / 2}`
		this.draw()
	}
}

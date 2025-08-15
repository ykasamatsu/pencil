import { SvgObject } from "../SvgObject"

export class SvgCircle extends SvgObject {

	constructor(cx: number, cy: number, r: number) {
		super()
		this.createElement("circle")

		this.setAttribute("cx", "" + cx)
		this.setAttribute("cy", "" + cy)
		this.setAttribute("r", "" + r)
	}

}
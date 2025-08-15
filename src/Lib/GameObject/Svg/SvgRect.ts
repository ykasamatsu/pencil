import { SvgObject } from "../SvgObject"

export class SvgRect extends SvgObject {

	constructor(x: number, y: number, width: number, height: number) {
		super()
		this.createElement("rect")

		this.setAttribute("x", "" + x)
		this.setAttribute("y", "" + y)
		this.setAttribute("width", "" + width)
		this.setAttribute("height", "" + height)
	}

}
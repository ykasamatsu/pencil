import { SvgCircle } from "../../Lib/GameObject/Svg/SvgCircle"
import { SvgPath } from "../../Lib/GameObject/Svg/SvgPath"
import { SvgRect } from "../../Lib/GameObject/Svg/SvgRect"
import { SvgText } from "../../Lib/GameObject/Svg/SvgText"
import { SvgObject } from "../../Lib/GameObject/SvgObject"
import { InputMng } from "../../Lib/InputMng"
import { Path } from "../../Lib/Path"
import { Point } from "../../Lib/Point"
import { Operation } from "../../Operation/Operation"
import { OperationMng } from "../../Operation/OperationMng"
import { Board } from "../Board"
import { Cell } from "./Cell"

export class CellObject extends SvgObject {

	cell: Cell
	isLocked: boolean

	body: SvgPath
	overlay: SvgPath
	lockObject: SvgObject

	path: Path

	constructor(cell: Cell) {
		super()
		this.cell = cell
		cell.object = this
		this.createElement("g")
		this.addClass("cell")

		let cellPoint = Point.get(cell.x, cell.y)
		this.path = new Path()
		this.path.createLine(cellPoint, cellPoint.move(1, 0), cellPoint.move(1, 1), cellPoint.move(0, 1))

		this.body = new SvgPath()
		this.body.addClass("body")
		this.addChild(this.body)

		this.overlay = new SvgPath()
		this.overlay.addClass("overlay")
		this.addChild(this.overlay)
	}

	onDown(e: PointerEvent) {
		if (this.isLocked) return
		this.elem.setPointerCapture(e.pointerId)
		this.elem.releasePointerCapture(e.pointerId)

		let newState = this.cell.state + (e.button == 0 ? 1 : -1)
		if (newState == 2) newState = -1
		else if (newState == -2) newState = 1

		InputMng.pointerCellState = newState
		OperationMng.I.do(new Operation(this, newState))
		Board.main.onCellChange()
	}

	onUp(e: PointerEvent) {
	}

	onOver(e: PointerEvent) {
		this.addClass("hover")
		if (this.isLocked) return
		for (let cell of this.cell.region) {
			// cell.object.addClass("region")
			for (let edge of cell.edges) {
				// if (edge.object) edge.object.addClass("hover")
			}
		}
		if (!InputMng.isPointerDown) return
		OperationMng.I.do(new Operation(this, InputMng.pointerCellState))
		Board.main.onCellChange()
	}

	onOut(e: PointerEvent) {
		this.removeClass("hover")
		for (let cell of this.cell.region) {
			// cell.object.removeClass("region")
			for (let edge of cell.edges) {
				// if (edge.object) edge.object.removeClass("hover")
			}
		}
	}

	union(cellObject: CellObject) {
		if (cellObject.cell.object == this) return
		cellObject.cell.object = this
		for (let line of cellObject.path.lines) {
			this.path.addLine(line)
		}
		cellObject.destroy()
	}


	drawPath() {
		this.body.d = this.overlay.d = this.path.getPath()
		this.body.draw()
		this.overlay.draw()
	}

	lock(flag: boolean) {
		this.isLocked = flag
		if (this.isLocked) {
			this.setAttribute("lock")
			// this.addChild(new SvgRect(this.cell.x + 0.3, this.cell.y + 0.3, 0.4, 0.4))
			// this.addChild(new SvgCircle(this.cell.x + 0.2, this.cell.y + 0.2, 0.05))
			// this.addChild(new SvgCircle(this.cell.x + 0.8, this.cell.y + 0.2, 0.05))
			// this.addChild(new SvgCircle(this.cell.x + 0.8, this.cell.y + 0.8, 0.05))
			// this.addChild(new SvgCircle(this.cell.x + 0.2, this.cell.y + 0.8, 0.05))
		}
	}

	setHint() {
		this.setAttribute("hint", "");
	}

	updateState(state: number) {
		this.cell.state = state
		this.setAttribute("state", "" + this.cell.state)
	}

}

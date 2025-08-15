import { Board } from "../Board/Board";
import { CellMap } from "../Board/Cell/CellMap";
import { CellState } from "../Board/Cell/CellState";
import { Symbol } from "./Symbol";

export class CountSymbol extends Symbol {

	static id = 0

	count: number
	state: number

	constructor(state: number, count: number) {
		super(0);

		this.state = state
		this.count = count

		this.createElement("g")
		this.addClass("symbol")
		this.setAttribute("state", "" + state)
		Board.main.addChild(this)
		this.elem.innerHTML = '<circle cx="0" cy="0" r="0.25"/><text>' + this.count + '</text>'
		this.elem.innerHTML = '<circle cx="0" cy="0" r="0.25"/><text>x</text>'
	}

	check(targetCellMap: CellMap): boolean {
		let sum = 0
		let empty = 0

		for (let cell of this.edge.cells) {
			if (cell.state == this.state) sum++
			if (cell.state == CellState.Empty) empty++
		}
		if (sum > this.count || sum + empty < this.count) {
			return false
		}
		return true
	}

}

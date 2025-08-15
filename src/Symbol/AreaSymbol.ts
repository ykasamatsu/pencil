import { Board } from "../Board/Board";
import { CellMap } from "../Board/Cell/CellMap";
import { CellState } from "../Board/Cell/CellState";
import { Symbol } from "./Symbol";

export class AreaSymbol extends Symbol {

	static id = 0

	area: number

	constructor(area: number) {
		super(0);

		this.area = area

		this.createElement("g")
		this.addClass("symbol")
		this.addClass("area")
		Board.main.addChild(this)
		if (this.area >= 10) this.elem.innerHTML = '<rect x="-0.35" y="-0.35" width="0.7" height="0.7"/><text textLength="0.65" lengthAdjust="spacingAndGlyphs">' + this.area + '</text>'
		else this.elem.innerHTML = '<rect x="-0.35" y="-0.35" width="0.7" height="0.7"/><text>' + this.area + '</text>'
	}

	check(targetCellMap: CellMap): boolean {

		return true
	}
}

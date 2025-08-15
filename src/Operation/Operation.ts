import { CellObject } from "../Board/Cell/CellObject"

export class Operation {

	cellObject: CellObject
	from: number
	to: number

	constructor(cellObject: CellObject, to: number) {
		this.cellObject = cellObject
		this.from = this.cellObject.cell.state
		this.to = to
	}
}
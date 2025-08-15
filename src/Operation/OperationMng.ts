import { Operation } from "./Operation"

export class OperationMng {

	static I: OperationMng

	operations: Operation[]
	turn: number = 0

	constructor() {
		OperationMng.I = this
		this.operations = []
	}

	do(operation: Operation) {
		if (this.operations.length > this.turn) {
			this.operations.splice(this.turn, this.operations.length - this.turn)
		}

		if (this.turn != 0 && this.operations[this.turn - 1].cellObject == operation.cellObject) {
			if (this.operations[this.turn - 1].from == operation.to) {
				this.operations.pop()
				this.turn--
			} else this.operations[this.turn - 1].to = operation.to
		} else {
			this.operations.push(operation)
			this.turn++
		}


		operation.cellObject.updateState(operation.to)
	}

	redo() {
		if (this.turn == this.operations.length) return
		let operation = this.operations[this.turn]
		operation.cellObject.updateState(operation.to)
		this.turn++
	}

	undo() {
		if (this.turn == 0) return false
		let operation = this.operations[this.turn - 1]
		operation.cellObject.updateState(operation.from)
		this.turn--
		return true
	}

	reset() {
		while (this.undo()) { }
	}

}
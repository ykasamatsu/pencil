import { Util } from "../../Lib/Util"
import { Cell } from "./Cell"
import { Cells } from "./Cells"

export class CellSet extends Set<Cell> {

	isSubset(cellSet: CellSet, ifSame: boolean = false) {
		for (let cell of this) {
			if (!cellSet.has(cell)) return false
		}
		if (!ifSame && this.size == cellSet.size) return false
		return true
	}

	exceptWith(cellSet: CellSet) {
		for (let cell of cellSet) {
			this.delete(cell)
		}
	}

	getExcept(cellSet: CellSet) {
		let diff = new CellSet()
		for (let cell of this) {
			if (!cellSet.has(cell)) diff.add(cell)
		}
		return diff
	}

	unionWith(cellSet: CellSet) {
		for (let cell of cellSet) {
			this.add(cell)
		}
	}

	getRandom(num: number = this.size) {
		let shuffled = <Cells>[...this]
		Util.shuffle(shuffled)
		shuffled.length = num
		return shuffled
	}

}
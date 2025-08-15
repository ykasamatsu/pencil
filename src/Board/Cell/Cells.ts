import { Util } from "../../Lib/Util"
import { Cell } from "./Cell"

export class Cells extends Array<Cell> {

	getHash(targetState: number, targetCnt: number) {
		let hash = 0
		let cnt = 0
		for (let i = 0; i < this.length; i++) {
			if (this[i].state == targetState) {
				cnt++
				hash += Math.pow(2, i)
			}
		}
		if (cnt == targetCnt) return hash
		return -1
	}

	getRandom(num: number = this.length) {
		let shuffled = [...this]
		Util.shuffle(shuffled)
		shuffled.length = num
		return shuffled
	}
}

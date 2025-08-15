import { Util } from "../../Lib/Util"
import { Cell } from "./Cell"
import { Cells } from "./Cells"
import { CellState } from "./CellState"
import { Region } from "./Region"

export class CellMap extends Cells {
	w: number
	h: number

	columns: CellMap[]
	rows: CellMap[]

	regions: Region[]

	constructor(w: number, h: number) {
		super(w * h)
		this.w = w
		this.h = h

		if (this.w > 1 && this.h > 1) {
			this.columns = []
			for (let x = 0; x < w; x++) this.columns[x] = new CellMap(1, h)

			this.rows = []
			for (let y = 0; y < h; y++) this.rows[y] = new CellMap(w, 1)
		}

		//init
		for (let x = 0; x < this.w; x++) {
			for (let y = 0; y < this.h; y++) {
				let cell = new Cell(x, y)
				this[x + y * this.w] = cell
				if (this.w > 1 && this.h > 1) {
					this.columns[x][y] = cell
					this.rows[y][x] = cell
				}
			}
		}

	}

	get(x: number, y: number) {
		if (!this.isIn(x, y)) return null
		return this[x + y * this.w]
	}

	isIn(x: number, y: number) {
		if (x < 0 || y < 0 || x >= this.w || y >= this.h) return false
		return true
	}

	*getLines() {
		if (this.w > 1 && this.h > 1) {
			for (let column of this.columns) {
				yield column
			}
			for (let row of this.rows) {
				yield row
			}
		} else {
			yield <CellMap>this
		}

	}

	*getDiagonalLines() {
		if (this.w > 1 && this.h > 1) {
			let diagonalLine: Cells = new Cells()
			for (let x = 1; x < this.w; x++) {
				diagonalLine.length = 0
				for (let y = 0; y < x + 1; y++) {
					diagonalLine.push(this.get(x - y, y))
				}
				yield diagonalLine

				diagonalLine.length = 0
				for (let y = 0; y < x + 1; y++) {
					diagonalLine.push(this.get(x - y, this.h - y - 1))
				}
				yield diagonalLine

			}

			for (let x = 1; x < this.w - 1; x++) {
				diagonalLine.length = 0
				for (let y = 0; y < this.h - x; y++) {
					diagonalLine.push(this.get(x + y, y))
				}
				yield diagonalLine

				diagonalLine.length = 0
				for (let y = 0; y < this.h - x; y++) {
					diagonalLine.push(this.get(x + y, this.h - y - 1))
				}
				yield diagonalLine
			}

		}

	}

	createRegion() {
		this.regions = []
		for (let cell of this) {
			if (!cell.region) {
				let region = new Region()
				this.regions.push(region)
				Region.dfs(this, cell, region)
			}
		}
	}

	isCompleted() {
		for (let cell of this) {
			if (cell.state == CellState.Empty) return false
		}
		return true
	}


	logAnswer() {
		let s = ""
		for (let y = 0; y < this.h; y++) {
			for (let x = 0; x < this.w; x++) {
				let answer = this.get(x, y).answer
				switch (answer) {
					case CellState.Unknown: s += "？"; break;
					case CellState.Empty: s += "ｘ"; break;
					case CellState.Colored: s += "■"; break;
					case CellState.White: s += "□"; break;
				}
			}
			s += "\n"
		}
		console.log(s);
	}

	log() {
		let s = ""
		for (let y = 0; y < this.h; y++) {
			for (let x = 0; x < this.w; x++) {
				switch (this.get(x, y).state) {
					case CellState.Empty: s += "・"; break;
					case CellState.Colored: s += "■"; break;
					case CellState.White: s += "□"; break;
				}
			}
			s += "\n"
		}
		console.log(s);
	}

	logData() {
		let s = Util.toString64(this.w) + Util.toString64(this.h)

		let repeat = 0
		let state = 0
		for (let y = 0; y < this.h; y++) {
			for (let x = 0; x < this.w; x++) {
				if (state == this.get(x, y).state) {
					repeat++
					if (repeat == 9) {
						s += Util.toString64(repeat + 52)
						repeat = 0
					}
				} else {
					if (repeat != 0) {
						if (repeat == 1) {
							if (state == -1) s += "-"
							else s += state
						} else s += Util.toString64(repeat + 52)
					}
					state = this.get(x, y).state
					repeat = 0
					if (state == -1) s += "-"
					else s += state
				}

			}
		}
		console.log("data:" + s)
		return s
	}

}

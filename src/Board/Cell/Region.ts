import { Point } from "../../Lib/Point"
import { Cell } from "./Cell"
import { CellMap } from "./CellMap"
import { CellSet } from "./CellSet"

export class Region extends CellSet {

	static dfs(cellMap: CellMap, cell: Cell, region: Region) {

		region.addCell(cell)
		for (let i = 0; i < 8; i += 2) {
			if (!cell.edges[i].isBorder) {
				let next = cellMap.get(cell.x + Point.around[i].x, cell.y + Point.around[i].y)
				if (next && !next.region) this.dfs(cellMap, next, region)
			}
		}
	}

	addCell(cell: Cell) {
		cell.region = this
		this.add(cell)
	}

}

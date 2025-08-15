import { CellMap } from "../Board/Cell/CellMap"
import { Edge } from "../Board/Edge/Edge"
import { AreaSymbol } from "./AreaSymbol"
import { CountSymbol } from "./CountSymbol"
import { Symbol } from "./Symbol"

export class SymbolMng {

	static I: SymbolMng

	symbolSets: Set<Symbol>[]

	constructor() {
		SymbolMng.I = this
		this.symbolSets = []
		this.symbolSets.push(new Set<CountSymbol>())
	}

	addCountSymbol(edge: Edge, count: number) {
		let symbol = new CountSymbol(0, count)
		this.add(edge, symbol)
	}

	addAreaSymbol(edge: Edge, area: number) {
		let symbol = new AreaSymbol(area)
		this.add(edge, symbol)
	}


	add(edge: Edge, symbol: Symbol) {
		symbol.setToEdge(edge)
		this.symbolSets[symbol.id].add(symbol)
	}

	delete(symbol) {
		this.symbolSets[symbol.id].delete(symbol)
		symbol.destroy()
	}

	check(targetCellMap: CellMap) {
		for (let symbolSet of this.symbolSets) {
			for (let symbol of symbolSet) {
				if (!symbol.deactive && !symbol.check(targetCellMap)) {
					return false
				}
			}
		}

		return true
	}

}

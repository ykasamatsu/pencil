import { Board } from "./Board/Board";
import { BoardBinairo } from "./Board/BoardBinairo";
import { BoardLits } from "./Board/BoardLits";
import { BoardNormal } from "./Board/BoardNormal";
import { InputMng } from "./Lib/InputMng";
import { Point } from "./Lib/Point";
import { OperationMng } from "./Operation/OperationMng";
import { SymbolMng } from "./Symbol/SymbolMng";
import { Popup } from "./UI/Popup";
import { UI } from "./UI/UI";

document.addEventListener('DOMContentLoaded', e => {
	Point.init(30, 30)
	new UI()
	new InputMng()
	new OperationMng()
	new SymbolMng()
	new Popup()

	const sizeSelector = document.getElementById('size-selector') as HTMLSelectElement;
	if (sizeSelector) {
		sizeSelector.addEventListener('change', (event) => {
			const newSize = parseInt((event.target as HTMLSelectElement).value, 10);
			if (Board.main && !isNaN(newSize)) {
				Board.main.init(newSize);
			}
		});
	}

	// SymbolMng.I.addAreaSymbol(Board.main.edgeMap.getByCell(7, 0), 2)
});

window.addEventListener('load', () => {
	let boardElems = document.querySelectorAll(".board")

	for (let boardElem of boardElems) {

		let board: Board
		let type = boardElem.getAttribute("type")
		switch (type) {
			case "binairo":
				board = new BoardBinairo(boardElem)
				break
			case "normal":
				board = new BoardNormal(boardElem)
				break
			case "lits":
				board = new BoardLits(boardElem)
				break
		}
		board.init()

	}
})
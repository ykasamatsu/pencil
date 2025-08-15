export class InputMng {

	static isPointerDown: boolean = false
	static touchCellState: number

	static setBorderState: boolean
	static pointerCellState: number

	constructor() {
		document.addEventListener("pointerdown", (e) => {
			InputMng.isPointerDown = true
		})
		document.addEventListener("pointerup", (e) => {
			InputMng.isPointerDown = false
		})
	}

}
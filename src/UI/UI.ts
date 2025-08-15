import { HintBtn } from "./Btn/HintBtn"
import { RedoBtn } from "./Btn/RedoBtn"
import { ResetBtn } from "./Btn/ResetBtn"
import { UndoBtn } from "./Btn/UndoBtn"

export class UI {

	static I: UI

	undoBtn: UndoBtn
	redoBtn: RedoBtn
	resetBtn: ResetBtn
	hintBtn: HintBtn


	constructor() {
		UI.I = this

		this.undoBtn = new UndoBtn("undo")
		this.redoBtn = new RedoBtn("redo")
		this.resetBtn = new ResetBtn("reset")
		this.hintBtn = new HintBtn("hint")
		console.log(document.querySelector('#rule_btn'))

		document.querySelector('#rule_btn').addEventListener('click', e => {
			document.querySelector('#rule_btn').toggleAttribute("open")
			document.querySelector("#rules").toggleAttribute("open")

			document.querySelector('#menu_btn').removeAttribute("open")
			document.querySelector("#menus").removeAttribute("open")
		})

		document.querySelector('#menu_btn').addEventListener('click', e => {
			document.querySelector('#menu_btn').toggleAttribute("open")
			document.querySelector("#menus").toggleAttribute("open")

			document.querySelector('#rule_btn').removeAttribute("open")
			document.querySelector("#rules").removeAttribute("open")
		})




	}
}
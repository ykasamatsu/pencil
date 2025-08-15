import { HtmlObject } from "../../Lib/GameObject/HtmlObject"

export class Btn extends HtmlObject {

	isActive: boolean = true

	constructor(id: string) {
		super()
		this.elem = document.querySelector("#" + id)

		this.elem.addEventListener("click", () => {
			if (!this.isActive) return
			this.onClick()
		})
	}

	onClick() {

	}

	setActive(bool) {
		this.isActive = bool
		if (!bool) this.setAttribute("deactive")
		else this.removeAttribute("deactive")
	}

}
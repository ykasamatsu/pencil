import { Board } from "../../Board/Board";
import { BoardNormal } from "../../Board/BoardNormal";
import { Popup } from "../Popup";
import { Btn } from "./Btn";

export class HintBtn extends Btn {

	onClick() {
		const board = Board.main as BoardNormal;
		if (!board.getHint) return;

		const hint = board.getHint();

		if (hint) {
			hint.cell.object.setHint();
			const reasonText = `このセルは「${hint.reason}」のルールにより ${hint.state === 0 ? "色付き(0)" : "白(1)"} になります。`;
			Popup.I.show(reasonText);
		} else {
			Popup.I.show("確定できるセルは見つかりませんでした。");
		}
	}

}
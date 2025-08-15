import { Board } from "../../Board/Board";
import { OperationMng } from "../../Operation/OperationMng";
import { Btn } from "./Btn";

export class UndoBtn extends Btn {

	onClick() {
		OperationMng.I.undo()
		Board.main.onCellChange()
	}

}
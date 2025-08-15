import { Board } from "../../Board/Board";
import { OperationMng } from "../../Operation/OperationMng";
import { Btn } from "./Btn";

export class RedoBtn extends Btn {

	onClick() {
		OperationMng.I.redo()
		Board.main.onCellChange()
	}

}
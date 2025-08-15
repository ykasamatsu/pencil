import { Board } from "../../Board/Board";
import { OperationMng } from "../../Operation/OperationMng";
import { Btn } from "./Btn";

export class ResetBtn extends Btn {

	onClick() {
		OperationMng.I.reset()
		Board.main.onCellChange()
	}

}
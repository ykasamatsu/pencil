import { Board } from "../../Board/Board";
import { Btn } from "./Btn";

export class HintBtn extends Btn {

	onClick() {
		Board.main.getHint()
		// Board.main.getHint()
	}

}
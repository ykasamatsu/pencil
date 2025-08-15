export class CellState {
	static Unknown = -2
	static Empty = -1
	static Colored = 0
	static White = 1
	static ColoredAndWhite = [CellState.Colored, CellState.White]

	static getOpposite(state: number) {
		if (state == CellState.Colored) return CellState.White
		else if (state == CellState.White) return CellState.Colored
		return CellState.Empty
	}
}
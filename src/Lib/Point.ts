export class Point {

	static Zero: Point = new Point(0, 0)
	static Right: Point = new Point(1, 0)
	static UpRight: Point = new Point(1, -1)
	static Up: Point = new Point(0, -1)
	static UpLeft: Point = new Point(-1, -1)
	static Left: Point = new Point(-1, 0)
	static DownLeft: Point = new Point(-1, 1)
	static Down: Point = new Point(0, 1)
	static DownRight: Point = new Point(1, 1)

	static around = [Point.Right, Point.UpRight, Point.Up, Point.UpLeft, Point.Left, Point.DownLeft, Point.Down, Point.DownRight, Point.Zero]
	static indexMap: Map<Point, number>

	static map: Point[]
	static w: number
	static h: number

	static init(w: number, h: number) {
		Point.map = []
		Point.w = w
		Point.h = h
		for (let x = 0; x < w; x++) {
			for (let y = 0; y < h; y++) {
				Point.map[x + y * w] = new Point(x, y)
			}
		}

		Point.indexMap = new Map<Point, number>()
		for (let i = 0; i < 9; i++) {
			Point.indexMap.set(Point.around[i], i);
		}
	}
	static get(x: number, y: number) {
		return Point.map[x + y * Point.w]
	}


	x: number
	y: number
	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	move(x: number, y: number) {
		return Point.get(this.x + x, this.y + y)
	}

}
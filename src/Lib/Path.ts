import { Point } from "./Point"

export class Path extends Set<Line> {

	firstLine: Line
	lines: Line[]

	constructor() {
		super()
	}

	createLine(...points: Point[]) {
		this.lines = []
		for (let i = 0; i < points.length; i++) {
			this.lines.push(new Line(points[i], i == points.length - 1 ? points[0] : points[i + 1]))
		}
		for (let i = 0; i < this.lines.length; i++) {
			let line = this.lines[i]
			line.prev = this.lines[i - 1]
			line.next = i == this.lines.length - 1 ? this.lines[0] : this.lines[i + 1]
		}
		this.lines[0].prev = this.lines[this.lines.length - 1]

		for (let i = 0; i < this.lines.length; i++) {
			this.addLine(this.lines[i])
		}
	}

	addLine(line: Line) {

		if (!this.firstLine) this.firstLine = line

		let revLine
		for (let checkLine of this) {
			if (checkLine.to == line.from && checkLine.from == line.to) {
				revLine = checkLine
			}
		}


		if (revLine) {
			revLine.prev.next = line.next
			revLine.next.prev = line.prev
			line.prev.next = revLine.next
			line.next.prev = revLine.prev

			this.delete(revLine)

		} else this.add(line)
	}

	getPath() {

		let next = this.firstLine
		let path = `M ${next.from.x} ${next.from.y} `
		do {
			path += `L ${next.to.x} ${next.to.y} `
			next = next.next
		} while (next && next != this.firstLine)

		path += " Z"

		return path
	}
}

export class Line {
	from: Point
	to: Point

	prev: Line
	next: Line

	constructor(from: Point, to: Point) {
		this.from = from
		this.to = to
	}
}
var getCurrentObject =  () => objects.find(object => object.state === 'falling');
var createPlayground = () => (new Array(10).fill().map( el => (new Array(5).fill())));

function checkFullRows(objects) {
	let cells = []
	for (let object of objects) {
		cells.push(object.position)
	}
	cells = cells.flat()

	cells.sort(function(a, b){return a[0] - b[0]});

	let rows = {}
	for (let cell of cells) {
		if (cell[0] in rows) {
			rows[cell[0]] += 1
		} else {
			rows[cell[0]] = 1
		}
	}

	let fullRows = []
	for (let row in rows) {
		if (rows[row] == 5) {
			fullRows.push(row)
		}
	}

	let newObjects = []

	for (let object of objects) {
			newObjects.push({'type': object.type, 
			                 'state': object.state,
			                 'position': object.position.filter(cell => !fullRows.includes(cell[0].toString()))})
	}

	return newObjects
}
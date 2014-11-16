var DIE = false, ALIVE = true;
function Board(cellGrid) {
	this.cellGrid = cellGrid;
}

function copyGrid(cellGrid) {
	var rowLength = cellGrid.length;
	var columnLength = cellGrid[0].length;
	var row, column;
	var temp = [];
	for (row = 0; row < rowLength; row++) {
		temp[row] = []
		for (column = 0; column < columnLength; column++) {
			temp[row][column] = cellGrid[row][column]
		}
	}
	return temp;
}


Board.prototype.toNextGeneration = function() {
	var rowLength = this.cellGrid.length;
	var columnLength = this.cellGrid[0].length;
	var row, column;
	var tempGrid;

	tempGrid = copyGrid(this.cellGrid);

	for (row = 0; row < rowLength; row++) {
		for (column = 0; column < columnLength; column++) {
			if (this.isAliveCell(row,column)) {
				if (this.countAliveNeighboursOfCell(row,column) !== 2 && this.countAliveNeighboursOfCell(row,column) !== 3)
					tempGrid[row][column] = DIE;
			} else if (this.countAliveNeighboursOfCell(row, column) === 3)
				tempGrid[row][column] = ALIVE;
		}
	}
	this.cellGrid = tempGrid;
};

Board.prototype.getCellGrid = function() {
	return this.cellGrid;
};

Board.prototype.countAliveNeighboursOfCell = function(row, column) {
	var count = 0;
	count += this.countAliveRightNeighbours(row, column);
	count += this.countAliveRightBottomNeighbours(row, column);
	count += this.countAliveBottomNeighbours(row, column);
	count += this.countAliveLeftNeighbours(row, column);
	count += this.countAliveLeftBottomNeighbours(row, column);
	count += this.countAliveTopNeighbours(row, column);
	count += this.countAliveLeftTopNeighbours(row, column);
	count += this.countAliveRightTopNeighbours(row, column);
	return count; 
};

Board.prototype.countAliveRightTopNeighbours = function(row, column) {
	if (this.isAliveCell(row - 1, column + 1))
		return 1;
	return 0;
};

Board.prototype.countAliveTopNeighbours = function(row, column) {
	if (this.isAliveCell(row - 1, column))
		return 1;
	return 0;
};

Board.prototype.countAliveLeftTopNeighbours = function(row, column) {
	if (this.isAliveCell(row - 1, column - 1))
		return 1;
	return 0;
};

Board.prototype.countAliveLeftNeighbours = function(row, column) {
	if (this.isAliveCell(row, column - 1))
		return 1;
	return 0;
};

Board.prototype.countAliveLeftBottomNeighbours = function(row, column) {
	if (this.isAliveCell(row + 1, column - 1))
		return 1;
	return 0;
};

Board.prototype.countAliveRightNeighbours = function(row, column) {
	if (this.isAliveCell(row, column + 1))
		return 1;
	return 0;
};

Board.prototype.countAliveRightBottomNeighbours = function(row, column) {
	if (this.isAliveCell(row + 1, column + 1))
		return 1;
	return 0;
};

Board.prototype.countAliveBottomNeighbours = function(row, column) {
	if (this.isAliveCell(row + 1, column))
		return 1;
	return 0;
};

Board.prototype.isAliveCell = function(row, column) {
	return (this.isCellInBoard(row, column) && (this.cellGrid[row][column] === ALIVE));
};

Board.prototype.isCellInBoard = function(row, column) {
	var rowLength = this.cellGrid.length;
	var columnLength = this.cellGrid[0].length;
	return (row >= 0 && row < rowLength) && (column >= 0 && column < columnLength)
};

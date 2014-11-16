describe("Board", function() {
	describe("new Board", function() {
		it("Should DIE All Cell in Board When Created", function() {
			var board, 
			    grid,
			    row, 
			    column,
			    rowLength,
			    columnLength,
			    hasAlive = false;
			board = new Board([
				[DIE, DIE, DIE],
				[DIE, DIE, DIE],
				[DIE, DIE, DIE],
			]);
			grid = board.getCellGrid();
			rowLength  = grid.length;
			for (row = 0; row < rowLength; row++) {
				columnLength = grid[row].length
				for (column = 0; column < columnLength; column++) {
					if (grid[row][column] === ALIVE) {
						hasAlive = true;
						break;
					}
				}
			}

			expect(hasAlive).toBe(false);
		});

		it("Should ALIVE Cell at (0,0) position in Board When Created", function() {
			var board, grid;
			board = new Board([
				[ALIVE, DIE, DIE],
				[DIE, DIE, DIE],
				[DIE, DIE, DIE],
			]);
			grid = board.getCellGrid();
			expect(grid[0][0]).toBe(ALIVE);
		});
	});

	describe("count ALIVE Neightbours of Cell at Corner of Board", function() {
		it("Sould Have 3 ALIVE Neighbours of Left Top Cell", function() {
			var board, aliveNeighbours;
			board = new Board([
				[ALIVE, ALIVE],
				[ALIVE, ALIVE],
			]);

			aliveNeighbours = board.countAliveNeighboursOfCell(0,0);
			expect(aliveNeighbours).toEqual(3);
		});

		it("Sould Have 1 ALIVE Neighbours of Left Top Cell", function() {
			var board, aliveNeighbours;
			board = new Board([
				[ALIVE, DIE],
				[DIE, ALIVE],
			]);

			aliveNeighbours = board.countAliveNeighboursOfCell(0,0);
			expect(aliveNeighbours).toEqual(1);
		});

		it("Sould Have 2 ALIVE Neighbours of Right Top Cell", function() {
			var board, aliveNeighbours;
			board = new Board([
				[ALIVE, DIE],
				[DIE, ALIVE],
			]);

			aliveNeighbours = board.countAliveNeighboursOfCell(0,1);
			expect(aliveNeighbours).toEqual(2);
		});

		it("Sould Have 1 ALIVE Neighbours of Right Bottom Cell", function() {
			var board, aliveNeighbours;
			board = new Board([
				[ALIVE, DIE],
				[DIE, ALIVE],
			]);

			aliveNeighbours = board.countAliveNeighboursOfCell(1,1);
			expect(aliveNeighbours).toEqual(1);
		});

		it("Sould Have 3 ALIVE Neighbours of Left Bottom Cell", function() {
			var board, aliveNeighbours;
			board = new Board([
				[ALIVE, ALIVE],
				[DIE, ALIVE],
			]);

			aliveNeighbours = board.countAliveNeighboursOfCell(1,0);
			expect(aliveNeighbours).toEqual(3);
		});
	});

	describe("Any live cell with less than two live neighbours dies, as if caused by under-population", function() {
		describe("Left Top Cell Next Generation with under-population", function() {
			it("Should DIE When Zero Alive Neightbours", function() {
				var board;
				board = new Board([
					[ALIVE, DIE],
					[DIE, DIE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[0][0]).toBe(DIE);
			});

			it("Should DIE When One Alive Neightbours", function() {
				var board;
				board = new Board([
					[ALIVE, DIE],
					[DIE, ALIVE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[0][0]).toBe(DIE);
			});
		});

		describe("Right Top Cell Next Generation with under-population", function() {
			it("Should DIE When Zero Alive Neightbours", function() {
				var board;
				board = new Board([
					[DIE, ALIVE],
					[DIE, DIE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[0][1]).toBe(DIE);
			});

			it("Should DIE When One Alive Neightbours", function() {
				var board;
				board = new Board([
					[DIE, ALIVE],
					[ALIVE, DIE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[0][1]).toBe(DIE);
			});
		});

		describe("Right Bottom Cell Next Generation with under-population", function() {
			it("Should DIE When Zero Alive Neightbours", function() {
				var board;
				board = new Board([
					[DIE, DIE],
					[DIE, ALIVE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[1][1]).toBe(DIE);
			});

			it("Should DIE When One Alive Neightbours", function() {
				var board;
				board = new Board([
					[ALIVE, DIE],
					[DIE, ALIVE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[1][1]).toBe(DIE);
			});
		});

		describe("Left Bottom Cell Next Generation with under-population", function() {
			it("Should DIE When Zero Alive Neightbours", function() {
				var board;
				board = new Board([
					[DIE, DIE],
					[ALIVE, DIE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[1][0]).toBe(DIE);
			});

			it("Should DIE When One Alive Neightbours", function() {
				var board;
				board = new Board([
					[DIE, ALIVE],
					[ALIVE, DIE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[1][0]).toBe(DIE);
			});
		});
	});

	describe("Any live cell with two or three live neighbours lives on to next generation", function() {
		describe("Left Top Cell Next Generation ALIVE", function() {
			it("Should ALIVE When Two Alive Neightbours", function() {
				var board;
				board = new Board([
					[ALIVE, ALIVE],
					[ALIVE, DIE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[0][0]).toBe(ALIVE);
			});

			it("Should ALIVE When Three Alive Neightbours", function() {
				var board;
				board = new Board([
					[ALIVE, ALIVE],
					[ALIVE, ALIVE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[0][0]).toBe(ALIVE);
			});
		});

		describe("Right Top Cell Next Generation ALIVE", function() {
			it("Should ALIVE When Two Alive Neightbours", function() {
				var board;
				board = new Board([
					[ALIVE, ALIVE],
					[DIE, ALIVE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[0][1]).toBe(ALIVE);
			});

			it("Should ALIVE When Three Alive Neightbours", function() {
				var board;
				board = new Board([
					[ALIVE, ALIVE],
					[ALIVE, ALIVE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[0][1]).toBe(ALIVE);
			});
		});
	});
	describe("Any live cell with more than three live neighbours dies, as if by overcrowding", function() {
		describe("Middle Cell Next Generation DIE", function() {
			it("Should DIE Four ALIVE Neightbours", function() {
				var board;
				board = new Board([
					[DIE, ALIVE, DIE],
					[ALIVE, ALIVE, ALIVE],
					[DIE, ALIVE, DIE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[1][1]).toBe(DIE);
			});

			it("Should DIE Five ALIVE Neightbours", function() {
				var board;
				board = new Board([
					[ALIVE, ALIVE, DIE],
					[ALIVE, ALIVE, ALIVE],
					[DIE, ALIVE, DIE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[1][1]).toBe(DIE);
			});
		});
	});
	describe("Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction", function() {
		describe("Middle DIE Cell Next Generation ALIVE", function() {
			it("Should ALIVE Three ALIVE Neightbours", function() {
				var board;
				board = new Board([
					[DIE, ALIVE, DIE],
					[ALIVE, DIE, ALIVE],
					[DIE, DIE, DIE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[1][1]).toBe(ALIVE);
			});
		});

		describe("Middle DIE Cell Next Generation DIE", function() {
			it("Should DIE Four ALIVE Neightbours", function() {
				var board;
				board = new Board([
					[DIE, ALIVE, DIE],
					[ALIVE, DIE, ALIVE],
					[DIE, ALIVE, DIE],
				]);
				board.toNextGeneration();
				grid = board.getCellGrid();
				expect(grid[1][1]).toBe(DIE);
			});
		});
	});

	describe("Still lifes pattern", function() {
		it("Should Still lifes pattern 1", function() {
			var board;
			board = new Board([
				[DIE, DIE, DIE, DIE],
				[DIE, ALIVE, ALIVE, DIE],
				[DIE, ALIVE, ALIVE, DIE],
				[DIE, DIE, DIE, DIE],
			]);
			board.toNextGeneration();
			grid = board.getCellGrid();
			expect(grid).toEqual([
				[DIE, DIE, DIE, DIE],
				[DIE, ALIVE, ALIVE, DIE],
				[DIE, ALIVE, ALIVE, DIE],
				[DIE, DIE, DIE, DIE],
			]);
		});

		it("Should Still lifes pattern 2", function() {
			var board;
			board = new Board([
				[DIE, DIE, DIE, DIE, DIE, DIE],
				[DIE, DIE, ALIVE, ALIVE, DIE, DIE],
				[DIE, ALIVE, DIE, DIE, ALIVE, DIE],
				[DIE, DIE, ALIVE, ALIVE, DIE, DIE],
				[DIE, DIE, DIE, DIE, DIE, DIE],
			]);
			board.toNextGeneration();
			grid = board.getCellGrid();
			expect(grid).toEqual([
				[DIE, DIE, DIE, DIE, DIE, DIE],
				[DIE, DIE, ALIVE, ALIVE, DIE, DIE],
				[DIE, ALIVE, DIE, DIE, ALIVE, DIE],
				[DIE, DIE, ALIVE, ALIVE, DIE, DIE],
				[DIE, DIE, DIE, DIE, DIE, DIE],
			]);
		});
	});

	describe("Oscillators pattern", function() {
		it("Should Oscillators pattern 1", function() {
			var board;
			board = new Board([
				[DIE, DIE, DIE, DIE, DIE],
				[DIE, DIE, ALIVE, DIE, DIE],
				[DIE, DIE, ALIVE, DIE, DIE],
				[DIE, DIE, ALIVE, DIE, DIE],
				[DIE, DIE, DIE, DIE, DIE],
			]);
			board.toNextGeneration();
			grid = board.getCellGrid();
			expect(grid).toEqual([
				[DIE, DIE, DIE, DIE, DIE],
				[DIE, DIE, DIE, DIE, DIE],
				[DIE, ALIVE, ALIVE, ALIVE, DIE],
				[DIE, DIE, DIE, DIE, DIE],
				[DIE, DIE, DIE, DIE, DIE],
			]);
			board.toNextGeneration();
			grid = board.getCellGrid();
			expect(grid).toEqual([
				[DIE, DIE, DIE, DIE, DIE],
				[DIE, DIE, ALIVE, DIE, DIE],
				[DIE, DIE, ALIVE, DIE, DIE],
				[DIE, DIE, ALIVE, DIE, DIE],
				[DIE, DIE, DIE, DIE, DIE],
			]);
		});

		it("Should Oscillators pattern 2", function() {
			var board;
			board = new Board([
				[DIE, DIE, DIE, DIE, DIE, DIE],
				[DIE, DIE, DIE, DIE, DIE, DIE],
				[DIE, DIE, ALIVE, ALIVE, ALIVE, DIE],
				[DIE, ALIVE, ALIVE, ALIVE, DIE, DIE],
				[DIE, DIE, DIE, DIE, DIE, DIE],
				[DIE, DIE, DIE, DIE, DIE, DIE],
			]);
			board.toNextGeneration();
			grid = board.getCellGrid();
			expect(grid).toEqual([
				[DIE, DIE, DIE, DIE, DIE, DIE],
				[DIE, DIE, DIE, ALIVE, DIE, DIE],
				[DIE, ALIVE, DIE, DIE, ALIVE, DIE],
				[DIE, ALIVE, DIE, DIE, ALIVE, DIE],
				[DIE, DIE, ALIVE, DIE, DIE, DIE],
				[DIE, DIE, DIE, DIE, DIE, DIE],
			]);
			board.toNextGeneration();
			grid = board.getCellGrid();
			expect(grid).toEqual([
				[DIE, DIE, DIE, DIE, DIE, DIE],
				[DIE, DIE, DIE, DIE, DIE, DIE],
				[DIE, DIE, ALIVE, ALIVE, ALIVE, DIE],
				[DIE, ALIVE, ALIVE, ALIVE, DIE, DIE],
				[DIE, DIE, DIE, DIE, DIE, DIE],
				[DIE, DIE, DIE, DIE, DIE, DIE],
			]);
		});
	});
});

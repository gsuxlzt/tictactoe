let game = {
	board : ["E","E","E","E","E","E","E","E","E"],
	turn : "X",
	result: "",
	winner: "",
	symbol: "",
	winTable : [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],
	nextTurn() { 
		this.turn = this.turn === "X" ? "O" : "X";
		$("#turn").html(`${this.turn}'s`);
	},
	checkEmpty() {
		let count = [];
		for (var i = 0; i < 9; i++) {
			if (this.board[i] === "E") count.push(i);
		}
		return count;
	},
	endGame() {
		let brd = this.board;
		//row check
		for (let i = 0; i <=6; i += 3) {
			if (brd[i] !== "E" && brd[i] === brd[i+1] && brd[i] === brd[i+2]) {
				this.result = `${brd[i]} won!`;
				this.winner = brd[i];
				return true;
			}
		}
		//column check
		for (let i = 0; i <=3; i++) {
			if (brd[i] !== "E" && brd[i] === brd[i+3] && brd[i] === brd[i+6]){
				this.result = `${brd[i]} won!`;
				this.winner = brd[i];
				return true;
			}
		}
		//diagonals check
		if (brd[0] !== "E" && brd[0] === brd[4] && brd[0] === brd[8]) {
			this.result = `${brd[0]} won!`;
			this.winner = brd[0];
			return true;
		}
		else if (brd[2] !== "E" && brd[2] === brd[4] && brd[2] === brd[6]) {
			this.result = `${brd[2]} won!`;
			this.winner = brd[2];
			return true;
		}

		//check if draw
		var empty = this.checkEmpty();
		if (empty.length === 0) {
			this.result = "It's a draw";
			return true;
		}
	return false;
	},
	checkIfWin(symbol,board) {
		let table = this.winTable;
		for (let i = 0, len = table.length; i < len; i++) {
			let win = table[i].every(j => board[j] === symbol);
			if (win) return table[i];
			}
		return [];
	},
	announceWinner() {
		var arr = this.checkIfWin(this.winner,this.board);
		for (var i=0,len=arr.length; i < len; i++) {
			$(`[data-num='${arr[i]}']`).css({
				'color':'white',
				'background-color': '#7ACA99'
			}); 
		}

		$(".table").each(function() {
			$(this).addClass('disabled');
		});
		$('#gameTime').fadeOut('slow', ()=> {
			$('#result').html(game.result);
			$('#endBoard').fadeIn('fast');
		});
	},
	reset() {
		this.board = ["E","E","E","E","E","E","E","E","E"];
		this.turn = "X";
		this.winner = "";
		this.result = "";
		this.symbol = "";
		$("#turn").html("X's");
	}
}	
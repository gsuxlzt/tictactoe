let game = {
	//initial board state
	board : ["E","E","E","E","E","E","E","E","E"],
	//X always plays first
	turn : "X",
	result: "",
	winner: "",
	symbol: "X",
	//list of posible winning moves
	winTable : [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],
	//to change turns
	nextTurn() { 
		this.turn = this.turn === "X" ? "O" : "X";
		$("#turn").html(`${this.turn}'s`);
	},
	//to check which part of the board are still empty (no symbol placed)
	checkEmpty() {
		let count = [];
		for (var i = 0; i < 9; i++) {
			if (this.board[i] === "E") count.push(i);
		}
		return count;
	},
	//to check if the game is finished (someone won or it's a draw)
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
	//check if there is a winning move available
	checkIfWin(symbol,board) {
		let table = this.winTable;
		for (let i = 0, len = table.length; i < len; i++) {
			let win = table[i].every(j => board[j] === symbol);
			if (win) return table[i];
			}
		return [];
	},
	//function to handle the animation for showing the winner
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
	//for restarting the game
	reset() {
		this.board = ["E","E","E","E","E","E","E","E","E"];
		this.turn = "X";
		this.winner = "";
		this.result = "";
		this.symbol = "X";
		ai.symbol = "O";

		$("#turn").html("X's");
	}
}	
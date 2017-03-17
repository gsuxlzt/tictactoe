let ai = {
	symbol :"",
	setSymbol() {
		this.symbol = game.symbol === "X" ? "O" : "X";
	},
	checkTime(symbol){
		let counter;
		let brd = game.board;
		for (let i=0, len=brd.length; i < len; i++) {
			if (brd[i] !== "E") continue;
			let board = [].concat(brd);
			board[i] = symbol;
			let check = game.checkIfWin(symbol,board);
			if(check.length > 0) {
				counter = i;
				break;
			} 
		}
		if (counter >= 0) {
			return counter;
		}
		else return false;
	
	},
	randomTime() {
		let empty = game.checkEmpty();
		let rand;

		do {
			rand = Math.floor(Math.random()*9);
		} while(empty[rand] === undefined);
		let num = empty[rand];
		this.makeMove(num);
	},
	makeMove(num) {
		game.board[num] = this.symbol;
		setTimeout(()=>{
			$(`[data-num='${num}']`).html(this.symbol)
			if (!game.endGame()) {
			game.nextTurn();
			}
			else game.announceWinner();

		},300);
	}


};
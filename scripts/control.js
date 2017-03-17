	//for choosing the symbol
	$(".choose").each(function(){
		let $this = $(this)
		$this.click(()=>{
			$(".active").toggleClass('inactive');
			$(".active").toggleClass('active');
			$this.toggleClass('inactive');
			$this.toggleClass('active');
			game.symbol = $this.html();
			ai.setSymbol();
		})
	})
	//start of the game
	$("#gameStart").click(()=> {
		$("#start").fadeOut("slow", () => {
			$("#gameTime").fadeIn("fast")
			$(".table").each(function() {
			$(this).removeClass('disabled');
		})
		if (ai.symbol === "X") ai.randomTime();
		});
	})
	//event listener on the table cells
	$(".table").each(function() {
		let $this = $(this);
		$this.click(() => {
			let index = parseInt($this.data('num'));
			if (game.board[index] === "E" && game.turn === game.symbol) {
				game.board[index] = game.turn;
				//for adding the symbol to the board
				$this.html(game.turn);		
				//checking if the game ended
				if (!game.endGame()) {
					game.nextTurn();
					//ai's move
					let m = ai.checkTime(ai.symbol);
					if (m) {
						ai.makeMove(m);
						return true;
					}

					m = ai.checkTime(game.symbol);
					if (m) {
						ai.makeMove(m);
						return true;
					}
					else ai.randomTime();			
					
				}	
				else game.announceWinner();
			}
		});
	})
//for restarting the game
	$('#resetGame').click(function(){
		game.reset();
		$('#endBoard').fadeOut('slow',() => {
			$('.table').each(function(){
				$(this).html('').addClass('disabled');
				$(this).css({
				'color': '#333333',
				'background-color' : 'white'
			});
		})
		$('.choose').each(function(){
			$(this).removeClass('active').addClass('inactive');
		})
		$('#start').fadeIn('fast')});
	})
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

$("#gameStart").click(()=> {
	$("#start").fadeOut("slow", () => {
		$("#gameTime").fadeIn("fast")
		$(".table").each(function() {
			$(this).removeClass('disabled');
		})
		if (ai.symbol === "X") ai.randomTime();
	});
})
$(".table").each(function() {
	let $this = $(this);
		$this.click(() => {
			let index = parseInt($this.data('num'));
			if (game.board[index] === "E" && game.turn === game.symbol) {
				game.board[index] = game.turn;
				$this.html(game.turn);
				
				if (!game.endGame()) {
					game.nextTurn();
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
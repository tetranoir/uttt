'use strict';

var bigBoard = Array.apply(null, Array(9)).map(function(){ return 0; });
var board = Array.apply(null, Array(9)).map(function(){ return Array.apply(null, Array(9)).map(function(){ return 0; });; });
var player = 1;
var won = false;

$(document).ready(function() {
	initializePage();

});

function initializePage() {
	$(".section").on('click', function(event) {
		if($(this).hasClass("selected")) {
			if(won == true) return;
			var id = parseInt($(this).attr("id")) - 1;
			var offset = $(this).offset();
			var x = Math.floor((event.pageX - offset.left) / ($(this).width() / 3));
			var y = Math.floor((event.pageY - offset.top) / ($(this).height() / 3));
			if(board[id][x + y*3] == 0) {
				board[id][x + y*3] = player;

				var piece = "circle";
				if(player == 1) {
					piece = "cross";
					$("#player").html('Player 2');
				} else  {
					piece = "circle";
					$("#player").html('Player 1');
				}
				$(".last-move").removeClass("last-move");
				var play = '<div class="subsection x-' + x + ' y-' + y + ' last-move"><div class="' + piece + '"></div></div>'
				$(this).append(play);

				if(bigBoard[id] == 0) {
					if(checkWin(board[id])) {
						bigBoard[id] = player;
						$(this).append('<div class="' + piece + '"></div>');
						if(checkWin(bigBoard)) {
							gameWon();
						}
					}
				}

				player = player == 1 ? 2 : 1;
				newSelected(x, y);
			}
		}
	});
	$(".section").addClass("selected");
	hoverQuery();
};

function newSelected(x, y) {
	$(".section").removeClass("selected");
	for(var e of board[x + y*3]) {
		if(e == 0) {
			$("#" + (x + y*3 + 1)).addClass("selected");
			return;
		}
	}
	$(".section").addClass("selected");
}

function hoverQuery() {
	$(".section").mousemove(function(event) {
		var offset = $(this).offset();
		var x = Math.floor((event.pageX - offset.left) / ($(this).width() / 3));
		var y = Math.floor((event.pageY - offset.top) / ($(this).height() / 3));
		$(".hover").remove();
		var id = parseInt($(this).attr('id'))
		if(board[id - 1][x + y*3] != 0) {
			return;
		}
		if($("#" + id).hasClass("selected")) {
			var piece = player == 1 ? "cross" : "circle";
			$(this).append('<div class="subsection x-' + x + ' y-' + y + ' hover"><div class="' + piece + '"></div></div>');
		}
	});
}

function checkWin(board) {
	if((board[0] != 0 && board[1] != 0 && board[2] != 0) && (board[0] == board[1] && board[0] == board[2])) {
		console.log("0w");
		return true;
	} 
	if((board[3] != 0 && board[4] != 0 && board[5] != 0) && (board[3] == board[4] && board[3] == board[5])) {
		console.log("1w");
		return true;
	}
	if((board[6] != 0 && board[7] != 0 && board[8] != 0) && (board[6] == board[7] && board[6] == board[8])) {
		console.log("2w");
		return true;
	}
	if((board[0] != 0 && board[3] != 0 && board[6] != 0) && (board[0] == board[3] && board[0] == board[6])) {
		console.log("3w");
		return true;
	}
	if((board[1] != 0 && board[4] != 0 && board[7] != 0) && (board[1] == board[4] && board[1] == board[7])) {
		console.log("4w");
		return true;
	}
	if((board[2] != 0 && board[5] != 0 && board[8] != 0) && (board[2] == board[5] && board[2] == board[8])) {
		console.log("5w");
		return true;
	}
	if((board[0] != 0 && board[4] != 0 && board[8] != 0) && (board[0] == board[4] && board[0] == board[8])) {
		console.log("6w");
		return true;
	}
	if((board[2] != 0 && board[4] != 0 && board[6] != 0) && (board[2] == board[4] && board[2] == board[6])) {
		console.log("7w");
		return true;
	}
	return false;
}

function gameWon() {
	won = true;
	$("#player").html('Player ' + player + ' wins!');
	$(".section").addClass("won");
}
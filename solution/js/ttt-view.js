(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.setupBoard = function () {
    var $ul = $("<ul>");
    $ul.addClass("board-area");

    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        var $li = $("<li>");
        $li.data("pos", [row, col]);

        $ul.append($li);
      }
    }

    this.$el.append($ul);
  };

  View.prototype.bindEvents = function () {
    // install a handler on the `li` elements inside the board.
    this.$el.on("click", "li", (function (event) {
      var $cell = $(event.currentTarget);
      this.makeMove($cell);
    }).bind(this));
  };

  View.prototype.makeMove = function ($cell) {
    var pos = $cell.data("pos");
    var currentPlayer = this.game.currentPlayer;

    try {
      this.game.playMove(pos);
    } catch (e) {
      alert("Invalid move.");
      return;
    }

    $cell.addClass(currentPlayer);

    if (this.game.isOver()) {
      this.$el.off("click");
      this.$el.addClass("game-over");

      var winner = this.game.winner();
      var $figcaption = $("<figcaption>");

      if (winner) {
        this.$el.addClass("winner-" + winner);
        $figcaption.html(winner + " wins!");
      } else {
        $figcaption.html("Draw!");
      }

      this.$el.append($figcaption);
    }
  };


})();

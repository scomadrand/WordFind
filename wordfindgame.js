/**
* Wordfind.js 0.0.1
* Amparo García Foundation
*/

(function (document, $, wordfind) {
  'use strict';

  /**
  * An example game using the puzzles created from wordfind.js. Click and drag
  * to highlight words.
  *
  * WordFindGame requires wordfind.js and jQuery.
  */

  /**
  * Draws the puzzle by inserting rows of buttons into el.
  *
  * @param {String} el: The jQuery element to write the puzzle to
  * @param {[[String]]} puzzle: The puzzle to draw
  */

var endGame =async function(){
    alert("Se te ha acabado el tiempo");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
      }
    }
    xmlhttp.open("GET", "http://172.20.10.14/hack/ranking.php?usuario=" + username + "&puntos=" + wordsFound.length, true);
    xmlhttp.send();
    window.location.href = "http://172.20.10.14/hack/ranking2.php";
}
  var drawPuzzle = function (el, puzzle) {
    var output = '';
    // for each row in the puzzle
    for (var i = 0, height = puzzle.length; i < height; i++) {
      // append a div to represent a row in the puzzle
      var row = puzzle[i];
      output += '<div>';
      // for each element in that row
      for (var j = 0, width = row.length; j < width; j++) {
        // append our button with the appropriate class
        output += '<button class="puzzleSquare" x="' + j + '" y="' + i + '">';
        output += row[j] || '&nbsp;';
        output += '</button>';
      }
      // close our div that represents a row
      output += '</div>';
    }

    $(el).html(output);
  };


  /**
  * Initializes the WordFindGame object.
  *
  * Creates a new word find game and draws the board and words.
  *
  * Returns the puzzle that was created.
  *
  * @param {String} puzzleEl: Selector to use when inserting the puzzle
  * @param {Options} options: WordFind options to use when creating the puzzle
  */
    
  var username, wordsFound = [];
    
  var WordFindGame = function (puzzleEl, options) {

    // Class properties, game initial config:
    var wordList, puzzle;

    /**
    * Game play events.
    *
    * The following events handle the turns, word selection, word finding, and
    * game end.
    *
    */

    // Game state
    var selectedSquares = [], curWord = '', keys_x = [], keys_y = [], game_started;

    /**
    * Event that handles mouse down on a new square. Initializes the game state
    * to the letter that was selected.
    *
    */
    var startTurn = function () {
      select(this);
    };


    /**
    * Event that handles mouse over on a new square. Ensures that the new square
    * is adjacent to the previous square and the new square is along the path
    * of an actual word.
    *
    */
    var select = function (square) {

      /**
       * Check if it was already selected
       */
        
        
      if(game_started != 1) {
            setTimeout(()=>endGame(), 60*1000);
            document.getElementById('username').disabled = true;
            username = document.getElementById('username').value;
            game_started = 1;
      }
        
      if (selectedSquares[selectedSquares.length-1] == square) {
        $(selectedSquares[selectedSquares.length - 1]).removeClass('selected');
        selectedSquares.splice(selectedSquares.length - 1, 1);
        keys_x.splice(selectedSquares.length - 1, 1);
        keys_y.splice(selectedSquares.length - 1, 1);
        curWord = curWord.substr(selectedSquares.length - 1, 0);
        return;
      }

      for (var i = 0, len = selectedSquares.length; i < len; i++) {
        if (selectedSquares[i] == square) {
          return;
        }
      }

      $(square).addClass('selected');
      selectedSquares.push(square);
      keys_x.push($(square).attr("x"));
      keys_y.push($(square).attr("y"));
      curWord += $(square).text();
    };

    /**
    * Event that handles mouse up on a square. Checks to see if a valid word
    * was created and updates the class of the letters and word if it was. Then
    * resets the game state to start a new word.
    *
    */

     var validar = function () {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var json_word = this.responseText;
          json_word = JSON.parse(json_word).word[0];
          console.log(json_word);
          if(json_word != "false"){
            wordsFound[wordsFound.length] = curWord;
            console.log(wordsFound.length);
            $('.selected').addClass('complete');
            $('.selected').removeClass('selected');
            puzzle = wordfind.refillPuzzle(puzzle,keys_x,keys_y);
            console.log(puzzle);
            drawPuzzle(puzzleEl, puzzle);
            clicks();
            keys_x = [];
            keys_y = [];
            $('.complete').removeClass('complete');
          } else {
            $('.selected').removeClass('selected');
            keys_x = [];
            keys_y = [];
          }

        }
      }
      xmlhttp.open("GET", "http://172.20.10.14/hack/comprobar.php?palabra=" + curWord, true);
      xmlhttp.send();
      console.log(curWord);
    };

    var endTurn = function () {
      // reset the turn & see if it is a valid word
      if (selectedSquares.length == 4 && !wordsFound.includes(curWord)) {
        validar();
        selectedSquares = [];
        curWord = '';
      }
    };

    var clicks = function(){
      if (window.navigator.msPointerEnabled) {
        $('.puzzleSquare').on('MSPointerDown', startTurn);
        $('.puzzleSquare').on('MSPointerUp', endTurn);
      } else {
        $('.puzzleSquare').mousedown(startTurn);
        $('.puzzleSquare').mouseup(endTurn);
        $('.puzzleSquare').on("touchstart", startTurn);
        $('.puzzleSquare').on("touchend", endTurn);
      }
    }

    // Class properties, game initial config:
    puzzle = wordfind.newPuzzle(options);

    // Draw all of the words
    drawPuzzle(puzzleEl, puzzle);

    // attach events to the buttons
    // optimistically add events for windows 8 touch

    clicks();
  };

  /**
  * Allow game to be used within the browser
  */
  window.WordFindGame = WordFindGame;

}(document, jQuery, wordfind));

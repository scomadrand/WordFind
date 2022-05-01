/**
* Wordfind.js 0.0.1
* Amparo García Foundation
*/

(function () {

  'use strict';

  /**
  * Initializes the WordFind object.
  *
  * @api private
  */
  var WordFind = function () {

    /**
    * Initializes the puzzle and places letters in the puzzle one at a time.
    *
    *
    * @param {[Options]} options: The options to use when filling the puzzle
    */
    var fillPuzzle = function (options) {

      var puzzle = [], i, j, len;

      // initialize the puzzle with blanks
      for (i = 0; i < options.height; i++) {
        puzzle.push([]);
        for (j = 0; j < options.width; j++) {
          puzzle[i].push(genLetter());
        }
      }

      // add each letter into the puzzle one at a time
      //placeLetters(puzzle);

      // return the puzzle
      return puzzle;
    };


    /**
     * 
     * Returns a pseudorandom letter. Letter probabilities are same as letter frequency in Spanish Language
     */
    var genLetter = function(){
      var num, letter = ' ';
      num = Math.random();
        if (num>=0 && num<0.1253) letter = 'a';
        if (num>=0.1253 && num<0.1395) letter = 'b';
        if (num>=0.1395 && num<0.1863) letter = 'c';
        if (num>=0.1863 && num<0.2449) letter = 'd';        
        if (num>=0.2449 && num<0.3817) letter = 'e';         
        if (num>=0.3817 && num<0.3886) letter = 'f';         
        if (num>=0.3886 && num<0.3986) letter = 'g';         
        if (num>=0.3986 && num<0.4056) letter = 'h';        
        if (num>=0.4056 && num<0.4681) letter = 'i';         
        if (num>=0.4681 && num<0.4725) letter = 'j';         
        if (num>=0.4725 && num<0.4727) letter = 'k';         
        if (num>=0.4727 && num<0.5224) letter = 'l';         
        if (num>=0.5224 && num<0.5539) letter = 'm';         
        if (num>=0.5539 && num<0.6209) letter = 'n';         
        if (num>=0.6209 && num<0.7077) letter = 'o';         
        if (num>=0.7077 && num<0.7328) letter = 'p';          
        if (num>=0.7328 && num<0.7416) letter = 'q';         
        if (num>=0.7416 && num<0.8103) letter = 'r';         
        if (num>=0.8103 && num<0.8891) letter = 's';         
        if (num>=0.8891 && num<0.9354) letter = 't';        
        if (num>=0.9354 && num<0.9747) letter = 'u';        
        if (num>=0.9747 && num<0.9837) letter = 'v';         
        if (num>=0.9837 && num<0.9838) letter = 'w';         
        if (num>=0.9838 && num<0.9860) letter = 'x';         
        if (num>=0.9860 && num<0.9950) letter = 'y';         
        if (num>=0.9950 && num<=1) letter = 'z'; 
        return letter;         
    };

    return {

      /**
      * Settings:
      *
      * height: desired height of the puzzle, default: smallest possible
      * width:  desired width of the puzzle, default: smallest possible
      * 
      * Returns the puzzle that was created.
      *
      * @param {options} settings: The options to use for this puzzle
      * @api public
      */
      newPuzzle: function(settings) {
        var puzzle, opts = settings;

        // initialize the options
        var options = {
          height: opts.height,
          width: opts.width
        };

        while (!puzzle) {
          puzzle = fillPuzzle(options);
        }
        return puzzle;
      },

      /**
       * 
       * @param {[[String]]} puzzle 
       * @param {[[Integer]]} positions
       */
      refillPuzzle: function (puzzle, x, y){
        for(var i=0, lenx = x.length; i<lenx; i++){
          //puzzle[x[i]].splice(y[i],1,genLetter());
          puzzle[y[i]][x[i]]=genLetter();
        }
        return puzzle;
      },
      

      /**
      * Outputs a puzzle to the console, useful for debugging.
      * Returns a formatted string representing the puzzle.
      *
      * @param {[[String]]} puzzle: The current state of the puzzle
      * @api public
      */
      print: function (puzzle) {
        var puzzleString = '';
        for (var i = 0, height = puzzle.length; i < height; i++) {
          var row = puzzle[i];
          for (var j = 0, width = row.length; j < width; j++) {
            puzzleString += (row[j] === '' ? ' ' : row[j]) + ' ';
          }
          puzzleString += '\n';
        }

        console.log(puzzleString);
        return puzzleString;
      }
    };
  };

  /**
  * Allow library to be used within both the browser and node.js
  */
  var root = typeof exports !== "undefined" && exports !== null ? exports : window;
  root.wordfind = WordFind();

}).call(this);

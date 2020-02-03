// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Board.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// array for checking neighbours
var checkId = [{
  row: -1,
  col: -1
}, {
  row: -1,
  col: 0
}, {
  row: -1,
  col: +1
}, {
  row: 0,
  col: -1
}, {
  row: 0,
  col: +1
}, {
  row: +1,
  col: -1
}, {
  row: +1,
  col: 0
}, {
  row: +1,
  col: +1
}];

var Board =
/*#__PURE__*/
function () {
  function Board(width, height) {
    _classCallCheck(this, Board);

    // create array
    var board = []; // create array with objects

    for (var row = 0; row < height; row += 1) {
      board[row] = [];

      for (var col = 0; col < width; col += 1) {
        board[row][col] = {
          fill: 0,
          state: 'hidden'
        };
      }
    }

    this.board = board;
  }

  _createClass(Board, [{
    key: "drawBombs",
    value: function drawBombs(numBomb) {
      // drawing bombs
      for (var bomb = 0; bomb < numBomb; bomb += 1) {
        var rows = Math.floor(Math.random() * this.board.length);
        var cols = Math.floor(Math.random() * this.board[rows].length);

        if (this.board[rows][cols].fill === 9) {
          do {
            rows = Math.floor(Math.random() * this.board.length);
            cols = Math.floor(Math.random() * this.board[rows].length);
          } while (this.board[rows][cols].fill === 9);

          this.board[rows][cols].fill = 9;
        } else {
          this.board[rows][cols].fill = 9;
        }
      } // assign numbers


      for (var row = 0; row < this.board.length; row += 1) {
        for (var col = 0; col < this.board[row].length; col += 1) {
          var numberOfNeighbourBombs = 0;
          if (this.board[row][col].fill === 9) continue; // ignore elements with bombs

          for (var check = 0; check < checkId.length; check += 1) {
            var dir = checkId[check];

            if (this.isInBounds(row + dir.row, col + dir.col)) {
              if (this.board[row + dir.row][col + dir.col].fill === 9) {
                numberOfNeighbourBombs += 1;
              }
            }

            this.board[row][col].fill = numberOfNeighbourBombs;
          }
        }
      }
    }
  }, {
    key: "isInBounds",
    value: function isInBounds(row, col) {
      return row >= 0 && col >= 0 && row < this.board.length && col < this.board[row].length;
    } // play

  }, {
    key: "boardCheck",
    value: function boardCheck(row, col) {
      // click on empty
      if (this.board[row][col].fill === 0 && this.board[row][col].state === 'hidden') {
        this.board[row][col].state = 'revealed'; // change state on clicked element

        for (var check = 0; check < checkId.length; check += 1) {
          // check neighbours
          var dir = checkId[check];

          if (this.isInBounds(row + dir.row, col + dir.col)) {
            // pass valid index
            if (this.board[row + dir.row][col + dir.col].fill > 0 && this.board[row + dir.row][col + dir.col].fill <= 8 && this.board[row + dir.row][col + dir.col].state === 'hidden') // if neighbours are numbers, reveal them
              {
                this.board[row + dir.row][col + dir.col].state = 'revealed';
              }

            if (this.board[row + dir.row][col + dir.col].fill === 0 && this.board[row][col].state === 'hidden') // if neighbour is 0, reveal it and start userClicks() on it
              {
                this.board[row + dir.row][col + dir.col].state = 'revealed';
              }

            this.boardCheck(row + dir.row, col + dir.col);
          }
        }
      } // click on numbers


      if (this.board[row][col].fill > 0 && this.board[row][col].fill <= 8 && this.board[row][col].state === 'hidden') {
        this.board[row][col].state = 'revealed';
      } // click on bomb


      if (this.board[row][col].fill === 9 && this.board[row][col].state === 'hidden') {
        for (var rows = 0; rows < this.board.length; rows += 1) {
          for (var cols = 0; cols < this.board[rows].length; cols += 1) {
            this.board[rows][cols].state = 'revealed'; // reveal all elements of board
          }
        }
      }
    }
  }, {
    key: "flagBoard",
    value: function flagBoard(row, col) {
      if (this.board[row][col].state === 'hidden') {
        this.board[row][col].state = 'flagged';
      } else if (this.board[row][col].state === 'flagged') {
        this.board[row][col].state = 'hidden';
      }
    }
  }, {
    key: "dblClick",
    value: function dblClick(row, col) {
      if (this.board[row][col].fill > 0 && this.board[row][col].fill < 9 && this.board[row][col].state === 'revealed') {
        var numberOfBombsFlagged = 0;
        var numberOfBombs = this.board[row][col].fill;

        for (var check = 0; check < checkId.length; check += 1) {
          // check neighbours
          var dir = checkId[check];

          if (this.isInBounds(row + dir.row, col + dir.col)) {
            if (this.board[row + dir.row][col + dir.col].fill === 9 && this.board[row + dir.row][col + dir.col].state === 'flagged') {
              numberOfBombsFlagged += 1;
            }
          }
        }

        for (var _check = 0; _check < checkId.length; _check += 1) {
          // check neighbours
          var _dir = checkId[_check];

          if (numberOfBombs === numberOfBombsFlagged) {
            if (this.isInBounds(row + _dir.row, col + _dir.col)) {
              this.boardCheck(row + _dir.row, col + _dir.col);
            }
          } else if (numberOfBombs !== numberOfBombsFlagged) {
            for (var rows = 0; rows < this.board.length; rows += 1) {
              for (var cols = 0; cols < this.board[rows].length; cols += 1) {
                this.board[rows][cols].state = 'revealed'; // reveal all elements of board
              }
            }
          }
        }
      }
    }
  }, {
    key: "isLose",
    value: function isLose() {
      // true if any board element with bomb is revealed
      for (var row = 0; row < this.board.length; row += 1) {
        for (var col = 0; col < this.board[row].length; col += 1) {
          if (this.board[row][col].fill === 9 && this.board[row][col].state === 'revealed') {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "isWin",
    value: function isWin() {
      // true if all elements without bombs are revealed
      var numberOfNoBombs = 0;
      var numberOfNoBombsRevealed = 0;

      for (var row = 0; row < this.board.length; row += 1) {
        for (var col = 0; col < this.board[row].length; col += 1) {
          if (this.board[row][col].fill !== 9) {
            numberOfNoBombs += 1;
          }

          if (this.board[row][col].fill !== 9 && this.board[row][col].state === 'revealed') {
            numberOfNoBombsRevealed += 1;
          }
        }
      }

      return numberOfNoBombs === numberOfNoBombsRevealed;
    }
  }]);

  return Board;
}();

exports.Board = Board;
},{}],"DOM.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// create DOM representation of board
var DOM =
/*#__PURE__*/
function () {
  function DOM(board, boardContainer, bombs, timer) {
    var _this = this;

    _classCallCheck(this, DOM);

    _defineProperty(this, "firstClick", true);

    _defineProperty(this, "clickHandler", function (event) {
      var row = parseInt(event.target.getAttribute('data-row'));
      var col = parseInt(event.target.getAttribute('data-col')); // if this was first click and board.isLose()

      if (_this.firstClick) {
        if (_this.board.board[row][col].fill === 9) {
          do {
            // if firstClick is bomb, drawBombs again
            // clear previous board fill & state
            for (var prevRow = 0; prevRow < _this.board.board.length; prevRow += 1) {
              for (var prevCol = 0; prevCol < _this.board.board[prevRow].length; prevCol += 1) {
                _this.board.board[prevRow][prevCol].fill = 0;
                _this.board.board[prevRow][prevCol].state = 'hidden';
              }
            }

            _this.board.board[row][col].element.classList.remove('revealed');

            _this.board.drawBombs(_this.bombs);

            _this.board.boardCheck(row, col);
          } while (_this.board.isLose());

          _this.update();
        }

        _this.board.boardCheck(row, col);

        _this.update();

        _this.firstClick = false;
      } else {
        _this.board.boardCheck(row, col);

        _this.update();
      }
    });

    this.board = board;
    this.bombs = bombs;
    this.timer = timer;

    var _loop = function _loop(row) {
      var rows = document.createElement('div');
      _this.boardContainer = boardContainer;

      _this.boardContainer.classList.add('play');

      _this.boardContainer.classList.remove('lose');

      _this.boardContainer.append(rows);

      var _loop2 = function _loop2(col) {
        var cols = document.createElement('div');
        cols.setAttribute('data-row', "".concat(row));
        cols.setAttribute('data-col', "".concat(col));
        rows.append(cols);
        var field = _this.board.board[row][col];
        field.element = cols;
        field.element.classList.add('play'); // Left click - fires boardCheck on element click

        field.element.addEventListener('click', _this.clickHandler); // Right click - flag elements

        field.element.addEventListener('contextmenu', function (e) {
          _this.firstClick = false;
          e.preventDefault();

          _this.board.flagBoard(row, col);

          _this.update();
        }); // Dblclick fast revealing

        field.element.addEventListener('dblclick', function () {
          _this.firstClick = false;

          _this.board.dblClick(row, col);

          _this.update();
        });
      };

      for (var col = 0; col < _this.board.board[row].length; col += 1) {
        _loop2(col);
      }
    };

    for (var row = 0; row < this.board.board.length; row += 1) {
      _loop(row);
    }
  }

  _createClass(DOM, [{
    key: "update",
    value: function update() {
      var flagTimer = false;

      for (var row = 0; row < this.board.board.length; row += 1) {
        for (var col = 0; col < this.board.board[row].length; col += 1) {
          var field = this.board.board[row][col];
          field.element.classList.add(field.state);
          field.element.setAttribute('data-value', "".concat(this.board.board[row][col].fill)); // update changes made on board
          // color, state, numbers and strings

          if (field.state === 'hidden') {
            field.element.classList.add('hidden');
            field.element.classList.remove('flagged');
          } // if user expose empty square, change state to revealed


          if (field.fill === 0 && field.state === 'revealed') {
            field.element.classList.add('revealed');
            field.element.classList.remove('hidden');
          } // if user expose empty square, change state to revealed and assign number


          if (field.fill > 0 && field.fill < 9) {
            if (field.state === 'revealed') {
              field.element.classList.remove('hidden');
              field.element.classList.add('revealed');
            }
          } // if user expose empty square, change state to revealed and assign string


          if (field.fill === 9 && field.state === 'revealed') {
            field.element.classList.remove('hidden');
            field.element.classList.add('revealed');
          }

          if (field.state === 'flagged') {
            field.element.classList.add('flagged');
            field.element.classList.remove('hidden');
          }

          if (this.board.isLose()) {
            this.timer.stop();
            field.element.classList.remove('play');
            field.element.classList.add('lose');
            this.boardContainer.classList.add('lose');
            document.getElementById('timer').style.color = '#2f55a4';
            setTimeout(function () {
              document.getElementById('animation').style.display = 'block';
            }, 0);
            setTimeout(function () {
              document.getElementById('animation').style.display = 'none';
            }, 5000);
          } else if (this.board.isWin()) {
            this.timer.stop();
            flagTimer = true;
            field.element.classList.remove('play');
            field.element.classList.add('win');
            document.getElementById('timer').style.color = '#2f55a4';
            this.boardContainer.classList.add('win');

            if (field.fill === 9) {
              field.element.classList.remove('revealed');
              field.element.classList.remove('flagged');
              field.element.classList.add('win');
            }
          }
        }
      }

      if (flagTimer) {
        var timer = document.getElementById('timer');
        timer.innerText = timer.innerText + ' WOW! ';
      }
    }
  }]);

  return DOM;
}();

exports.default = DOM;
},{}],"Timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Timer =
/*#__PURE__*/
function () {
  function Timer(container) {
    var _this = this;

    _classCallCheck(this, Timer);

    _defineProperty(this, "timerRAF", void 0);

    _defineProperty(this, "rAFCallback", function () {
      _this.currTimeValue = performance.now();
      _this.diffValue = _this.currTimeValue - _this.startTime;

      _this.display();

      _this.timerRAF = requestAnimationFrame(_this.rAFCallback);
    });

    this.container = container;
    this.display();
  }

  _createClass(Timer, [{
    key: "display",
    value: function display() {
      this.sec = Math.floor(this.diffValue / 1000) % 60;
      this.min = Math.floor(this.diffValue / 60000) % 60;
      this.container.innerText = "".concat(this.min ? this.min > 9 ? this.min : "0".concat(this.min) : '00', ":").concat(this.sec > 9 ? this.sec : "0".concat(this.sec));
    }
  }, {
    key: "start",
    value: function start() {
      // use when submit btn is clicked
      this.timerRAF = requestAnimationFrame(this.rAFCallback);
      this.startTime = performance.now();
    }
  }, {
    key: "stop",
    value: function stop() {
      // use when isWin / isLose
      cancelAnimationFrame(this.timerRAF);
    }
  }]);

  return Timer;
}();

exports.Timer = Timer;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _Board = require("./Board");

var _DOM = _interopRequireDefault(require("./DOM"));

var _Timer = require("./Timer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.getElementById('play').style.display = 'none';
document.getElementById('animation').style.display = 'none'; // show play area

var smileys = document.querySelectorAll('.smile');
smileys.forEach(function (smile) {
  return smile.style.setProperty('--animation-time', Math.random() * 4 + 3 + 's');
});

document.getElementById('submit').onclick = function () {
  document.getElementById('start').style.display = 'none'; // game menu hidden

  document.getElementById('play').style.display = 'flex'; // show play area

  var rows = document.getElementById('height').value;
  var columns = document.getElementById('width').value;
  var numBombs = document.getElementById('bombNums').value;
  var board = document.getElementById('board');
  var boardTest = new _Board.Board(columns, rows);
  boardTest.drawBombs(numBombs);
  console.log(boardTest);
  var timer = document.getElementById('timer');
  var stopwatch = new _Timer.Timer(timer);
  stopwatch.start();
  var boardDraw = new _DOM.default(boardTest, board, numBombs, stopwatch);
  boardDraw.update();
};

document.getElementById('reset').onclick = function () {
  document.getElementById('start').style.display = 'flex'; // game menu hidden

  document.getElementById('play').style.display = 'none'; // show play area

  document.getElementById('timer').style.color = 'black';
  document.getElementById('height').value = '8';
  document.getElementById('width').value = '8';
  document.getElementById('bombNums').value = '10';
  document.getElementById('play').style.borderColor = 'grey';
  document.getElementById('animation').style.display = 'none'; // show play area

  document.body.style.background = '#ffffff';
  var boardElements = document.getElementById('board');

  while (boardElements.firstChild) {
    boardElements.removeChild(boardElements.firstChild);
  }
};
},{"./Board":"Board.js","./DOM":"DOM.js","./Timer":"Timer.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44205" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map
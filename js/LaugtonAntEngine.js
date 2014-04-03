function LangtonAntEngine(size, prefix, mark) {
  this.size = size;
  this.prefix = prefix;
  this.mark = mark;

  var totalCellNum = size * size;
  this.currentPos = Math.floor(Math.random() * totalCellNum);

  // 0: Up, 1: Down, 2: Left, 3: Right
  this.currentDirect = Math.floor(Math.random() * 3);
}

LangtonAntEngine.prototype.TurnUp = function() {
  var rowPos = Math.floor(this.currentPos / this.size);
  if (rowPos > 0) {
    this.currentPos = this.currentPos - this.size;
    this.currentDirect = 0;
  }
};

LangtonAntEngine.prototype.TurnDown = function() {
  var rowPos = Math.floor(this.currentPos / this.size);
  if (rowPos < this.size - 1) {
    this.currentPos = this.currentPos + this.size;
    this.currentDirect = 1;
  }
};

LangtonAntEngine.prototype.TurnLeft = function() {
  var colPos = this.currentPos % this.size;
  if (colPos > 0) {
    this.currentPos = this.currentPos - 1;
    this.currentDirect = 2;
  }
};

LangtonAntEngine.prototype.TurnRight = function() {
  var colPos = this.currentPos % this.size;
  if (colPos < this.size - 1) {
    this.currentPos = this.currentPos + 1;
    this.currentDirect = 3;
  }
};

LangtonAntEngine.prototype.Move = function() {
  if ($("#" + this.prefix + this.currentPos).hasClass(this.mark)) {
    $("#" + this.prefix + this.currentPos).removeClass(this.mark);
    // Black Square
    switch (this.currentDirect) {
      case 0:
        this.TurnLeft();
        break;
      case 1:
        this.TurnRight();
        break;
      case 2:
        this.TurnDown();
        break;
      case 3:
        this.TurnUp();
        break;
    }
  }
  else {
    $("#" + this.prefix + this.currentPos).addClass(this.mark);
    // White Square
    switch (this.currentDirect) {
      case 0:
        this.TurnRight();
        break;
      case 1:
        this.TurnLeft();
        break;
      case 2:
        this.TurnUp();
        break;
      case 3:
        this.TurnDown();
        break;
    }
  }
}; 
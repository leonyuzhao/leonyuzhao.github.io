function LangtonAntEngine(boardSize, idPrefix, solidClassName) {
    this.boardSize = boardSize;
    this.idPrefix = idPrefix;
    this.solidClassName = solidClassName;

    var totalCellNum = boardSize * boardSize;
    this.currentPos = Math.floor(Math.random() * totalCellNum);

    // 0: Up, 1: Down, 2: Left, 3: Right
    this.currentDirect = Math.floor(Math.random() * 3);
}

LangtonAntEngine.prototype.GoUp = function () {
    var rowPos = Math.floor(this.currentPos / this.boardSize);
    if (rowPos > 0) {
        this.currentDirect = 0;
        this.currentPos = this.currentPos - this.boardSize;
    }
};

LangtonAntEngine.prototype.GoDown = function () {
    var rowPos = Math.floor(this.currentPos / this.boardSize);
    if (rowPos < this.boardSize - 1) {
        this.currentDirect = 1;
        this.currentPos = this.currentPos + this.boardSize;
    }
};

LangtonAntEngine.prototype.GoLeft = function () {
    var colPos = this.currentPos % this.boardSize;
    if (colPos > 0) {
        this.currentDirect = 2;
        this.currentPos = this.currentPos - 1;
    }
};

LangtonAntEngine.prototype.GoRight = function () {
    var colPos = this.currentPos % this.boardSize;
    if (colPos < this.boardSize - 1) {
        this.currentDirect = 3;
        this.currentPos = this.currentPos + 1;
    }
};

LangtonAntEngine.prototype.NextStep = function () {
    // At a white square, turn 90° right, flip the color of the square, move forward one unit
    // At a black square, turn 90° left, flip the color of the square, move forward one unit
    if ($("#" + this.idPrefix + this.currentPos).hasClass(this.solidClassName)) {
        $("#" + this.idPrefix + this.currentPos).removeClass(this.solidClassName);
        // Black Square
        switch (this.currentDirect) {
            case 0:
                this.GoLeft();
                break;
            case 1:
                this.GoRight();
                break;
            case 2:
                this.GoDown();
                break;
            case 3:
                this.GoUp();
                break;
        }
    }
    else {
        $("#" + this.idPrefix + this.currentPos).addClass(this.solidClassName);
        // White Square
        switch (this.currentDirect) {
            case 0:
                this.GoRight();
                break;
            case 1:
                this.GoLeft();
                break;
            case 2:
                this.GoUp();
                break;
            case 3:
                this.GoDown();
                break;
        }
    }
};
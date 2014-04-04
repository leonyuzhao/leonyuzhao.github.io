function GameOfLifeEngine(boardSize) {
    this.boardSize = boardSize;
    this.nodes = new Array();

    // Initial
    var totalCellNum = boardSize * boardSize;
    for (var i = 0; i < totalCellNum; i++) {
        var node = new GameOfLifeNode(Math.floor(Math.random() * 2)); // Random generate 0 or 1
        this.nodes[i] = node;
    }
    this.ProcessNodes();
}

GameOfLifeEngine.prototype.ProcessNodes = function () {
    var pos = 0;
    for (var i = 0; i < this.boardSize; i++) {
        for (var j = 0; j < this.boardSize; j++) {
            this.nodes[pos].liveNeighbourCount = 0;

            this.GetUpNode(pos);
            this.GetDownNode(pos);
            this.GetLeftNode(pos);
            this.GetRightNode(pos);
            this.GetUpLeftNode(pos);
            this.GetUpRightNode(pos);
            this.GetDownLeftNode(pos);
            this.GetDownRightNode(pos);

            pos++;
        }
    }
}

GameOfLifeEngine.prototype.GetUpNode = function (pos) {
    var rowPos = Math.floor(pos / this.boardSize);
    if (rowPos > 0) {
        var node = this.nodes[pos - this.boardSize];
        if(node != null && node.value == 1)
        {
            this.nodes[pos].liveNeighbourCount++;
        }
    }
};

GameOfLifeEngine.prototype.GetDownNode = function (pos) {
    var rowPos = Math.floor(pos / this.boardSize);
    if (rowPos < this.boardSize - 1) {
        var node = this.nodes[pos + this.boardSize];
        if (node != null && node.value == 1) {
            this.nodes[pos].liveNeighbourCount++;
        }
    }
};

GameOfLifeEngine.prototype.GetLeftNode = function (pos) {
    var colPos = pos % this.boardSize;
    if (colPos > 0) {
        var node = this.nodes[pos - 1];
        if (node != null && node.value == 1) {
            this.nodes[pos].liveNeighbourCount++;
        }
    }
};

GameOfLifeEngine.prototype.GetRightNode = function (pos) {
    var colPos = pos % this.boardSize;
    if (colPos < this.boardSize - 1) {
        var node = this.nodes[pos + 1];
        if (node != null && node.value == 1) {
            this.nodes[pos].liveNeighbourCount++;
        }
    }
};

GameOfLifeEngine.prototype.GetUpLeftNode = function (pos) {
    var rowPos = Math.floor(pos / this.boardSize);
    var colPos = pos % this.boardSize;
    if (rowPos > 0 && colPos > 0) {
        var node = this.nodes[pos - this.boardSize - 1];
        if (node != null && node.value == 1) {
            this.nodes[pos].liveNeighbourCount++;
        }
    }
};

GameOfLifeEngine.prototype.GetUpRightNode = function (pos) {
    var rowPos = Math.floor(pos / this.boardSize);
    var colPos = pos % this.boardSize;
    if (rowPos > 0 && colPos < this.boardSize - 1) {
        var node = this.nodes[pos - this.boardSize + 1];
        if (node != null && node.value == 1) {
            this.nodes[pos].liveNeighbourCount++;
        }
    }
};

GameOfLifeEngine.prototype.GetDownLeftNode = function (pos) {
    var rowPos = Math.floor(pos / this.boardSize);
    var colPos = pos % this.boardSize;
    if (rowPos < this.boardSize - 1 && colPos > 0) {
        var node = this.nodes[pos + this.boardSize - 1];
        if (node != null && node.value == 1) {
            this.nodes[pos].liveNeighbourCount++;
        }
    }
};

GameOfLifeEngine.prototype.GetDownRightNode = function (pos) {
    var rowPos = Math.floor(pos / this.boardSize);
    var colPos = pos % this.boardSize;
    if (rowPos < this.boardSize - 1 && colPos < this.boardSize - 1) {
        var node = this.nodes[pos + this.boardSize + 1];
        if (node != null && node.value == 1) {
            this.nodes[pos].liveNeighbourCount++;
        }
    }
};

GameOfLifeEngine.prototype.NextGeneration = function () {
    var totalCellNum = this.boardSize * this.boardSize;
    for (var i = 0; i < totalCellNum; i++) {
        var node = this.nodes[i];
        var liveCount = node.liveNeighbourCount;

        // Any live cell with fewer than two live neighbours dies, as if caused by under-population. 
        // Any live cell with two or three live neighbours lives on to the next generation.
        // Any live cell with more than three live neighbours dies, as if by overcrowding.
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

        if (node.value == 1) {
            // Live cell
            if (liveCount < 2 || liveCount > 3) { node.value = 0; }
        }
        else {
            // Dead cell
            if (liveCount == 3) { node.value = 1; }
        }
    }
    this.ProcessNodes();
}

function GameOfLifeNode(value) {
    this.value = value;
    this.liveNeighbourCount = 0;
}
window.onload = function () {
    var startP = document.getElementById('startP');
    var startPage = document.getElementById('startPage');
    var lose = document.getElementById('lose');
    var content = document.getElementById('content');
    var scoreBox = document.getElementById('scoreBox');
    var close = document.getElementById('close');
    var loserScore = document.getElementById('loserScore');
    var startBtn = document.getElementById('startBtn');
    var snakeMove;
    var speed = 200;
    var startGameBool = true;
    var startPaushBool = true;
    init();

    function init() {
        //地图 
        this.mapW = parseInt(getComputedStyle(content).width);
        this.mapH = parseInt(getComputedStyle(content).height);
        this.mapDiv = content;

        //食物
        this.foodW = 20;
        this.foodH = 20;
        this.foodX = 0;
        this.foodY = 0;

        //蛇
        this.snakeW = 20;
        this.snakeH = 20;
        this.snakeBody = [
            [4, 2, "head"],
            [3, 2, 'body'],
            [2, 2, 'body']
        ]

        //游戏属性
        this.direct = 'right';
        this.right = false;
        this.left = false;
        this.up = true;
        this.down = true;
        this.score = 0;
        bindEvent();
    }

    function startGame() {
        startP.style.display = 'block';
        startPage.style.display = 'none';
        scoreBox.innerHTML = 0;
        food();
        snake();
    }

    function food() {
        var food = document.createElement('div');
        food.style.width = this.foodW + 'px';
        food.style.height = this.foodH + 'px';
        food.style.position = 'absolute';
        this.foodX = Math.floor(Math.random() * (this.mapW / 20));
        this.foodY = Math.floor(Math.random() * (this.mapH / 20));
        food.style.left = this.foodX * 20 + 'px';
        food.style.top = this.foodY * 20 + 'px';
        this.mapDiv.appendChild(food).setAttribute("class", "food")
    }

    function snake() {
        for (var i = 0; i < this.snakeBody.length; i++) {
            var snake = document.createElement('div');
            snake.style.width = this.snakeW + 'px';
            snake.style.height = this.snakeH + 'px';
            snake.style.position = 'absolute';
            snake.style.left = this.snakeBody[i][0] * 20 + 'px';
            snake.style.top = this.snakeBody[i][1] * 20 + 'px';
            snake.classList.add(this.snakeBody[i][2]);
            this.mapDiv.appendChild(snake).classList.add('snake');
           
            switch (this.direct) {
                case 'right':
                    break;
                case 'up':
                    snake.style.transform = 'rotate(270deg)';
                    break;
                case 'left':
                    snake.style.transform = 'rotate(180deg)';
                    break;
                case 'down':
                    snake.style.transform = 'rotate(90deg)';
                    break;
                default:
                    break;
            }
        }
    }

    function move() {
        for (var i = this.snakeBody.length - 1; i > 0; i--) {
            this.snakeBody[i][0] = this.snakeBody[i - 1][0];
            this.snakeBody[i][1] = this.snakeBody[i - 1][1];
        }
        switch (this.direct) {
            case 'right':
                this.snakeBody[0][0] += 1;
                break;
            case 'up':
                this.snakeBody[0][1] -= 1;
                break;
            case 'left':
                this.snakeBody[0][0] -= 1;
                break;
            case 'down':
                this.snakeBody[0][1] += 1;
                break;
            default:
                break;
        }
        removeClass('snake');
        snake();
     
        if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
            var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
            var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
            switch (this.direct) {
                case 'right':
                    this.snakeBody.push([snakeEndX + 1, snakeEndY, "body"]);
                    break;
                case 'up':
                    this.snakeBody.push([snakeEndX, snakeEndY - 1, "body"]);
                    break;
                case 'left':
                    this.snakeBody.push([snakeEndX - 1, snakeEndY, "body"]);
                    break;
                case 'down':
                    this.snakeBody.push([snakeEndX, snakeEndY + 1, "body"]);
                    break;
                default:
                    break;
            }
            this.score++;    
            scoreBox.innerHTML = this.score;
            removeClass('food');
            food();
        }
        if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
            reloadGame();
        }
        if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
            reloadGame();
        }
        var snakeHX = this.snakeBody[0][0];
        var snakeHY = this.snakeBody[0][1];
        for (var i = 1; i < this.snakeBody.length; i++) {
            if (snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]) {
                reloadGame();
            }
        }
    }

    function reloadGame() {
        removeClass('snake');
        removeClass('food');
        clearInterval(snakeMove);
        this.snakeBody = [
            [4, 2, "head"],
            [3, 2, 'body'],
            [2, 2, 'body']
        ]
        this.direct = 'right';
        this.right = false;
        this.left = false;
        this.up = true;
        this.down = true;

        lose.style.display = 'block';
        loserScore.innerHTML = this.score;
        this.score = 0;
        startGameBool = true;
        startPaushBool = true;
    }

    function removeClass(className) {
        var ele = document.getElementsByClassName(className);
        while (ele.length > 0) {
            ele[0].parentNode.removeChild(ele[0]);
        }
    }

    function setDerict(code) {
        switch (code) {
            case 37:
                if (this.left) {
                    this.direct = 'left';
                    this.left = false;
                    this.right = false;
                    this.up = true;
                    this.down = true;
                }
                break;
            case 38:
                if (this.up) {
                    this.direct = 'up';
                    this.left = true;
                    this.right = true;
                    this.up = false;
                    this.down = false;
                }
                break;
            case 39:
                if (this.right) {
                    this.direct = 'right';
                    this.left = false;
                    this.right = false;
                    this.up = true;
                    this.down = true;
                }
                break;
            case 40:
                if (this.down) {
                    this.direct = 'down';
                    this.left = true;
                    this.right = true;
                    this.up = false;
                    this.down = false;
                }
                break;
            default:
                break;
        }
    }

    function bindEvent() {
        document.onkeydown = function (e) {
            var code = e.keyCode;
            setDerict(code);
        }
        close.onclick = function () {
            lose.style.display = 'none';
            startP.setAttribute('src', "img/start.png");
            //scoreBox.innerHTML = 0;
        }
        startBtn.onclick = function () {
            startAndPaush();
        }
        startP.onclick = function () {
            startAndPaush();
        }
    }

    function startAndPaush() {
        if (startPaushBool) {
            if (startGameBool) {
                startGame();
                startGameBool = false;
            }
            startP.setAttribute('src', 'img/pause.png');
            document.onkeydown = function (e) {
                var code = e.keyCode;
                setDerict(code);
            }
            snakeMove = setInterval(function () {
                move()
            }, speed);
            bindEvent();
            startPaushBool = false;
        } else {
            startP.setAttribute('src', "img/start.png");
            clearInterval(snakeMove);
            scoreBox.innerHTML = 0;
            document.onkeydown = function (e) {
                e.returnValue = false;
                return false;
            };
            startPaushBool = true;
        }
    }
}
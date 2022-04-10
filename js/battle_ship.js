var view = {
	displayMessage: function (msg) {
		var messageArea = document.getElementById("battleMessage");
		messageArea.innerHTML = msg;
	},

	displayMiss: function (location) {
		var missCell = document.getElementById(location);
		missCell.setAttribute("class", "miss");
	},

	displayShip: function (location) {
		judgeId = 'column' + location;
		// console.info(judgeId);
		var shipCell = document.getElementById(judgeId);
		// console.info(shipCell);
		if (shipCell != null) {
			shipCell.setAttribute("class", "hit");
		} else {
			console.warn('没有找到该单元格');
		}
	}

};


var model = {
	boardSize: 7,
	shipTotalNum: 2,
	sankNum: 0,
	shipLength: 3,
	ships: [
		{
			locations: ['11', '12', '13'],
			hits: [0, 0, 1]  // 0 -- 未被击中
		},
		{
			locations: ['33', '43', '53'],
			hits: [1, 0, 1]  // 1 -- 击中
		},

	],

	isSank: function(ship) {
		// 注意判断数组相等的方法
		if (ship.hits.toString() == [1, 1, 1].toString()) {
			// console.log('这艘船被击沉了！');
			view.displayMessage('这艘船被击沉了！');

			return true;
		}

		view.displayMessage('船还漂在那里')
		return false;

	},

	hit: function(location) {
		for (var i = 0; i < this.ships.length; i++) {
			var ship = this.ships[i];
			console.log('当前是第' + (i+1) + '艘船');

			var guessIndex = ship.locations.indexOf(location);
			if (guessIndex != -1) {
				console.log('命中索引是 ' + guessIndex);
				view.displayMessage('命中目标');
				ship.hits[guessIndex] = 1;
				console.log('飞船命中数据 ' + ship.hits);
				view.displayShip(location);  // Bug01 -- 传位置参数，而不是索引

				return true;
			}

			console.log('该船没有命中')
		}
		console.warn('全部打偏了');
		view.displayMessage('全部打偏了！');
		return false;

	},

	generateRandomLocations: function() {
		// 先随机确定水平还是垂直方向
		var direction = Math.floor(Math.random() * 2);
		console.log('direction ' + direction);

		var startX, startY
		if (direction == 0) {
		// 水平方向的飞船
			startX = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			startY = Math.floor(Math.random() * this.boardSize);
		} else {
			// 垂直方向的飞船
			startX = Math.floor(Math.random() * this.boardSize);
			startY = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		}

		var generateLocations = [];
		for(var j=0; j<this.shipLength; j++) {
			if (direction == 0) {
				generateLocations.push((startX+j) + '' + startY);
			} 
			else {
				generateLocations.push(startX + '' + (startY+j));
			}
				
			// console.log('第' + (i+1) + '艘船的位置 ' + generateLocations);
		};
		console.log('新生成的飞船位置 ' + generateLocations)
		return generateLocations;

	},

	generateShip: function() {
		// 动态生成飞船
		for (var i=0; i<this.shipTotalNum; i++) {
			console.log('生成第 ' + (i+1) + ' 艘飞船');
			
			this.ships[i].locations = this.generateRandomLocations();
		}
	}
}


var controller = {
	rowLetters: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
	guesses: 0,

	processGuess: function(location){
		if (location) {
			this.guesses += 1;
			console.log('一共开火' + this.guesses + '次了')
			var hitResult = model.hit(location);
			if(hitResult){
				// 判断是否击沉一艘
				if (model.isSank(model.ships[0])){
					model.sankNum += 1;
					console.log('第一艘船已经被击沉了，加油！');
					view.displayMessage('第一艘船已经被击沉了，加油！')
				};

				if (model.isSank(model.ships[1])){
					model.sankNum += 1
					console.log('第二艘船已经被击沉了，继续！')
				};

				console.log('当前击沉了 ' + model.sankNum + '艘船');
				if (model.sankNum >= model.shipTotalNum) {
					console.log('全部击沉，胜利！！！');
					alert('全部击沉，胜利！！！')
				} else {
					view.displayMessage('还有未击沉的船只，继续加油！');
				}
			} 
		}
	}
}


function parseGuess(guessValue) {
	// 用户输入的内容转化为位置
	if (guessValue === null || guessValue.length !== 2) {
		alert('输入长度非法');
	} else {
			// 转化为行字符
		rowLetter = guessValue[0].toUpperCase();
		columnDigit = guessValue[1]
		if (controller.rowLetters.indexOf(rowLetter) == -1) {
				alert('行字母输入错误');
				return null;
		} 

		if (isNaN(columnDigit) || columnDigit < 0 || columnDigit > model.boardSize) {
				alert('列字符输入错误');
				return null;
		}

		var rv = controller.rowLetters.indexOf(rowLetter) + columnDigit;
		console.log('转化后的位置 ' + rv);
			
		return rv;

	}
		
		return null;
}


var fireButton = document.getElementById('fire-button');
var guessElement = document.getElementById('guess');


window.onload = function() {
	fireButton.onclick = handleFireButton;
	guessElement.onkeypress = handleKeyEnter;
	model.generateShip();

}


function handleKeyEnter(event) {
	if (event.keyCode === 13) {
		console.log('按下了回车键');
		fireButton.onclick();
		return false;
	}
}


function handleFireButton() {
	var guessValue = guessElement.value;
	if (guessValue) {
		console.log('客户输入的内容 ' + guessValue);
		var location = parseGuess(guessValue);

		if (location) {
			controller.processGuess(location);
		}
		
		guessElement.value = '';
	}
}



















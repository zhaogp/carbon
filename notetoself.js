window.onload = init;


function init() {
	
	// 点击添加按钮，从页面添加待办事项
	// var addStickyButton = document.getElementsByName('input_button');
	// addStickyButton.onclick = saveStickyLocal;



	for (var i = 0; i < localStorage.length; i++) {
		key = localStorage.key(i);
		console.log(key);
		value = localStorage.getItem(key);

		// 删除空元素
		if (value == '') {
			localStorage.removeItem(key);
		} 
		// 只取待办事项元素
		else if (key.substring(0, 6) == 'sticky') {
			addStickyToDOM(value)
		}

	}

	// 删除值相同的元素
	removeDuplicatesLocal();
	
	var size = localStorage.length;
	console.log('本地一共存储了' + size + '个元素');

	// 显示所有本地存储的元素
	

}


function saveStickyLocal() {
	console.log('点击添加按钮');
	var key = 'sticky_' + localStorage.length
	console.log(key)
	var inputElement = document.getElementById('input01');
	var inputText = inputElement.value;

	// 如果待办事项已经添加过，则不重复添加
	/* 取到的是一个对象，需要的是一个数组
	const values = {...localStorage}
	console.log(values);
	*/
	var allValues = allStorageValues();
	if (allValues.includes(inputText)) {
		alert('已经添加过了');
		return;
	}



	if (inputText)
	console.log(inputText)
	localStorage.setItem(key, inputText);
	addStickyToDOM(inputText);

}


function addStickyToDOM(value) {
	// 创建元素
	var li = document.createElement('li');
	var span = document.createElement('span')
	span.setAttribute('class', 'sticky');
	span.innerText = value;

	// 添加到已有ul元素
	var stickies = document.getElementById('stickies');
	li.appendChild(span);
	stickies.appendChild(li);
}


function allStorageValues() {
	var rv = [];
	var keys = Object.keys(localStorage);
	console.log(keys);
	var i = keys.length;

	while(i--) {
		rv.push(localStorage.getItem(keys[i]))
	}

	console.log(rv);
	return rv
}


// 查找数组中重复元素的几种方法
// filter()
function removeDuplicates01(arr) {
	return filter((item, index) => arr.indexOf(item) === index);
}


// Set()

function removeDuplicates02(arr) {
	return [...new Set(arr)];
}

// forEach()
function removeDuplicates03(arr) {
	rv = [];
	arr.forEach(ele => {
		if (!rv.includes(ele)) {
			rv.push(ele);
		}
	})

	return rv;

}


// reduce()
function removeDuplicates04(arr) {
	var rv = arr.reduce(function (acc, curr) {
		if (!acc.includes(curr)) {
			acc.push(curr);
		}
		return acc;
	}, []);

	return rv;
}


// 从本地存储中删除值相同的元素
function removeDuplicatesLocal() {
	values = [];

	for (var i = 0; i < localStorage.length; i++) {
		key = localStorage.key(i);
		value = localStorage.getItem(key);
		if (!values.includes(value)) {
			values.push(value)
		}else {
			console.log('删除重复元素: ' + value);
			localStorage.removeItem(key);
		}
	}
	console.log(values);
}










































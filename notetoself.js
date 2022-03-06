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
		} else if (key.substring(0, 6) == 'sticky') {
			addStickyToDOM(value)
		}

	}
	
	var size = localStorage.length;
	console.log('本地一共存储了' + size + '个元素');

	// 显示所有本地存储的元素
	

}


function saveStickyLocal() {
	console.log('添加按钮被点击');
	var key = 'sticky_' + localStorage.length
	console.log(key)
	var inputElement = document.getElementById('input01');
	var inputText = inputElement.value;
	console.log(inputText)
	localStorage.setItem(key, inputText);
	addStickyToDOM(inputText);
	// 清空输入框
	// stickyElement.clear();

}


function addStickyToDOM(value) {
	// 创建元素
	var li = document.createElement('li');
	li.innerText = value;

	// 添加到已有ul元素
	var stickies = document.getElementById('stickies');
	stickies.appendChild(li);
	window.reload();
}
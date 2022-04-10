window.onload = function() {
	var worker = new Worker('../js/worker.js');

	worker.postMessage('ping');

	worker.onmessage = function (event) {
		var message = event.data;
		document.getElementById('worker') = message;
	}
}
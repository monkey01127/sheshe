function Toast(amsg, showDuration) {
	//默认显示3秒钟
	if (!showDuration) {
		showDuration = 3;
	}
	//如果当前有显示内容，则放入队列排队
	if (window.Toast_showing) {
		if (!window.Toast_list) {
			window.Toast_list = [];
		}
		window.Toast_list.push(amsg);
		return;
	} else {
		if (!amsg) {
			if (!window.Toast_list || window.Toast_list.length == 0) {
				return;
			}
			amsg = window.Toast_list.shift();
		}
	}
	window.Toast_showing = true;
	var elem = document.getElementById("elem");
	if (!elem) {
		elem = document.createElement("div");
		elem.id = "_panel_pageToast";
		elem.className = "KUI-Toast";
	}
	elem.innerHTML = amsg;
	document.body.appendChild(elem);
	setTimeout(function() {
		elem.classList.add("KUI-Toast-show");
		setTimeout(function() {
			elem.classList.add("KUI-Toast-hide");
			window.Toast_showing = false;
			//递归调用一次，取队列中的消息来显示
			Toast();
		}, showDuration * 1000)
	}, 20);
}
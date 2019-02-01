//封装$$
function $$(id){
	return document.getElementById(id);
}

/*添加本地缓存数据*/
function setCache(name, value) {
    if ('object' === typeof name) {
        $.each(name, function(n,v){
            localStorage.setItem(n, v);
        });
        return;
    }
    return localStorage.setItem(name, value);
}

/*获取本地缓存数据*/
function getCache(name) {
    return localStorage.getItem(name);
} 

/*报错，和成功提示*/
function Toast(amsg, showDuration) {
	//默认显示2秒钟
	if (!showDuration) {
		showDuration = 2;
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

/*页面路径获取参数信息*/
function getParams(key, defaultvalue) {
	if (!window._params) {
		window._params = [];
		var query = document.location.href.split("?");
		if (query.length > 1) {
			query = query[1];
			var paramItems = query.split("&");
			for (var i = 0; i < paramItems.length; i++) {
				var item = paramItems[i].split("=");
				window._params[item[0]] = decodeURIComponent(item[1]);
			}
		}
	}
	return window._params[key] || defaultvalue;
}

/*生成随机数的方法*/
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

function is_weixn(){  
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
        return true;  
    } else { 
    	$("body").text("请在微信中打开");
        return false;  
    }  
}  
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

//滚动条在Y轴上的滚动距离
function getScrollTop(){
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}

//浏览器视口的高度
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

//文档的总高度
function getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}


$(window).scroll(function(){
　　var scrollTop = $(this).scrollTop();
　　var scrollHeight = $(document).height();
　　var windowHeight = $(this).height();
　　if(scrollTop + windowHeight == scrollHeight){
　　　　console.log("已经到最底部了！");
　　}
});

/*和Ios ,and交互的接口函数*/
function linkIosAndAndrow(obj){
	var u = navigator.userAgent;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 alert('是否是Android：'+isAndroid); alert('是否是iOS：'+isiOS);
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
	
	var json_str=JSON.stringify(obj);
	if(isAndroid){	//安卓
		//window.scrollCallback.onScrollCallback(json_str);
	}else if(isiOS){ //ios
		//onScrollCallback(json_str);
	}
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
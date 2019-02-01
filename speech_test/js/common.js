setTimeout(function() {
	document.getElementsByTagName('body')[0].style.minHeight = window.innerHeight + 'px';
}, 20);

/*如果页面内容不超过一页,则固定底部页脚*/
/*当可视区域小于页面的实际高度时，判定为出现滚动条*/
function fixedFooter(){
	var foot_height=0;
	foot_height=$('.footer').outerHeight(true);
	/*document.documentElement.clientHeight 页面高度*/
	/*document.documentElement.offsetHeight 内容高度*/
	var page_height=document.documentElement.clientHeight;
	var con_height=document.documentElement.offsetHeight;

	console.log($(".footer").height());
	con_height = con_height + $(".footer").height();
	console.log(page_height);
	console.log(con_height);
	if (page_height > con_height){
		$('.footer').addClass('footer-fixed');
	}
	$(".footer").show();
}

/*页面路径获取参数信息*/
function getParams(key, defaultvalue) {
	if (!window._params) {
		window._params = [];
		var query = document.location.href.split("?");
		if (query.length > 1) {
			query = query[1];
			var paramItems = query.split("&");
			console.log(paramItems);
			for (var i = 0; i < paramItems.length; i++) {
				var item = paramItems[i].split("=");
				window._params[item[0]] = decodeURIComponent(item[1]);
			}
		}
	}
	return window._params[key] || defaultvalue;
}

function is_weixn(){  
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
        return true;  
    } else { 
    	//mui.toast("请在微信中打开");
       //return false; 
         return false; 
    }  
}  

/*添加本地缓存数据*/
function setCache(name, value) {
	if('object' === typeof name) {
		$.each(name, function(n, v) {
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

/*弹框的显示和隐藏*/
function partIn(){
	$(".wrap-pop,.pop-bg").fadeIn();
	$(".wrap-pop2").hide();
}

function partOut(){
	$(".wrap-pop,.pop-bg").fadeOut();
}

/*弹框的显示和隐藏*/
function partIn2(){
	$(".wrap-pop2,.pop-bg").fadeIn();
}

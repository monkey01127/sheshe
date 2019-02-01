/*把心事内容放在本地缓存里，和居中，居左样式放在缓存里*/
var mood_content="moond_content";
var text_style="text_style";

//封装$$
function $$(id){
	return document.getElementById(id);
}

/*获取当前系统时间*/
function getSystemTime(){
	$(".current-time").text(CurentTime());
}

/*定位內容輸入的焦點位置*/
function set_focus(obj){
    el=obj;
    //el=el[0];  //jquery 对象转dom对象
    el.focus();
    if($.support.msie)
    {
        var range = document.selection.createRange();
        this.last = range;
        range.moveToElementText(el);
        range.select();
        document.selection.empty(); //取消选中
    }
    else
    {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

/*显示缓存*/
function showCache(){
	release_text_status = getCache(text_style);
	if(!release_text_status){
		release_text_status = 1;
	}
	old_content = getCache(mood_content);
	var moond_con=getCache(mood_content);
	if($.trim(moond_con)){	//只有当有值的时候，才去代替原来的；
		$("#content").html(moond_con);
		$("#target").val(moond_con);
	}
}

/*保存缓存*/
function saveCache(){                                                             
	var content = $("#content").text();
	var contentHtml=$("#content").html();
	if(content!="写下我的心事"){
		setCache(mood_content, (contentHtml=='<br>')?' ':contentHtml);
	}
	console.log(getCache(mood_content));
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

/*保存成功提示*/
function successTips(mgs,stopTime){
	var bg_class='';
	if(mgs.indexOf("网络不佳")>0){
		bg_class="red-background";
	}
	
	$("body").append('<div class="success-tips '+bg_class+'">'+mgs+'</div>');
	$(".success-tips").addClass("pt-page-moveFromTop");
	
	if (!stopTime) {
		stopTime = 1.5;
	}
	
	setTimeout(function() {
		$(".success-tips").addClass("pt-page-moveToTop");
	},stopTime*1000);
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

/*和Ios ,and交互的接口函数*/
function linkIosAndAndrow(str_param){
	var json_str='back';
	if(!str_param){
		json_str='back';
	}else if(type==2){
		json_str=str_param;
	}
	var u = navigator.userAgent;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 alert('是否是Android：'+isAndroid); alert('是否是iOS：'+isiOS);
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
	if(isAndroid){	//安卓
		if(app_version == '3.2.0'){
			window.finish.onClickFinish();
		}else{
			window.finish.onClickFinish(json_str);
		}
	}else if(isiOS){ //ios
		if(app_version == '3.2.0'){
			onClickFinish();
		}else{
			onClickFinish(json_str);
		}
	}
}

function clearImgClass(){
	$("#content img").attr("class","");
}

/*确认信息弹框*/
function popDialog(popObj) {
	var title = popObj.title;
	var msg =  popObj.msg;
	var btn_cancle_txt =  popObj.btn_cancle_txt;
	var btn_sure_txt =  popObj.btn_sure_txt;
	
	var dialog_html,msg_html,btn_html;
	var title_html='';
	var pog_bg_html='<div style="display:none;" class="pop-nomal-bg"></div>';
	console.log(title);
	if(!title){
		title='标题';
	}else{
		title_html='<div class="p-title">'+title+'</div>';
	}
	
	if(!msg){
		msg="内容";
	}else{
		msg_html='<div class="p-info">'+msg+'</div>';
	}
	
	console.log(btn_cancle_txt);
	if(!btn_cancle_txt){
		btn_cancle_txt='取消';
	}else{
		btn_html='<button class="win50 fl close" data-id="1" onclick="cancleOperate(this);" type="'+popObj.type+'">'+btn_cancle_txt+'</button>';
	}
	
	if(!btn_sure_txt){
		btn_sure_txt="取消";
	}else{
		if(btn_html){
			btn_html=btn_html+'<span class="green-vertical-line"></span>';
		}
		btn_html=btn_html+'<button class="win50 fr" data-id="1" onclick="sureOperate(this);" type="'+popObj.type+'" >'+btn_sure_txt+'</button>';
	}
	
	btn_html='<div class="bt-list-bar">'+btn_html+'</div>';
	
	dialog_html=title_html+msg_html+btn_html;
	
	var elem = document.getElementById("elem");
	if (!elem) {
		elem = document.createElement("div");
		elem.className = "pop-nomal-dialog";
	}
	elem.innerHTML = dialog_html;
	
	document.body.appendChild(elem);
	$("body").append(pog_bg_html);
	$(".pop-nomal-dialog,.pop-nomal-bg").fadeIn();
}

/*弹框的取消操作*/
function cancleOperate(obj){
	obj=$(obj);
	var type=obj.attr("type");
	if(type=="save"){	//如果是X是否保存弹框，不保存操作
		$(".pop-nomal-dialog,.pop-nomal-bg").fadeOut();
		linkIosAndAndrow();
	}else if(type=="del"){	//如果删除心事，不删除操作
		$(".pop-nomal-dialog,.pop-nomal-bg").fadeOut();
	}
}

/*弹框的确认操作*/
function sureOperate(obj){
	obj=$(obj);
	var type=obj.attr("type");
	if(type=="save"){	//如果是X是否保存弹框，保存操作
		saveMood(obj);
		setTimeout(function(){
			linkIosAndAndrow("edit");
		},2000);
	}else if(type=="del"){	//如果删除心事，不删除操作
		delMood();
	}
}
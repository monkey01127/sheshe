function setPersonInfo(){
	var uid=getParams("uid");
	var uname=getParams("uname");
	var uheader=getParams("uheader");
	if(!uid){
		uid="她小鱼";
		$(".login-btn").show();
		$(".uname").html("她小鱼");
		//$(".f-small").html("她她ID:"+uid);
		return;
	}
	$(".user_header").attr("src",uheader);
	$(".login-btn").hide();
	$(".uname").text(uname).show();
	$(".f-small").html("她她ID:"+uid);
	$(".nickname").text(uname);
}

function getList(){
	$.ajax({
		type: "get",
		url: recharge_list_url,
		data: {
			
		},
		dataType: "json",
		headers: {
			'X-Requested-With': "XMLHttpRequest"
		},
		xhrFields: {
			withCredentials: true
		},
		success: function(res){
        	if(res.code==200){
        		_.each(res.data, renderList);
        		set_highlight();	/*设置高亮和样式*/
        		$("#loading").hide();
        	}else{
        		Toast(res.data.Error);
        	}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

function closeDialog(){
	$(".pop-dialog,.pop-bg,.success-dialog").fadeOut();
}

/*渲染列表*/
function renderList(list){
	if(list.recommend == 1){
		list.active_icon_html = "<span class='icon_zeng'></span>";
	}else if(list.recommend == 0 || !list.recommend){
		list.active_icon_html = '';
	}
	if(!list.title || !list.ta_beans_custom){
		list.title = '';
		list.ta_beans_custom = '';
	}
	if(!list.ta_beans_standard){
		if(list.ta_beans){
			list.ta_beans_standard  = list.ta_beans;
		}else if(!list.ta_beans){
			list.ta_beans_standard  = '';
		}
	}
	list.zeng_word = set_zeng_txt(list.title,list.ta_beans_custom );
	var ta_money = list.ta_rmb.toString();
	if(ta_money.indexOf('.')>0){
		list.ta_rmb = ta_money.split(".")[0];
	}else{
		list.ta_rmb = ta_money  ;
	}
	$(".list ul").append(list_tpl(list));
}

/*设置赠送语*/
function set_zeng_txt(txt,nums){
	if(txt&&nums){
		if(document.body.clientWidth < 345){
			if(txt.length > 6){
				txt = txt.substring(0,6)+'...';
			}
		}
		return txt+"&nbsp;"+nums;
	}else{
		return '';
	}
}

/*设置高亮和样式*/
function set_highlight(){
	$(".icon_zeng").parent("li").addClass("active");
	$(".icon_zeng").parents("ul").addClass("ul-recommond");
}

var pay_pramlists={};
function getRechargeInfo(){
	$(".pop-dialog,.pop-bg").hide();
	$.ajax({
		type: "post",
		url: to_recharge_url,
		headers: {
			'X-Requested-With': "XMLHttpRequest"
		},
		xhrFields: {
			withCredentials: true
		},
		data: {
			"uid":getCache("uid"),
			"recharge_id":$(".topay").attr("recharge_id"),
			"pay_channel":"weixinpay_mp"
		},
		dataType: "json",
		success: function(res){
			var result=res;
        	if(result.code==200){
        		pay_pramlists=result.data.pay_channel_data;
        		weixinpay();
        	}else{
        		Toast(res.error);
        	}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

function weixinpay(){
	if (typeof WeixinJSBridge == "undefined"){
	   if( document.addEventListener ){
	       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	   }else if (document.attachEvent){
	       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
	       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	   }
	}else{
	   onBridgeReady();
	}
}

function onBridgeReady(){
	var data=pay_pramlists;
   	WeixinJSBridge.invoke(
       'getBrandWCPayRequest',data,
       function(res){ 
       	// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
           if(res.err_msg == "get_brand_wcpay_request:ok") {
           		/*充值成功的提示*/
				$(".success-dialog,.pop-bg").show();
           }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
           		Toast("取消充值了");
           }
       }
   	); 
}
	
var list_tpl = _.template($("#list").text());
$(document).ready(function() {
	is_weixn();
	/*初始化个人信息部分*/
	setPersonInfo();
	/*读取列表部分*/
	getList();
	
	$("body").on('touchend', ".list li .pay-btn", function(e) {
		var uid=getParams("uid");
		if(uid){
			$(".pop-dialog,.pop-bg").fadeIn();
			var nums=$(this).attr("nums");
			var money=$(this).attr("money");
			$("#allMoney").text(money);
			$(".dou-nums").text(nums);
			var _this=$(this);
		$(".topay").attr("recharge_id",_this.attr("recharge_id"));
		}else{
			Toast("您还没有登录,将自动为您跳转到登录页！,");
			setTimeout(function(){
				location.href="login.html";
			},2000);
		}
	});
	
	$("body").on('touchend', ".close", function(e) {
		closeDialog();
	});
	
	$("body").on('touchstart', ".login-btn", function(e) {
		location.href="login.html"
	});
	
	$("body").on('touchstart', ".topay", function(e) {
			getRechargeInfo();
	});
});
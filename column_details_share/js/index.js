/*写固定参数，或者获取当前数据*/
var uid =  getParams("uid");
var column_id = getParams("column_id");
var direction = "";

$(document).ready(function() {
	get_share_params();
	getDetail(uid, column_id);
	/*点击跳转*/
	$("body").on("touchstart",".to-link",function(){
		/*ios下载路径*/
    	var linkToSrc="http://a.app.qq.com/o/simple.jsp?pkgname=com.lestata.tata";
		window.location.href = linkToSrc;
	});
});

/*渲染中间标签部分,例如:情感;*/
var page_tpl = _.template($("#page").text());
var li_tpl = _.template($("#li").text());

/*调接口,显示详情内容*/
function getDetail(uid, column_id ,direction) {
	$.ajax({
		type: "get",
		url: detail_url,
		data: {
			"uid": uid,
			"column_id": column_id,
			"direction": direction
		},
		dataType: "json",
		headers: {
			'X-Requested-With': "XMLHttpRequest"
		},
		xhrFields: {
			withCredentials: true
		},
		success: function(res) {
			if(res.code == 200) {
				/*传递值给微信分享接口*/
				wx_share(res.data.info);
				
				res.data.info.article_type="word";
				
				if(res.data.info.type=="text"){
					res.data.info.article_type="word";
				} else if(res.data.info.type == "image" || res.data.info.title.trim().length == 0) {
					res.data.info.article_type="pic";
				}else{
					res.data.info.article_type="word";
				}
				
				/*设置返回值的content数据*/
				res.data.info.content=setContent(res.data.info.content);
				$(".container").html(page_tpl(res.data.info));
				
				/*加载标签*/
				var tag_label=res.data.info.tag_label;
				$('.page').find(".tag-list ul").append(li_tpl(tag_label));
			} else {
				Toast(res.error);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

function setContent(obj){
	var con_arr=obj.split('</p>');
	var flg=" class='text-padding' ";
	var no_flg=" class='no-padding' ";
	var str1,str2;
	var loog_str='';
	var fl_str='';
	for(var i=0; i<con_arr.length-1; i++){ 
		con_arr[i]=con_arr[i]+'</p>';
		if(con_arr[i].indexOf("img")<0 && con_arr[i].indexOf("iframe")<0){
			if(con_arr[i].length==12 || con_arr[i].length==13){
				if(con_arr[i].indexOf("<br/>")==3||con_arr[i].indexOf("&nbsp")==3){
					fl_str=no_flg;
				}
			}else{
				fl_str=flg;
			}
			str1=con_arr[i].substring(0,2)
			str2=con_arr[i].substring(2,con_arr[i].length);
			new_str=str1+fl_str+str2;
			loog_str=loog_str+new_str;
		}else{
			loog_str=loog_str+con_arr[i];
		}
	}
	return loog_str;
}

/*免责申明动画效果*/
function showState(obj){
	var current_scroll=$(window).scrollTop();
	var obj_parents=$(obj).parents(".free-statement");
	if(obj_parents.attr("class").indexOf("menu-open")>0){
		obj_parents.removeClass("menu-open");
		$(".state-con").fadeOut();
		current_scroll=current_scroll-$(".state-con").outerHeight();
		$('html,body').animate({ scrollTop:current_scroll },600);	
	}else{
		obj_parents.addClass("menu-open");
		$(".state-con").fadeIn();
		current_scroll=current_scroll+$(".state-con").outerHeight();
		$('html,body').animate({ scrollTop:current_scroll },600);		
	}
}


/*分享*/
function get_share_params(){
	$.ajax({
		type: "post",
		url: weixin_share_url,
		data: {},
		dataType: "json",
		/*headers: {
			'X-Requested-With': "XMLHttpRequest"
		},*/
		xhrFields: {
			withCredentials: true
		},
		success: function(res) {
			to_config(res);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

/*通过config接口注入权限验证配置*/
function to_config(data){
	wx.config({
	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: data.appId, // 必填，公众号的唯一标识
	    timestamp: data.timestamp, // 必填，生成签名的时间戳
	    nonceStr: data.nonceStr, // 必填，生成签名的随机串
	    signature: data.signature,// 必填，签名，见附录1
	    jsApiList: [
		    'checkJsApi',
	        'onMenuShareTimeline',
	        'onMenuShareAppMessage',
	        'onMenuShareQQ',
	        'onMenuShareWeibo',
	        'onMenuShareQZone'
	    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	
	wx.error(function(res){
	    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	});
	
	/*判断当前客户端版本是否支持指定JS接口*/
	wx.checkJsApi({
	    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	    success: function(res) {
	    		/*alert("判断当前客户端版本是否支持指定JS接口:"+res);*/
	        // 以键值对的形式返回，可用的api值true，不可用为false
	        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
	    }
	}); 
}

function wx_share(share_info){
	var data = share_info;
	data.desc = data.intro.replace(/<[^>]+>/g,"");
	data.link = document.location.href;
	data.img_url  = data.front_cover;
	
	/*通过ready接口处理成功验证*/
	wx.ready(function(){
	/*获取“分享到朋友圈”按钮点击状态及自定义分享内容接口*/
		wx.onMenuShareTimeline({
		    title: data.title, // 分享标题
		    link: data.link, // 分享链接
		    imgUrl: data.img_url, // 分享图标
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
		
		/*获取“分享给朋友”按钮点击状态及自定义分享内容接口*/
		wx.onMenuShareAppMessage({
		    title: data.title, // 分享标题
		    desc: data.desc, // 分享描述
		    link: data.link, // 分享链接
		    imgUrl: data.img_url, // 分享图标
		    type: '', // 分享类型,music、video或link，不填默认为link
		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
		
		
		/*获取“分享到QQ”按钮点击状态及自定义分享内容接口*/
		wx.onMenuShareQQ({
		    title: data.title, // 分享标题
		    desc: data.desc, // 分享描述
		    link: data.link, // 分享链接
		    imgUrl: data.img_url, // 分享图标
		    success: function () { 
		       // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		       // 用户取消分享后执行的回调函数
		    }
		});
		
		/*获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口*/
		wx.onMenuShareWeibo({
		    title: data.title, // 分享标题
		    desc: data.desc, // 分享描述
		    link: data.link, // 分享链接
		    imgUrl: data.img_url, // 分享图标
		    success: function () { 
		       // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
			
		/*获取“分享到QQ空间”按钮点击状态及自定义分享内容接口*/
		wx.onMenuShareQZone({
		    title: data.title, // 分享标题
		    desc: data.desc, // 分享描述
		    link: data.link, // 分享链接
		    imgUrl: data.img_url, // 分享图标
		    success: function () { 
		       // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
	});
}






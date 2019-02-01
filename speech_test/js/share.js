//get_record_score_test();
/*获取录音评分*/
function get_record_score_test(){
	var score_url ='http://admin-test.lestata.com/index.php/Wx/get_sun?media_id=1237378768e7q8e7r8qwesafdasdfasdfaxss111&text=Knowledge+can+change+your+fate+and+English+can+accomplish+you+fature&device_id=0.2358191093834301';
	$.ajax({
		type: "get",
		//url: 'js/demo.json',
		url: score_url,
		data: {
		},
		dataType: "json",
		/*headers: {
			'X-Requested-With': "XMLHttpRequest"
		},*/
		xhrFields: {
			withCredentials: true
		},
		success: function(res){
			return;
        //	window.location.href = "result.html?score=" + parseInt(res.data.lines[0].score);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}


/*获取微信公众号分享参数*/
get_share_params();
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
			console.log("可能网络不佳 ＞﹏＜ 请小主重试一下");
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
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice'
      ]// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	
	wx.error(function(res){
	    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	});
	
	/*判断当前客户端版本是否支持指定JS接口*/
	wx.checkJsApi({
	    jsApiList: [
	    'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo',
        'onMenuShareQZone',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	    success: function(res) {
	    		/*alert("判断当前客户端版本是否支持指定JS接口:"+res);*/
	        // 以键值对的形式返回，可用的api值true，不可用为false
	        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"};
	       
	    }
	}); 
	
	/*通过ready接口处理成功验证*/
	wx.ready(function(){
		/*获取“分享到朋友圈”按钮点击状态及自定义分享内容接口*/
		var data={};
		data.title = "快来测测你的外星人语吧~";
		data.desc = "华尔街口语测评来啦，免费的约不约?";
		data.link = "http://" + window.location.host +'/H5/speech_test/auth_index.html';
		data.img_url  = "http://" + window.location.host +'/H5/speech_test/img/w_logo.png';
		console.log(data);
		wx_share(data);
	})
}




function wx_share(data){
	wx.onMenuShareTimeline({
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
}
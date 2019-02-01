function share(){
	
}

share.prototype.constructor = share;
/*获取微信公众号分享参数*/
share.prototype.get_share_params = function(){
	var _this = this;
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
			_this.to_config(res);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

/*通过config接口注入权限验证配置*/
share.prototype.to_config  = function(data){
	var _this = this;
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
		data.link = "http://" + window.location.host +'/H5/speech_test/index.html';
		//data.link = "http://" + window.location.host +'/H5/speech_test/auth_index.html';
		data.img_url  = "http://" + window.location.host +'/H5/speech_test/img/w_logo.png';
		_this.wx_share(data);
		add_record_class();
	})
}

share.prototype.wx_share  = function (data){
	console.log(data);
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

var localId = '';	//本地录音id
var myVideo = document.getElementById("recordAudio");	//音频

window.onload = function(){
	fixedFooter();
	
	var share1 = new share();
	share1.get_share_params();
	/*localStorage.clear();
	mui.toast(getCache('FIRST_VISIT'));
	$('.step').css('display','block');
	first_record_tips();
	return;*/
	if(getCache('FIRST_VISITED')!= 1){
		$('.step').css('display','block');
		setCache('FIRST_VISITED',1);
		first_record_tips();
	}else{
		$('.step,.pop-bg,.icon_record_tips,.wrap-tips-btn').css('display','none');
	}
}

var next_offset_top = 0;
var record_offset_top = 0;

function first_record_tips(){
	record_offset_top = $(".wrap-btn").offset().top;
	
	$('.pop-bg').css('display','block');
	$('.pop-bg').addClass('record-tips-bg');
	$('.icon_record_tips,.step1 .img-step1').fadeIn();
	$('.step1').css('top',record_offset_top-40);
	$('.step1').css('opacity',1);
	
	$('.img-step1.wrap-tips-btn').css('display','block');
	next_offset_top = $(".img-step1 .btn-next").offset().top;
	
	/*setTimeout(function(){
		$('.img-step1').fadeOut();
	},2000);
	
	setTimeout(function(){
		$('.step').attr('class','step step2');
		$('.step2').css('top','31%');
		$('.img-step2.wrap-tips-btn').css('display','block');
		$('.img-step2.wrap-tips-btn').css('top',next_offset_top);
	},2500);
	
	setTimeout(function(){
		$('.img-step2').fadeOut();
	},4500);
	
	setTimeout(function(){
		$('.step').attr('class','step step3');
		$('.step3').css('top',record_offset_top-20);
		$('.img-step3.wrap-tips-btn').css('display','block');
		$('.img-step3.wrap-tips-btn').css('top',next_offset_top);
	},5000);*/
	
	/*setTimeout(function(){
		$('.step,.pop-bg,.icon_record_tips').fadeOut();
	},7500);*/
}



var browser = 0;

$(function(){
	
	
	
	var type = getParams('type');
	var user_city = getParams('user_city');
	browser = getParams('browser');
	if(parseInt(browser) == 1){
		partIn2();
		$(".state-list ul li").children(":first").show();
	}
	if(!user_city){
		user_city = 1;
	}
	setCache("CITY_NUM",user_city);
	if(type == 'before'){
		setCache('TYPE','before');
	}else if(type == 'after'){
		setCache('TYPE',type);
	}
	
	/*如果此页面不在微信中打开，则跳转到二维码页面*/
	if(!is_weixn()){
		location.href = 'hej_index_demo_browser.html?type='+getCache('TYPE')+'&user_city='+getCache("CITY_NUM")+'&browser=1';
	}
	
	/*检测是否播放完毕，播放完回复到播放状态*/
	myVideo.addEventListener('ended', function () {  
	    $(".patten-voice").attr("class", "patten-voice");
	    $(".patten-voice").find("span").text("播放原音");
	}, false);
	
	/*原音的切换播放*/
	$("body ").on("touchend ", ".patten-voice", function() {
		var class_name = $(this).attr("class");
		if(class_name.indexOf("onplaying") < 0) {
			myVideo.play();
			$(this).addClass("onplaying");
			$(this).find("span").text("关闭原音");
		} else if(class_name.indexOf("onplaying") > 0) {
			myVideo.pause();
			$(this).removeClass("onplaying");
			$(this).find("span").text("播放原音");
		}
	});
	
		
	/*点击开始录音，出现录音中的状态*/
	/*$("body ").on("touchstart ", ".record-btn ", function(event) {
		event.preventDefault();
		event.stopPropagation();
		timeOutEvent = setTimeout("longPress()",1000);
	});*/
	
	$("body ").on("touchend", ".record-btn", function(event) {
		event.preventDefault();
		event.stopPropagation();
		to_record();
	});
	
	/*点击正在录音，出现停止录音，结束录音*/
	$("body ").on("touchend", ".on-record", function(event) {
		event.preventDefault();
		event.stopPropagation();
		/*setTimeout(function(){*/
			wx.stopRecord({
				success: function(res) {
					if(res.errMsg.indexOf('tooshort') > 0 ){
						if(res.errMsg.indexOf('tooshort') > 0 ){
							mui.toast('录音时间太短了,请重新录音！');
							$(".wrap-btn ").attr("class","wrap-btn record-btn");
						}
					}else{
						localId = res.localId;
						if(localId){
							$('.wrap-btn').attr('localId', localId);
							$(".wrap-btn ").addClass("on-play ");
							$(".wrap-btn ").css("background", "img/icon_play_on.png ");
							$(".wrap-btn ").removeClass("on-record ");
						}
					}
					clearTimeout(t);
				},
				fail: function(res) {
					if(res.errMsg.indexOf('tooshort') > 0 ){
						mui.toast('录音时间太短了,请重新录音！');
						$(".wrap-btn ").attr("class","wrap-btn record-btn");
					}
					clearTimeout(t);
				},
				complete: function(res) {
					if(res.errMsg.indexOf('tooshort') > 0 ){
						mui.toast('录音时间太短了,请重新录音！');
					}
					clearTimeout(t);
				},
				cancel: function(res) {
					mui.toast('cancel');
					clearTimeout(t);
				}
			})
		/*},500);*/
	});
	
	/*播放自己的录音*/
	$("body ").on("touchend ", ".on-play ", function(event) {
		event.preventDefault();
		event.stopPropagation();
		$(".wrap-btn ").addClass("no-pause ");
		$(".wrap-btn ").removeClass("on-play ");
		wx.playVoice({
			localId: localId
		});
		
		/*监听语音播放完毕接口*/
		wx.onVoicePlayEnd({
		    success: function (res) {
		        var localId = res.localId; // 返回音频的本地ID
		        $(".wrap-btn ").attr("class","wrap-btn on-play");
		    }
		});
	});
	
	/*暂停播放自己的录音操作*/
	$("body ").on("touchend ", ".no-pause ", function() {
		$(".wrap-btn ").removeClass("no-pause ");
		$(".wrap-btn ").addClass("on-play ");
		wx.pauseVoice({
			localId: localId
		});
	});
	
	/*引导页第一页的下一页*/
	$("body ").on("touchend ", ".img-step1 .btn-next ", function() {
		$('.img-step1').fadeOut();
		setTimeout(function(){
			$('.step').attr('class','step step2');
			$('.step2').css('top','31%');
			$('.img-step2').css('display','block');
			$('.img-step2.wrap-tips-btn').css('display','block');
			$('.img-step2.wrap-tips-btn').css('top',next_offset_top);
		},500);
	});
	
	/*显示第一页*/
	$("body ").on("touchend ", ".img-step2 .btn-pre ", function() {
		$('.img-step2').fadeOut();
		setTimeout(function(){
			$('.img-step1').fadeIn();
			
			$('.step').attr('class','step step1');
			$('.step1').css('top',record_offset_top-40);
			$('.img-step1.wrap-tips-btn').css('display','block');
			$('.img-step1.wrap-tips-btn').css('top',next_offset_top);
		},500);
	});
	
	/*显示第3页*/
	$("body ").on("touchend ", ".img-step2 .btn-next ", function() {
		$('.img-step2').fadeOut();
		setTimeout(function(){
			$('.img-step3').fadeIn();
			
			$('.step').attr('class','step step3');
			$('.step3').css('top',record_offset_top-20);
			$('.img-step3.wrap-tips-btn').css('display','block');
			$('.img-step3.wrap-tips-btn').css('top',next_offset_top);
		},500);
	});
	
	/*显示第2页*/
	$("body ").on("touchend ", ".img-step3 .btn-pre ", function() {
		$('.img-step3').fadeOut();
		setTimeout(function(){
			$('.step').attr('class','step step2');
			$('.step2').css('top','31%');
			$('.img-step2').css('display','block');
			$('.img-step2.wrap-tips-btn').css('display','block');
			$('.img-step2.wrap-tips-btn').css('top',next_offset_top);
		},500);
	});
	
	/*关闭所有*/
	$("body ").on("touchend ", ".img-step3 .btn-finish ", function() {
		$('.img-step3').fadeOut();
		setTimeout(function(){
			$('.step,.pop-bg,.icon_record_tips,.wrap-tips-btn').fadeOut();
		},500);
	});
	
	
	
});

function add_record_class(){
	$(".wrap-btn").addClass("record-btn");
	$(".wrap-btn").css('opacity',1);
}

function to_record(){ 
    //mui.toast("长按事件触发发"); 
    if(is_weixn()) {
		wx.startRecord({
			success: function(res) {
				localId = '';
				$(".wrap-btn ").addClass("on-record");
				$(".wrap-btn ").removeClass("record-btn");
				timedCount();
			},
			fail: function(res){
				mui.toast("你的网络情况太差了，请刷新页面或者启用其余网络！");
			}
		});
		
		wx.onVoiceRecordEnd({
			complete: function(res) {
				localId = res.localId;
				$('.wrap-btn').attr('localId', localId);
				stop_record();
			}
		});
	}
} 


function stop_record(){
	var class_name = $(".wrap-btn").attr("class");
	if(class_name.indexOf("on-record") > 0 ){
		$(".wrap-btn ").addClass("on-play ");
		$(".wrap-btn ").removeClass("on-record ");
	}
}

/*重新录制*/
function reset_recrod() {
	if(is_weixn()) {
		if(!localId) {
			partIn();
			return;
		} else {
			wx.stopVoice({
				localId: localId
			});
			c=0;
			localId = '';
			$('.wrap-btn').attr('localId', '');
			$(".wrap-btn").attr("class", "wrap-btn record-btn");
		}

	}
}

/*上传语音，serveid给后台*/
function upload_voice() {
	if(is_weixn()) {
		if(!localId) {
			partIn();
			return;
		} else {
			wx.uploadVoice({
				localId: localId,
				isShowProgressTips: 1,
				success: function(res) {
					var info={};
					info.media_id = res.serverId;
					info.text = 'Knowledge can change your fate and English can accomplish you fature';
					info.device_id = Math.random();
					get_record_score(info);
				}
			});
		}

	}
}

/*获取录音评分*/
function get_record_score(info){
	$.ajax({
		type: "get",
		url: get_score_url,
		data: {
			'media_id':info.media_id,
			'text':info.text,
			'device_id':info.device_id,
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		success: function(res){
			if(parseInt(browser) == 1){
				window.location.href = "result_browser.html?score=" + parseInt(res.data.lines[0].score);
			}else{
				window.location.href = "result.html?score=" + parseInt(res.data.lines[0].score);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

var c=0,t;
function timedCount() { 
	if(c<10){
		c = '0'+c;
	}
	var span_html= '<span class="time-amount">00:'+c+'</span>';
	$(".on-record").html(span_html);
	c = parseInt(c);
	c=c+1 
	
	t=setTimeout("timedCount()",1000); 
}
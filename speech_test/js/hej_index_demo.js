var localId = '';	//本地录音id
var myVideo = document.getElementById("recordAudio");	//音频

window.onload = function(){
	fixedFooter();
}

/*检测是否播放完毕，播放完回复到播放状态*/
function hasVidEnded(_this) {
	console.log(myVideo.ended);
	if(myVideo.ended) {
		
		_this.attr("class", "patten-voice");
	};
}

var browser = 0;

$(function(){
	var type = getParams('type');
	var user_city = getParams('user_city');
	browser = getParams('browser');
	if(parseInt(browser) == 1){
		partIn2();
		$(".state-list ul li").children(":first").show();
	}else{
		$('.pop-bg,icon_record_tips,.step1').fadeIn();
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
	
	
	/*if(!is_weixn()){
		$(".open-wx").css("display",'block'); 
		location.href = 'hej_index_demo_browser.html?type='+getCache('TYPE')+'&user_city='+getCache("CITY_NUM")+'&browser=1';
	}*/
	
	
	myVideo.addEventListener('ended', function () {  
	    $(".patten-voice").attr("class", "patten-voice");
	    $(".patten-voice").find("span").text("播放原音");
	}, false);
	
	/*原音---播放,暂停操作*/
	$("body ").on("touchend ", ".patten-voice", function() {
		/*检测是否播放完毕*/
	/*	var _this = $(this);
		hasVidEnded(_this);*/
		
		/*原音的切换播放*/
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
	
	var timeOutEvent = '';
		
	/*点击开始录音，出现录音中的状态*/
	/*$("body ").on("touchstart ", ".record-btn ", function(event) {
		event.preventDefault();
		event.stopPropagation();
		timeOutEvent = setTimeout("longPress()",1000);
	});*/
	
	/*点击开始录音，出现录音中的状态*/
	/*$("body ").on("touchmove ", ".record-btn ", function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(".source-text").text("move");
		clearTimeout(timeOutEvent); 
		timeOutEvent = 0; 
	});*/
	
	$("body ").on("touchend ", ".record-btn ", function(event) {
		event.preventDefault();
		event.stopPropagation();
		/*clearTimeout(timeOutEvent);
		if(timeOutEvent!=0){ 
			mui.toast("你这是点击，不是长按"); 
		}
		else{
 			wx.stopRecord({
				success: function(res) {
					$(".wrap-btn ").addClass("on-play ");
					$(".wrap-btn ").removeClass("on-record ");
					localId = res.localId;
					$('.wrap-btn').attr('localId', localId);
				}
			});
		}*/
		/*return false; */
		 if(is_weixn()) {
			wx.startRecord({
				success: function(res) {
					$(".wrap-btn ").removeClass("record-btn");
					$(".wrap-btn ").addClass("on-record");
				},
				fail: function(res){
					mui.toast(JSON.stringify(res));
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
	});
	
	/*点击正在录音，出现停止录音，结束录音*/
	$("body ").on("touchend ", ".on-record ", function(event) {
		event.preventDefault();
		event.stopPropagation();
		timedCount();
		return;
		setTimeout(function(){
			wx.stopRecord({
				success: function(res) {
					$('.patten-voice span').text(2);
					$(".source-text ").find("span").text(JSON.stringify(res));
					localId = res.localId;
					$('.wrap-btn').attr('localId', localId);
					$(".wrap-btn ").addClass("on-play ");
					$(".wrap-btn ").css("background", "img/icon_play_on.png ");
					$(".wrap-btn ").removeClass("on-record ");
				},
				fail: function(res) {
					if(res.errMsg.indexOf('tooshort') > 0 ){
						mui.toast('录音时间太短了,请重新录音！');
						$(".wrap-btn ").attr("class","wrap-btn record-btn");
						return;
					}else{
						$('.patten-voice span').text(4444);
					}
				},
				complete: function(res) {
					if(res.errMsg.indexOf('tooshort') > 0 ){
						mui.toast('录音时间太短了,请重新录音！！');
						return;
					}
				},
				cancel: function(res) {
					mui.toast('cancel');
				}
			})
		},500);
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
		    	console.log(res);
		        var localId = res.localId; // 返回音频的本地ID
		        $(".wrap-btn ").attr("class","wrap-btn on-play");
		    }
		});
	});
	
	/*暂停播放自己的录音操作*/
	$("body ").on("touchend ", ".no-pause ", function() {
		$(".wrap-btn ").removeClass("no-pause ");
		$(".wrap-btn ").addClass("on-play ");
		//$(".wrap-btn ").css("background", "img/icon_play_on.png ");
	
		wx.pauseVoice({
			localId: localId
		});
	});
	
});

function longPress(){ 
    timeOutEvent = 0; 
    mui.toast("长按事件触发发"); 
    if(is_weixn()) {
		wx.startRecord({
			success: function(res) {
				$(".wrap-btn ").removeClass("record-btn");
				$(".wrap-btn ").addClass("on-record");
			},
			fail: function(res){
				mui.toast(JSON.stringify(res));
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
			//mui.toast("请先完成录制录音哦！");
			partIn();
			return;
		} else {
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

var c=0; 
var t;
function timedCount() { 
	if(c<10){
		c = '0'+c;
	}
	$(".on-record").text('00:'+c);
	c = parseInt(c);
	c=c+1 
	
	t=setTimeout("timedCount()",1000); 
} 
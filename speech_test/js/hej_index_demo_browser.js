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

$(function(){
	console.log(is_weixn());
	if(!is_weixn()){
		$(".open-wx").css("display",'block'); 
	}
	
	
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
	$("body ").on("touchstart ", ".record-btn ", function(e) {
			timeOutEvent = setTimeout("longPress()",1000);
			//alert("start"+timeOutEvent);
			e.preventDefault();
	});
	
	/*点击开始录音，出现录音中的状态*/
	$("body ").on("touchmove ", ".record-btn ", function() {
		e.preventDefault();
		e.stopPropagation();
		$(".source-text").text("move");
		clearTimeout(timeOutEvent); 
		timeOutEvent = 0; 
	});
	
	$("body ").on("touchend ", ".record-btn ", function() {
		clearTimeout(timeOutEvent);
		if(timeOutEvent!=0){ 
			mui.toast("你这是点击，不是长按"); 
		}else{
			$(".wrap-btn ").addClass("no-finish");
			$(".wrap-btn ").removeClass("on-record ");
		}
		return false; 
	});
	
	/*点击正在录音，出现停止录音，结束录音*/
	$("body ").on("touchend ", ".on-record ", function() {
		$(".wrap-btn ").addClass("no-finish");
		$(".wrap-btn ").removeClass("on-record ");
		$('.wrap-btn').attr('localId', Math.random());
		localId = Math.random();
	});
		
});

function longPress(){ 
    timeOutEvent = 0; 
    mui.toast("长按事件触发发"); 
    $(".wrap-btn ").addClass("on-record");
	$(".wrap-btn ").removeClass("record-btn");
} 

/*重新录制*/
function reset_recrod() {
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

/*上传语音，serveid给后台*/
function upload_voice() {
	if(!localId) {
		partIn();
		return;
	} else {
		window.location.href = "result.html?score=" + get_random();
	}
}

/*生成49-100的随机数*/
function get_random(){
	/*var random_nums = Math.random();
	random_nums = random_nums*100;
	if(random_nums<50){
		random_nums = 49;
	}
	random_nums=random_nums.toString();
	if(random_nums.indexOf('.')>0){
		random_nums = random_nums.split('.');
		random_nums = random_nums[0];
	}
	console.log(random_nums);*/
	return Math.round(Math.random()*20+30);
}
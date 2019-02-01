$(document).ready(function() {
	//is_weixn();
	/*点击箭头*/
	$("body").on('touchstart', ".small-tips", function(e) {
	/*	var arrow_obj=$(this).find(".arrow");
		var dataId=arrow_obj.attr("data-id");
		if(dataId=="close"){
			arrow_obj.addClass("arrow_down");
			arrow_obj.attr("data-id","open");
		}else{
			arrow_obj.removeClass("arrow_down");
			arrow_obj.attr("data-id","close");
		}*/
		$(".tips-con").slideToggle();
	});
	
	inputIsNull();
	
	/*判断输入是否为空*/
	$("body").on('keyup', ".input-text", function(e) {
		inputIsNull();
	});
	
	$("body").on('keydown', ".input-text", function(e) {
		inputIsNull();
	});
	
	/*检测输入是否合法*/
	var reg_id=/^\d{8,19}$/;
	$("body").on('touchstart', ".login-btn.active", function(e) {
		var uid=$("#uid").val();
		if(!uid){
			Toast("她她ID不能为空！");
			return;
		};
		if(!reg_id.test(uid)){
			Toast("她她ID格式不对！");
			return;
		}
		
		if(uid){
			login(login_url,uid);
		}
	});
});

/*登录*/
function login(login_url,uid){
	$.ajax({
		type: "post",
		url: login_url,
		data: {
			"uid":uid
		},
		dataType: "json",
		headers: {
			'X-Requested-With': "XMLHttpRequest"
		},
		xhrFields: {
			withCredentials: true
		},
		success: function(res){
        	var res_data=res.data;
        	if(res.code==200){
        		Toast("登录成功");
        		setCache("uid",res_data.uid);
        		setTimeout(function(){
        			var linkTo="list.html?uid="+res_data.uid+"&uname="+res_data.uname+"&uheader="+res_data.avatar;
	        		location.href=linkTo;
        		},2000);
        		
        	}else{
        		Toast(res.error);
        	}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}
	
/*检测输入是否为空*/
function inputIsNull(obj){
	if($(".input-text").val()){
		$(".login-btn").addClass("active");
	}else{
		$(".login-btn").removeClass("active");
	}
}
	
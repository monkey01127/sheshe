
window.onload=function(){
	mui.init();
	/*初始化iscroll*/
	loaded();
	/*获取剩余票数*/
	getRemain();
	
	/*选择参与人数的计算*/
	var testBox=document.getElementById("test");
	testBox.addEventListener('change',function(){
		var pay_money = '￥'+(parseInt(testBox.value)*1550)+'元';
		$(".pay-money").text(pay_money);
	});

	/*3个输入框中有值是,付款按钮由灰色变为-->绿色按钮*/
	$("body").on("keyup",".ip-text,.area-text",function(){
		if($('.user-name').val()&&$('.user-iphone').val()&&$('.user-id').val()&&$('.user-weixin').val()){
			$('#payBtn').addClass('green-bg').removeClass('grey-bg');
		}else{
			$('#payBtn').removeClass('green-bg');
		}
	});
	
	/*去支付页面*/
	$("body").on("touchstart","#payBtn.green-bg",function(){
		if(checkName() && checkIphone() && checkId() &&checkWeixin()){
			var params_data = setParams();
			toPay(params_data);
		}
	});
}

/*获取剩余票数*/
function getRemain(){
	$.ajax({
		type: "get",
		url: remain_nums_url,
		data: {
			
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
				$(".remain-nums").val(res.data.remain_nums);
				if(parseInt(res.data.remain_nums) == 0){
					messageTips();
				}
			} else {
				$(".remain-nums").val(0);
				messageTips();
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

/*新增提示信息*/
function messageTips(){
	$("#unPayDialog,.pop-bg").fadeIn();
	$('#unPayDialog').attr('class','pop-dialog pt-page-moveFromTop');
}

/*检测姓名是否合法*/
function checkName(){
	var userName=$('#userName').val();
	if(!userName){
    	mui.toast('姓名不能为空');
    	return 0;
   }else if(userName.length >40){
   		mui.toast('姓名太长了');
   		return 0;
   }else{
   		return 1;
   }
}

/*检测手机是否合法*/
function checkIphone(){
	var inputValue=$('#iphoneNum').val();
	var account_test = /^1\d{10}$/;	//手机格式
	if(!account_test.test(inputValue)&&inputValue.length>0){
    	mui.toast('手机号格式不对，请重新输入！');
    	return 0;
   }else{
   		return 1;
   }
}

/*验证身份证号*/
function checkId(){
	var cardId=$("#cardId").val();
	identity_card=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if(!identity_card.test(cardId)){
		mui.toast("证件号格式不对！");
		return 0;
	}else{
   		return 1;
   }
}

/*获取输入参数*/
function setParams(){
	var data ={};
	data.people_nmus =$('.people-nmus').val();
	data.user_name =$('.user-name').val();
	data.user_iphone =$('.user-iphone').val();
	data.user_id =$('.user-id').val();
	data.user_weixin =$('.user-weixin').val();
	return data;
}

/*去支付*/
function toPay(param_data){
	$(".ui-btn-loading-before").hide();
	$(".ui-btn-loading-after").show();
	$(".pop-bg").show().addClass("pop-white");
	$.ajax({
		type: "post",
		url: pay_url,
		data:{
			"people_nmus": param_data.people_nmus,
			"user_name": param_data.user_name,
			"user_iphone": param_data.user_iphone,
			"user_id": param_data.user_id,
			"user_weixin": param_data.user_weixin,
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
				window.location.href= res.data.url;
			} else {
				$(".ui-btn-loading-before").show();
				$(".ui-btn-loading-after").hide();
				$(".pop-bg").hide().removeClass("pop-white");
				mui.toast(res.error);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

/*活动结束,跳转到前一个页面*/
function toBack(){
	history.back();
}

/*微信不能输入中文*/
function checkWeixin(){
	var wexin_id=$("#weixinID").val();
	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
　　if(reg.test(wexin_id)){   
		mui.toast("微信格式不对！");
		return 0;
	}else{
       	return 1;
    }
}

var myScroll;
function loaded() {
	myScroll = new iScroll('wrapper');
}
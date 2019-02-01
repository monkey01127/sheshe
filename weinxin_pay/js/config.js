/*1 开发，2测试，3正式*/
var commm_dev='http://dev-wap.tata.com';
var commm_test='http://wap-test.lestata.com';
var commm_release='http://wap.lestata.com';

var common_url=commm_dev; 	//域名地址；

function setUrl(host){
	if(host=='dev-activity.tata.com'){
		common_url=commm_dev;
	}else if(host=='activity-test.lestata.com'){
		common_url=commm_test;
	}else if(host=='activity.lestata.com'){
		common_url=commm_release;
	}
	return common_url;
}

/*用户登录*/
var host = window.location.host;

/*上传图片路径*/
var login_url=setUrl(host)+'/live/public/user-login';

/*直播充值列表*/
var recharge_list_url=setUrl(host)+'/live/public/recharge-list';

/*发起充值*/
var to_recharge_url=setUrl(host)+'/live/public/launch';

/*获取授权地址*/
var get_authorize_url=setUrl(host)+'/live/public/wap-recharge';


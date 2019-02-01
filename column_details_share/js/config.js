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

/*拿详情路径*/
var detail_url=setUrl(host)+'/column/share/detail';


/*分享*/
/*正式地址：，测试地址，开发环境*/ 
var back_commm_dev='http://dev-admin.tata.com';
var back_commm_test='http://admin-test.lestata.com';
var back_commm_release='http://share.lestata.com';
var back_common_url = back_commm_dev;
function setBackUrl(host){
	var back_common_url = back_commm_dev;
	if(host=='dev-activity.tata.com'){
		back_common_url = back_commm_dev;
	}else if(host=='activity-test.lestata.com'){
		back_common_url = back_commm_test;
	}else if(host=='activity.lestata.com'){
		back_common_url = back_commm_release;
	}
	return back_common_url;
}

/*微信分享参数*/
var weixin_share_url = setBackUrl(host)+'/index.php/WxShare/share';
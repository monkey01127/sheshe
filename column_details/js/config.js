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
var detail_url=setUrl(host)+'/column/column/detail';

/*活动路径*/

/*剩余人数*/
var remain_nums_url=setUrl(host)+'/trade/two/in';

/*支付接口*/
var pay_url=setUrl(host)+'/trade/two/pay';




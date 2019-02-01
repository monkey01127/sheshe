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

/*获取当前域名*/
var host = window.location.host;

/*申请主播路径*/
var apply_url=setUrl(host)+'/live/anchor/apply';

/*主播禁用提示*/
var apply_disable_url=setUrl(host)+'/live/anchor/apply-disable';


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

/*上传图片路径*/
var upload_url=setUrl(host)+'/treehole/upload/image';

/*保存心事列表*/
var save_mood_url=setUrl(host)+'/treehole/index/bury';

/*心事详情*/
var moode_detail=setUrl(host)+'/treehole/index/detail';

/*心事编辑*/
var moode_edit_url=setUrl(host)+'/treehole/index/edit';

/*心事删除*/
var moode_del_url=setUrl(host)+'/treehole/index/delete';




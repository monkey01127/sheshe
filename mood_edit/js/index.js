/*全局变量*/
var type=getParams("type"); /*type==1,是发布type==2，编辑*/
var t_id=" ";		//编辑页的，心事id;
var old_content='';		//编辑页，用于保存编辑页代码，用于后期比较代码，是否改变
var detail_text_align="1";		//编辑页，详情代码是否居中，==1,居左，==2，居中；
var edit_detail_text_align="1";		//编辑页，记录详情代码操作代码的操作状态；
var no_save=false;			//页面未保存状态；
var release_text_status='';	//记录是否发布页面的，文本状态；
var app_version = getParams("_version");

if(type=="new"){
	type=1;
}else if(type=="edit"){
	type=2;
	t_id=getParams("treehole_id");	//树洞id
}else{
	type=1;
}

/*当前系统时间*/
function CurentTime() {
	var now = new Date();

	var year = now.getFullYear(); //年
	var month = now.getMonth() + 1; //月
	var day = now.getDate(); //日

	var hh = now.getHours(); //时
	var mm = now.getMinutes(); //分

	var clock = year + "-";

	if (month < 10)
		clock += "0";

	clock += month + "-";

	if (day < 10)
		clock += "0";

	clock += day + " ";

	if (hh < 10)
		clock += "0";

	clock += hh + ":";
	if (mm < 10) clock += '0';
	clock += mm;
	return (clock);
}

/*检测输入内容，有内容显示保存按钮*/
function checkInput() {
	var content = $.trim($("#content").text());
	var placeholader_html='<p>写下我的心事</p>';
	if (content && content !== "写下我的心事" && type == 1) {
		$(".save").show();
		$(".wrap-operate").fadeIn();
	} 
	/*只有在发布页面，需要保存草稿心事*/
	if(type==1){
		saveCache();
	}
}

/*根据缓存中的值，设置*/
function textStyle(){
	var obj=$(".setText img");
	var type_style=getCache(text_style);
	if(!type_style){
		type_style=1;
	}
	$(".setText").attr("data-id",type_style);
	if(type_style==1 || type_style==''){
		$("#content").attr("class","moond-content text-left");
		obj.attr("src","img/icon_sd_l.png");
	}else if(type_style==2){
		$("#content").attr("class","moond-content text-center");
		obj.attr("src","img/icon_sd_v.png");
	}
	$("#style_adorn").val(getCache(text_style));
}

/*设置主体内容高度*/
function setContentHeight(){
	var win_height = window.innerHeight;  
    var con_height=win_height-44-20;
  	$(".moond-content").css("max-height",con_height);
}

/*如果locastroage中有内容，焦点的显示位置*/
function getFocus(){
	var content = $.trim($("#content").text());
	if (content&&content!=="写下我的心事") {
		//set_focus($$("content"));
	}
}

/*+操作*/
function addOperate(obj){
	var _this=obj;
	setTimeout(function() {
		_this.addClass("icon_close");
		_this.removeClass("icon_add");
		_this.siblings("ul").attr("class", "moveFromRight");
	}, 300);
}

/*X操作*/
function closeOperate(obj){
	var _this=obj;
	setTimeout(function() {
		_this.addClass("icon_add");
		_this.removeClass("icon_close");
		_this.siblings("ul").attr("class", "moveToRight");
	}, 300);
}

/*居左居中*/
function setWordStyle(t_obj){
	var obj=$("#content");
	var word_obj=$(t_obj);
	var dataId=word_obj.attr("data-id");
	if(dataId==1){
		obj.addClass("text-center");
		word_obj.find("img").attr("src","img/icon_sd_v.png");
		word_obj.attr("data-id",2); //==2，居中
	}else if(dataId==2){
		obj.removeClass("text-center");
		word_obj.find("img").attr("src","img/icon_sd_l.png");	
		word_obj.attr("data-id",1); //==1，居左显示
	}
	
	var current_text_style=word_obj.attr("data-id");
	if(type==1){
		setCache(text_style, current_text_style);	
	}/*else if(type==2){
		
	}*/
	$("#style_adorn").val(current_text_style);
	edit_detail_text_align = current_text_style;
}

/*点击加号*/
function operate(obj){
	var oper_obj=$(obj);
	var classList=oper_obj.attr("class");
	if(classList.indexOf("icon_add")>-1){
		addOperate(oper_obj);
	}else if(classList.indexOf("icon_close")>-1){
		closeOperate(oper_obj);
	}
}

/*保存心事*/
function saveMood(obj){
	var dataId=$(obj).attr("data-id");
	$(".pop-bg").show();
	if(dataId==1){
		$(obj).find("img").attr("src","img/loading1.gif");
		$(obj).attr("data-id",0);
			var options = {
			type: 'post', // 提交方式 get/post
			url: save_mood_url, // 需要提交的 url
			dataType: 'json',
			headers: {
				'X-Requested-With': "XMLHttpRequest"
			},
			xhrFields: {
				withCredentials: true
			},
			success: function(res) { // data 保存提交后返回的数据，一般为 json 数据
				$(obj).attr("data-id",1);
				if(res.code=="200"){
					if(type==1){	//发布页面，页面发布成功，清除缓存中的数据
						setCache(mood_content,'');
						setCache(text_style,'');
					}
					$(".pop-nomal-dialog,.pop-nomal-bg").fadeOut();		//点击X，进行检测二次保存时的，保存成功后，隐藏弹框和弹层
					$(".icon-del").attr("data-id",res.data.info.treehole_id);	//给垃圾桶，加id,便于后面删除
					$(obj).find("img").attr("src","img/icon_sd_ok.png");
					$(".pop-bg").hide();
					successTips("保存成功");
					$("#loading").hide();
					$(".wrap-operate").fadeOut();
					$(".del-operate").fadeIn();
					$(".moond-content").blur();
					renderDetailpage(res.data.info);	//保存成功后，进入编辑页面，修改部分信息
					old_content = $("#content").html();	 	//保存旧的html,以便后面和正在编辑的内容进行比较
					
					no_save=true;//保存成功了
					/*保存成功后，2边的居中状态就一样了*/
					if(type == 1){ 
						release_text_status = edit_detail_text_align;
					}else if(type == 2){
						detail_text_align = edit_detail_text_align;
					}
				}else{
					$(".pop-bg").hide();
					$(this).addClass("save");
					successTips(res.error);
					$(obj).find("img").attr("src","img/icon_sd_ok.png");
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$(".pop-bg").hide();
				$(obj).find("img").attr("src","img/icon_sd_ok.png");
				successTips("可能网络不佳 ＞﹏＜ 请小主重试一下");
			},
		}
		$('#moodForm').ajaxSubmit(options);
	}
}

/*删除心事列表*/
function delMood(){
	var t_id=$(".icon-del").attr("data-id");
	$.ajax({
		type: "post",
		url: moode_del_url,
		data: {
			treehole_id:t_id
		},
		dataType: "json",
		headers: {
			'X-Requested-With': "XMLHttpRequest"
		},
		xhrFields: {
			withCredentials: true
		},
		success: function(res){
			if(res.code=="200"){
				$(".pop-nomal-dialog,.pop-nomal-bg").fadeOut();
				successTips("删除成功");
				setTimeout(function(){
					cleanData();
					linkIosAndAndrow("delete");
				},2000);
			}else{
				successTips(res.error);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			successTips("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

/*清空页面和缓存中数据*/
function cleanData(){
	$("#content").text("");
	$("#target").val("");
	$("#uid").val("");
	$("#treehole_id").val("");
	//$$('moodForm')[0].reset();  
	if(type==1){
		setCache(mood_content,'');
		setCache(text_style,'');
	}
	$(".del-operate,.wrap-operate").fadeOut();
}

/*加载页面*/
function loadMoodPage(type,t_id){
	if(type==1){
		/*显示local缓存中的数据*/
		showCache();
	}else if(type==2){
		/*显示详情页*/
		showDetailPage(t_id);
	}
}
	
/*显示详情*/
function showDetailPage(t_id){
	$.ajax({
		type: "get",
		url: moode_detail,
		data: {
			treehole_id:t_id
		},
		dataType: "json",
		headers: {
			'X-Requested-With': "XMLHttpRequest"
		},
		xhrFields: {
			withCredentials: true
		},
		success: function(res){
			if(res.code=="200"){
				renderDetailpage(res.data.info);
				$(".icon-del").attr("data-id",res.data.info.treehole_id);
				old_content = $("#content").html();	//获取html代码，用于后来的比较
				getTextAlign(res.data.info)	/*详情页面下获取，页面是居中，还是居左*/
			}else{
				successTips(res.error);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			successTips("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

/*type==2,详情页面下获取，页面是居中，还是居左*/
function getTextAlign(info){
	var obj=$("#content");
	detail_text_align=info.style_adorn;	//从接口，获取当前是居左，还是居中
	if(detail_text_align=="left"){
		detail_text_align=1;
	}else if(detail_text_align=="center"){
		detail_text_align=2;
	}
	edit_detail_text_align = detail_text_align;
	$(".setText").attr("data-id",detail_text_align);
	
	if(detail_text_align==2){
		obj.addClass("text-center");
		$(".setText").find("img").attr("src","img/icon_sd_v.png"); //==2，居中
	}else if(detail_text_align==1){
		obj.removeClass("text-center");
		$(".setText").find("img").attr("src","img/icon_sd_l.png");	//==1，居左显示
	}
}

/*渲染详情页*/
function renderDetailpage(info){
	var con=info.content;
	var uid=info.uid;
	var hid=info.treehole_id;
	var time=info.created_at;
	$("#target").val(con);
	$("#uid").val(uid);
	$("#treehole_id").val(hid);
	if(type==2){
		$("#content").html(con);
		$(".current-time").text(time);
	}
}

/*详情页默认进来，只显示垃圾桶，隐藏其余操作按钮*/
function hideElements(){
	$(".del-operate").fadeIn();
	$(".wrap-operate").fadeOut();
}

$(document).ready(function() {
	var con_height=window.innerHeight-$(".fix-header").outerHeight(true);
	$(".moond-content").css("min-height",con_height);
	
	editWidth=window.innerHeight-40;
	/*插入图片*/
	$('#content').artEditor({
		clickPositon:80,
		imgNums:1,
		pageType:type,
		imgTar: '#imageUpload',
		limitSize: 5,   // 兆
		showServer: true,
		uploadUrl: upload_url,
		data: {},
		uploadField: 'image',
		placeholader: '<p style="color:#d5d5d5!important;">写下我的心事</p>',
		validHtml: ["<br/>"],
		formInputId: 'target',
		uploadSuccess: function(res) {
			return res;
		},
		uploadError: function(res) {
			successTips(res);
		}
	});
	
	loadMoodPage(type,t_id);
	
	/*加载详情页的操作*/
	if(type==2){
		hideElements();
	}
	
	//如果缓存中数据
	getFocus();	
	
	/*获取当前系统时间*/
	getSystemTime();
	
	checkInput();	//是否显示保存
	
	if(type==1){
		textStyle();	//缓存中读取文本样式；
	}
	
	/*设置主体高度*/
	setTimeout(function(){  
        setContentHeight();
        $(".pop-bg").css("height",window.innerHeight+'px') ;  
    },20);
    
    setInterval(function(){
    	$("#loading, .loading-tips,.pop-bg").hide();
    },20000);
    
    var isIOS = (/iphone|ipad/gi).test(navigator.appVersion);
    setInterval(function(){
		if(isIOS){
			$(".fix-header").addClass('pos-rel');
			$(".fix-header").css("top",$(window).scrollTop());
		}
	},1000);
	
	clearImgClass();
	
});

/*关闭页面操作*/
function showDialog(obj){
	var data_type=$(obj).attr("data-type");
	var pop_params={};
	var content = $.trim($("#content").text());
	/*是否保存保存心思*/
	console.log(old_content);
	console.log($("#content").html());
	if(data_type=='save'){
		/*如果是保存过的，并且未修改的，仍然要传edit*/
		if(no_save && type==2 && old_content == $("#content").html() && detail_text_align == edit_detail_text_align){
			linkIosAndAndrow("edit");
			return;
		}
		
		if(content == "写下我的心事" || (type ==1 && old_content == $("#content").html() && release_text_status == edit_detail_text_align) || (type ==2 && old_content == $("#content").html() && detail_text_align == edit_detail_text_align)){	//没有任何输入的时候
			if(type==2){
				if(type ==2 && old_content == $("#content").html() && detail_text_align == edit_detail_text_align){
					linkIosAndAndrow();
				}else{
					linkIosAndAndrow("edit");
				}
				
			}else{
				linkIosAndAndrow();
			}
			return;
		}
		pop_params=setPopParams("","是否保存本次心事的编辑","不保存","保存");
	}else{
		pop_params=setPopParams("","是否删除本条心事？","取消","删除");
	}
	pop_params.type=data_type;
	popDialog(pop_params);
}

/*安卓手机上的返回按钮*/
function linkToAndroid(){
	showDialog($$("closeMood"));
}

/*删除心思列表*/
function delList(){
	popDialog(pop_params);
}

function setPopParams(title, msg, btn_cancle_txt, btn_sure_txt) {
	var pop_params = {};
	pop_params.title = title;
	pop_params.msg = msg;
	pop_params.btn_cancle_txt = btn_cancle_txt;
	pop_params.btn_sure_txt = btn_sure_txt;
	return pop_params;
}

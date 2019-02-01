/*写固定参数，或者获取当前数据*/
var uid =  getParams("uid");
var column_id = getParams("column_id");
var direction = "";

var _version = getParams("_version");

var bottom_pos="no_bottom";	//底部位置；
var top_pos="no_top";		//顶部位置；
var top_status=1;			//顶部默认可以直接翻页状态,1直接翻页，2是加div,然后再翻页；
var nDivHight ='';			//容器高度变量
var nScrollHight='';
var nScrollTop='';

$(document).ready(function() {
	/*默认加载当前页*/
	getDetail(uid, column_id, direction);
	
	$("#bottmDiv").val(bottom_pos);
	$("#topDiv").val(top_pos);
	
	 /*设置容器的高度*/
	$(".container").css("height",getWindowHeight());
	
	 $(".container").scroll(function(e) {
	    e.stopPropagation();
	    /*获取详情id*/
	 	column_id=$("#column_id").val();
	 	/*获取滚动条的高度*/
		nScrollHight = $(this)[0].scrollHeight;
        nScrollTop = $(this)[0].scrollTop+1;
        
        var winHeight= getWindowHeight();
        if(nScrollTop>50){
        	top_status=2;
        }
	         
	　　　　var paddingBottom = parseInt( $(this).css('padding-bottom') ),paddingTop = parseInt( $(this).css('padding-top') );
	     if(nScrollTop + paddingBottom + paddingTop + nDivHight >= nScrollHight){
	     	down_page();
	     } else if(nScrollTop==1){
	     	up_page();
	     }
	}); 
	
	/*点击跳转*/
	$("body").on("touchstart",".to-link",function(){
		var random = Math.random().toString();
		window.location.href = 'finish_info.html?number='+random;
	});
});

/*滑动页面*/
function up_page(){
	console.log(top_status);
	top_pos=$("#topDiv").val();
	if(top_status==1){
		up();
	}else if(top_status==2){
		if(top_pos=='no_top'){
			$("#topDiv").val('yes_top');
			setTimeout(function(){
				$(".container").prepend('<div class="div_top" style="height:1px;overflow:hidden;">&nbsp;</div>');
				$(".container").scrollTop(1);
			},500);
		}else if(top_pos=='yes_top'){
			up();
	 	}
	}
}

/*向上滑动*/
function up(){
	$(".preloader").addClass("visible");
	$(".top").animate({ height:50 },200);
	
	setTimeout(function(){
		$(".top").animate({ height:0 },200);
		$(".top").removeClass("visible");
	},1000);
	
	setTimeout(function(){
		getDetail(uid, column_id, "up");
	},1500);
}

/*向下滑动*/
function down_page(){
	bottom_pos=$("#bottmDiv").val();
	if(bottom_pos=='no_bottom'){
 	 	$("#bottmDiv").val('yes_bottom');
 	 	console.log("第一次到底");
 	 	console.log($("#bottmDiv").val());
 	 	$(".container").css("overflow","hidden");
 	 	$(".container").append('<div class="div_bottom" style="height:1px;">&nbsp;</div>');
 	 	setTimeout(function(){
			$(".container").css("overflow","auto");
		},500);
 	 }else if(bottom_pos=='yes_bottom'){
 	 	getDetail(uid, column_id, "down");
 	 }
}

/*渲染中间标签部分,例如:情感;*/
var page_tpl = _.template($("#page").text());
var li_tpl = _.template($("#li").text());


/*调接口,显示详情内容*/
function getDetail(uid, column_id, direction) {
	$.ajax({
		type: "get",
		url: detail_url,
		data: {
			"_version":_version,
			"uid": uid,
			"column_id": column_id,
			"direction": direction
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
				column_id=res.data.info.column_id;
				$("#column_id").val(column_id);
				
				/*设置返回值的content数据*/
				res.data.info.content=setContent(res.data.info.content);
				
				/*默认是以文为主*/
				res.data.info.article_type="word";
				
				if(res.data.info.type=="text"){	
					res.data.info.article_type="word";
				} else if(res.data.info.type == "image" || res.data.info.title.trim().length == 0) { /*没有标题,是以图为主*/
					res.data.info.article_type="pic";
				}else{
					res.data.info.article_type="word";
				}
				
				if(direction=="up"){
					$(".container").html(page_tpl(res.data.info));
					$(".container").attr("class","container pt-page-moveFromTop");
				}else if(direction=="down"){
					$(".container").html(page_tpl(res.data.info));
					console.log(direction);
					$(".container").attr("class","container pt-page-moveFromBottom");
				}else{
					$(".container").html(page_tpl(res.data.info));
				}
				
				var tag_label=res.data.info.tag_label;
				$('.page').find(".tag-list ul").append(li_tpl(tag_label));
				shortPageScroll(res.data.info.type);
				/*传给iOS和安卓值的:*/
				linkIosAndAndrow(res.data);
				
				$(".div_bottom,.div_top").remove();
				
				$(".container").scrollTop(1);
				
				$("#bottmDiv").val('no_bottom');
				
				setTimeout(function(){
					$("#bottmDiv").val('no_bottom');
				},100);
				
				$("#topDiv").val('no_top');
				
				top_status=1;
				
				nDivHight = $(".container").height();
				
				setTimeout(function(){
					$(".container").attr("class","container");
					if(res.data.info.type == "image"){
						addScroll();
					}else{
						$(".container").scrollTop(1);
					}
				},500);
				
				if($(".container").scrollTop()==0){
					$(".container").scrollTop(1);
				}  
			} else {
				if(res.error=="内容不存在"){
					if(direction=="down"){
						$(".footer ul").html("<li style='height:3rem;line-height:3rem;'>已经到达最后一篇了</li>");
					}else if(direction=="up"){
						$(".container").scrollTop(1);
						$(".top ul").html("<li style='height:3rem;line-height:3rem;'>已经到达第一篇了</li>");
					}
					
				}else{
					Toast(res.error);
				}
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

function setContent(obj){
	var con_arr=obj.split('</p>');
	var flg=" class='text-padding' ";
	var no_flg=" class='no-padding' ";
	var str1,str2;
	var loog_str='';
	var fl_str='';
	for(var i=0; i<con_arr.length-1; i++){ 
		con_arr[i]=con_arr[i]+'</p>';
		if(con_arr[i].indexOf("img")<0 && con_arr[i].indexOf("iframe")<0){
			if(con_arr[i].length==12 || con_arr[i].length==13){
				if(con_arr[i].indexOf("<br/>")==3||con_arr[i].indexOf("&nbsp")==3){
					fl_str=no_flg;
				}
			}else{
				fl_str=flg;
			}
			str1=con_arr[i].substring(0,2)
			str2=con_arr[i].substring(2,con_arr[i].length);
			new_str=str1+fl_str+str2;
			loog_str=loog_str+new_str;
		}else{
			loog_str=loog_str+con_arr[i];
		}
	}
	return loog_str;
}

/*免责申明动画效果*/
function showState(obj){
	var obj_parents=$(obj).parents(".free-statement");
	var dataID=$(obj).attr("data-id");
	if(dataID==1){
		if(obj_parents.attr("class").indexOf("menu-open")>0){
			obj_parents.removeClass("menu-open");
			$(".state-con").fadeOut();
		}else{
			obj_parents.addClass("menu-open");
			$(".state-con").fadeIn();
		}
		$("#bottmDiv").val('no_bottom');
	}
	
	return;
}

function shortPageScroll(page_con){
	if(!page_con){
		page_con = "text";
	}
	if(page_con=="text" || page_con=="video"){
		$(".free-statement ul li img").show();
		$(".state-con").hide();
		$(".free-statement ul li , .state-con").attr("data-id",1);
	}else if(page_con=="image"){
		$(".free-statement ul li , .state-con").attr("data-id",0);
	}
}


function addScroll(){
	if($(".container").scrollTop()==0){
		$(".container").scrollTop(1);
	} 
	var page_con_height=$("h3").outerHeight()+$(".part1").outerHeight()+50+27+40+$(".part2").outerHeight()+$(".free-statement").outerHeight()+$(".footer").outerHeight();
	if(getWindowHeight()>page_con_height){
		var addCon=getWindowHeight()-page_con_height;
		$(".container").css("padding-bottom",addCon);
		$(".container").append('<br>');
		setTimeout(function(){
			$(".container").scrollTop(1);
		},500);
	}
}
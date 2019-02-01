
var color_arr = ['rgb(91,155,213)','rgb(237,125,49)','rgb(255,192,0)','rgb(68,114,196)','rgb(122,173,71)','rgb(165,165,165)','rgb(255,80,80)'];

var color_arr_purple = ['#4E1BA3','#C2C2C2','#6A39BC','#A178E7','#B896F0','#C9AFF3','#E0CDFF'];

var color_arr_rainbow_first = ['#DBA143','#E4D523','#6DBD50','#5A92D4','#5AC5C7','#8460C0','#D666A1','#C2C2C2'];

var color_arr_rainbow_second = ['#EEC17B','#EEE459','#90D785','#8BB8E6','#7DDBDB','#B495DB','#F096C4','#C2C2C2'];

var color_arr_rainbow_third = ['#F4DAAF','#F5EF9D','#BDE6B5','#B8D3F0','#B2EAE9','#D1BFE9','#F6BFDA','#C2C2C2'];

var min_block_value = 3;

var default_colors_list = ['#732FC3','#EF955D','#F3C81A','#73C421','#008760','#55B0D3','#05658D','#9067E0'
,'#4B2080','#DAA00E','#CBC900','#40A588','#92CED4 ','#077FB1','#E3C172','#AE800B','#4E3C32','#7B6D66','#93A840','#4C7F5C',
'#6DBDC5','#187486','#005666','#B9D4CA','#79A295','#7858A0'];

var default_single_colors_list = ['#732FC3','#824DD2','#9067E0','#9D82EF','#ADA1FF','#C0B7FF','#B7B1DD','#A099D0'
,'#8A83BB','#726BA4','#5D5690','#443C78','#5A287B','#70438F','#885FA3','#9F7BB8','#B595CB','#D0B5E2','#D1A3F1',
'#C085EA','#AA69DF','#9B58D6','#8B37D0','#7811BD'];

var color_list = ['#077FB1','#E4B84B','#40A588','#AC8957','#05658D','#E3C172','#7858A0','#1F92A8','#C1A781','#BB7676',
		'#87B797','#005666','#61B5B1','#008760','#A2A000','#896D45','#F3C81A','#EF955D','#A0435F','#D77F99','#5C9C1A',
		'#CBC900','#EA7127','#187486','#96D359','#55B0D3'];

var special_color_list = ['rgba(153, 153, 153, 0.75)','rgba(153, 153, 153, 0.5)'];

var select_color_list = default_single_colors_list;


/*字号样式*/
var default_color = '#000';
var grey_color = '#999';

var f12 = 12;
var f13 = 12;
var f14 = 14;
var f16 = 16;
var f18 = 18;
var f20 = 20;
var f30 = 30;

/*比例最小为3*/
var min_block_value = 3;

/*页面路径获取参数信息*/
function getParams(key, defaultvalue) {
	if (!window._params) {
		window._params = [];
		var query = document.location.href.split("?");
		if (query.length > 1) {
			query = query[1];
			var paramItems = query.split("&");
			for (var i = 0; i < paramItems.length; i++) {
				var item = paramItems[i].split("=");
				window._params[item[0]] = decodeURIComponent(item[1]);
			}
		}
	}
	return window._params[key] || defaultvalue;
}

var project_Id = getParams('project_Id');
var question_Id = getParams('question_Id');
var auth ='bearer d605d994-6bd9-4887-83ab-52a071368fe3';

/*默认全局样式*/
var default_test_style = {
	color: default_color,
	fontStyle: 'normal',
	fontWeight: 'normal',
	//fontFamily: '微软雅黑',
	fontFamily: 'Microsoft YaHei',
	fontSize: f14,
}

/*标题样式*/
function get_chart_title(title){
	var title_data_style = [{
		text: title.text,
		itemGap: 12,
		subtext: title.subtext,
		textStyle: title_text_style,
		subtextStyle: subtext_text_style
	},{
		left: 0,
		bottom: 0,
		subtext: title.source,
		textStyle: data_source_style
	}];
	return title_data_style;
}


/*正标题样式*/
var title_text_style = {
	fontSize: f16
}

/*副标题*/
var subtext_text_style = {
	color: grey_color
}

/*数据来源样式*/
var data_source_style = {
	color: grey_color,
	fontSize: f12
}

/*工具列表*/
var toolbox_style = {
	feature: {
		saveAsImage: {}/*,
		dataView: {}*/
	}
}

/*横向图例样式*/
var legend_style = {
	itemWidth:14,
	itemHeight:14,
}

/*水平图例样式*/
var legend_hor_style = legend_style;
legend_hor_style.itemGap = 12;
legend_hor_style.left = '50%';
legend_hor_style.orient = 'horizontal';

var title_hor_height = 80;
var title_ver_height = 60;
var source_height = 65;	//数据来源的高度
var gap_height = 80;

var xAxis_single_data = 25;
var xAxis_double_data = 50;


var legend_hor_style = {
	itemWidth:14,
	itemHeight:14,
	itemGap:12,
	left:'50%',
	top:40,
	orient:'horizontal',
	formatter:function(params){
		if(params.length>5){
			params = params +'..';
		}
		return params;
	}
}

var legend_ver_style = {
	itemWidth:14,
	itemHeight:14,
	itemGap:20,
	top: title_ver_height + 25,
	left:'0',
	//left: 0,
	orient:'vertical',
	formatter:function(params){
		if(params.length>6){
			params = params.substr(0,6) +'..';
		}
		return params;
	}
}
/*垂直图例央视*/
/*var legend_ver_style = legend_style;
legend_ver_style.itemGap = 20;

legend_ver_style.orient = 'vertical';
legend_ver_style.top = '80';
legend_ver_style.x = 'left';
legend_ver_style.top = 75;
legend_ver_style.left = 50;*/

/*x轴样式*/
var xAxis_style = {
	axisTick: {
		show: false
	},
	axisLine:{
       	show: false
    },
   splitLine:{
       	show: false
   }
}

/*y轴样式*/
var yAxis_style = {
	axisTick: {
		show: false
	},
	axisLine:{
       	show: false
   },
   splitLine:{
       	show: false
   }/*,
   min: 0,
   max: 100,*/
}

var grid_right_style = {
	left:200,
	top:40
}

var grid_left_style = {
	left:100,
	top:100
}

var grid_hor_style = {
	left:100,
	top:80
}

var grid_ver_style = {
	left:200,
	top:90
}

/*提示框组件。*/
var tooltip_style = {
	formatter: function (params) {
		console.log(params);
		return params.name+'<br/>'+params.data.percent+'%<br/>'+params.value+'人';
   }
}

/*工具*/
function get_tools(){
	this.toolbox = toolbox_style;
	return toolbox;
}

/*图例*/
function get_legend(data){
	legend = legend_hor_style;
	legend.data = data;
	return legend;
}

function get_hor_legend(data){
	legend = legend_hor_style;
	legend.data = data;
	return legend;
}

/*纵向图例*/
function get_ver_legend(data){
	legend = legend_ver_style;
	legend.data = data;
	return legend;
}

/*小于百分之3，则不显示*/
function set_percent(percent){
	if(percent < min_block_value){
		percent = '';
	}else{
		percent = percent + '%';
	}
	return percent;
}

function set_min_percent(percent){
	if(percent < min_block_value){
		percent = '';
	}else{
		percent = percent;
	}
	return percent;
}

/*x轴2行显示*/
axisLabel_style = {
	margin:20,
	textStyle: {
		color: '#000',
		fontSize: f14
	},
    formatter:function(val){
     	if(!val){
     		return val;
     	}else if(val.indexOf('&')>0 ){
     		return val.split("&").join("\n\n");
     	}else {
     		return val;
     	}
	}
}

/*柱图样式*/
/*柱形图的默认宽度*/
var bar_width = 80;
var half_precent = '34%';
var bar_ver_style = {
   // barWidth: bar_width,
	barCategoryGap: half_precent,
	barGap: half_precent
}

function calculate_hor_height(){
	/*var title_ver_height
	var */



}

function $$(id){
	return document.getElementById(id);
}

function calculate_hor_height(data){
	console.log(data.legend);
	var legend_data = data.legend;
	var legend_len = legend_data.data.length;
	var legend_height = legend_len * 30;	//36是图例的高度和图例间的间隔
	//var source_height = 50;

	var all_height = title_ver_height + legend_height + source_height + gap_height;
	if(data.xAxis.data.length > 1){
		all_height = all_height + xAxis_double_data;
	}else{
		all_height = all_height + xAxis_single_data;
	}
	console.log(all_height);
	return all_height;

}

function set_height(obj,data){
	obj.style.height = calculate_hor_height(data) +'px';
}

function single_legend_height(data){
	var yAxis_data = data.yAxis;
	var yAxis_len = yAxis_data.data.length;
	var yAxis_height = yAxis_len * 26;	//36是图例的高度和图例间的间隔
	//var source_height = 50;

	var all_height = title_ver_height + yAxis_height + source_height ;
	if(data.xAxis.data.length > 1){
		all_height = all_height + xAxis_double_data;
	}else{
		all_height = all_height + xAxis_single_data;
	}
	console.log(all_height);
	return all_height;
}

function set_single_legend_height(obj,data){
	obj.style.height = single_legend_height(data) +'px';
}

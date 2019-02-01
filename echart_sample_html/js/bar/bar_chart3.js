/*比例最小为3*/
var min_block_value = 3;
var default_colors_list = ['#732FC3','#9663D2','#9D82EF','#7D68BF','#C08FE7','#A0435F','#BB7676','#C95477'
,'#EA9494','#D25459','#EF955D','#E4B84B','#C2A014','#5C9C1A','#008760','#40A588','#4C7F5C','#5F9F74','#87B797',
'#A1C5B8','#57979D','#1F92A8','#55B0D3','#459FC5','#077FB1','#05658D'];

var default_single_colors_list = ['#732FC3','#824DD2','#9067E0','#9D82EF','#ADA1FF','#C0B7FF','#B7B1DD','#A099D0'
,'#8A83BB','#726BA4','#5D5690','#443C78','#5A287B','#70438F','#885FA3','#9F7BB8','#B595CB','#D0B5E2','#D1A3F1',
'#C085EA','#AA69DF','#9B58D6','#8B37D0','#7811BD'];

/*柱图标题数据以及样式*/
function get_chart_title(title){
	title = [{
		text: title.text,
		subtext: title.subtext,
		textStyle: title_text_style,
		subtextStyle: subtext_text_style
	},{
		left: 0,
		bottom: 0,
		subtext: title.source,
		textStyle: data_source_style
	}];
	return title;
}

/*图上数据样式*/
var normalStyle = {
	normal:{
		show:true,
		position:'right',
	   /*	textStyle:{
	   		color: '#fff'
	   	},*/
	   	formatter:function(params){
        	return set_min_percent(params.value);
       	}
	}
}

function make_hor_single_chart(data) {
	/*全局设置*/
	this.color = select_color_list;
	this.textStyle = default_test_style;  /*默认全局样式,字体，字号，颜色*/
	
	/*标题设置*/
	this.title = get_chart_title(data.title);
	
	/*图例设置*/
	/*this.legend = get_ver_legend(data.legend.data);
	this.legend.bottom = 65;*/
	
	/*工具设置，目前这有下载和数据视图*/
	this.toolbox = get_tools();
	
	/*提示框组件*/
	this.tooltip = tooltip_style;

	console.log(grid_hor_style);
	
	console.log(grid_hor_style)
	
	/*直角坐标系样式*/
	this.grid = {
		left:110,
		top:80,
		right:30,
		bottom:80/*,
		show:true,
		    	backgroundColor:'red'*/
	};
	//this.grid.show = true;
/*	this.grid.bottom = 65;
	this.grid.right = 0;*/
	
	/*x轴样式*/
	this.xAxis = xAxis_style;
	this.xAxis.show = false;
	this.xAxis.max = 100;
	
	/*y轴样式*/
	this.yAxis = yAxis_style;
	this.yAxis.axisLabel={
		formatter:function(params){
			if(params.length>5){
				params = params +'..';
			}
			return params;
		}
	}
	this.yAxis.data = data.yAxis.data;
	
	
	/*数据样式*/
	this.series = set_hor_single_serise_data(data);
}

/*初始化，拿柱图数据*/
function init_hor_single_echarts(i){
	$.ajax({
		type: "get",
		url: 'json/P3.json',
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
	   		var chart_bar = new make_hor_single_chart(res.data);
			console.log(chart_bar);
	   		$("body").append('<div class="echarts-main echarts-main-hor-single" id="main' + i + '"></div>');
			set_height($$(('main' + i)),res.data);
			var myChart = echarts.init(document.getElementById('main' + i));
	   		myChart.setOption(chart_bar);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

/*选择配色*/
/*function select_color(obj){
	if(obj.getAttribute('data-id') == 'purple'){
		select_color_list = default_single_colors_list;
	}else{
		select_color_list = default_colors_list;
	}
	init_echarts();
}*/

/*获取总数总和*/
function get_sums(sums_str){
	var list = sums_str.split('=');
	return list[1];
}

/*整理serise数据*/
function set_hor_single_serise_data(data){
	var series_data = [];
	var obj = {};
	obj = data.series;
	for(var i=0;i<obj.length;i++){
		obj[i].barGap = '0%';
		obj[i].barCategoryGap = '34%';
		obj[i].label = normalStyle;
		obj[i].type = 'bar';
	}
	series_data =  obj;
	console.log(series_data)
	return series_data;
}

/*重写提示框组件*/
var tooltip_style = {
	formatter: function (params) {
		return params.data.percent+'%<br/>'+params.name+'<br/>'+ params.value+'人';
    }
}

/*计算实际的value人数*/
function calculate_frequency(params){
	var percent = params.value /100;
	var frequency = (get_sums(params.name))*percent;
	return parseInt(frequency);
};

function calculate_hor_height(data){
	console.log(data.legend);
	var yAxis_data = data.yAxis;
	var yAxis_len = yAxis_data.data.length;
	var yAxis_height = yAxis_len * 30;	//36是图例的高度和图例间的间隔
	//var source_height = 50;

	var all_height = title_ver_height + yAxis_height + source_height + gap_height;
	if(data.yAxis.data.length > 1){
		all_height = all_height + xAxis_double_data;
	}else{
		all_height = all_height + xAxis_single_data;
	}
	console.log(all_height);
	return all_height;

}

function set_hor_single_height(obj,data){
	obj.style.height = calculate_hor_height(data) +'px';
}

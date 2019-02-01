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
var normal_style = {
	normal:{
		show:true,
		position:'inside',
		textStyle: {
			color: '#fff'
		},
	   	formatter:function(params){
	   		return set_min_percent(params.data.percent);
       	}
	}
}

var item_style = {
	normal:{
		//color:select_color_list,
	}
}

function make_chart(data) {
	/*全局设置*/
	this.color = select_color_list;
	this.textStyle = default_test_style;  /*默认全局样式,字体，字号，颜色*/
	
	/*标题设置*/
	this.title = get_chart_title(data.title);
	
	/*图例设置*/
	this.legend = get_hor_legend(data.legend.data);
	
	/*工具设置，目前这有下载和数据视图*/
	this.toolbox = get_tools();
	
	/*提示框组件*/
	this.tooltip = tooltip_style;
	
	/*直角坐标系样式*/
	this.grid = grid_hor_style;
	this.grid.top = 130;
	//this.grid.show = true;
	this.grid.bottom = 65;
	this.grid.right = 0;
	
	/*x轴样式*/
	this.xAxis = xAxis_style;
	this.xAxis.show = false;
/*	this.xAxis = [];
	this.xAxis[0] = xAxis_style;
	this.xAxis[0].show = false;
	this.xAxis[0].data = '';
	this.xAxis[1] = xAxis_style;
	this.xAxis[1].axisLabel = axisLabel_style;
	this.xAxis[1].data = data.xAxis.data;*/
	/*this.xAxis.max = 100;*/
	
	/*y轴样式*/
	this.yAxis = yAxis_style;
	this.yAxis.data = data.yAxis.data;
	
	console.log(data);
	/*数据样式*/
	this.series = set_serise_data(data);
}

/*初始化，拿柱图数据*/
function init_echarts(){
	$.ajax({
		type: "get",
		url: 'json/P7.json',
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
	   		var chart_pie = new make_chart(res.data);
	   		console.log(chart_pie);
	   		set_single_legend_height($$('main'),res.data);
	   		var myChart = echarts.init(document.getElementById('main'));
	   		myChart.setOption(chart_pie);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

/*选择配色*/
function select_color(obj){
	if(obj.getAttribute('data-id') == 'purple'){
		select_color_list = default_single_colors_list;
	}else{
		select_color_list = default_colors_list;
	}
	init_echarts();
}

/*获取总数总和*/
function get_sums(sums_str){
	var list = sums_str.split('=');
	return list[1];
}

var data_str = '';
var new_item = '';
/*整理serise数据*/
function set_serise_data(data){
	console.log(data);
	var legend_data = data.legend.data;
	var series_data = [];
	var obj = {};
	obj = data.series;
	var new_item = {};
	var second_data = {};
	console.log(legend_data.length);
	console.log(obj.length);
	for(var i=0;i<obj.length;i++){
		obj[i].barGap = '0%';
		obj[i].barCategoryGap = '34%';
		obj[i].label = normal_style;
		obj[i].itemStyle = item_style;
		obj[i].stack = 'bar';
		//console.log(legend_data[i].name);
		obj[i].name = legend_data[i].name;
/*		console.log(obj[i].data);*/
/*		var second_data = obj[i].data;
		console.log(second_data);
		for(var j=0;j<second_data.length;i++){
			second_data[j].name = legend_data[i];
		}
		console.log(obj[i]);*/
		series_data.push(obj[i]);
	}
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

var placeHoledStyle = {
	normal: {
		barBorderColor: 'rgba(0,0,0,0)',
		color: 'rgba(0,0,0,0)'
	},
	emphasis: {
		barBorderColor: 'rgba(0,0,0,0)',
		color: 'rgba(0,0,0,0)'
	}
};

function set_item(item) {
	item.itemStyle = placeHoledStyle;
	var item_data = item.data;
	for(var j = 0; j < item_data.length; j++) {
		item_data[j].value = 100 - item_data[j].value + 10;
	};
	item.tooltip = {
		show:false
	};
	item.label = {
		normal:{
			color:'#fff'
		}
	}
	console.log(item);
	return JSON.stringify(item);
}

function get_serie_arr(data_str) {
	var serie_arr = [];
	var spilt_arr = data_str.split('&');
	console.log(spilt_arr);
	for(var k = 0; k < spilt_arr.length - 1; k++) {
		serie_arr.push(JSON.parse(spilt_arr[k]));
	}
	return serie_arr;
}


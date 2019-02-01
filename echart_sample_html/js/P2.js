/*比例最小为3*/
var min_block_value = 3;
/*var default_colors_list = ['#732FC3','#9663D2','#9D82EF','#7D68BF','#C08FE7','#A0435F','#BB7676','#C95477'
,'#EA9494','#D25459','#EF955D','#E4B84B','#C2A014','#5C9C1A','#008760','#40A588','#4C7F5C','#5F9F74','#87B797',
'#A1C5B8','#57979D','#1F92A8','#55B0D3','#459FC5','#077FB1','#05658D'];

var default_single_colors_list = ['#732FC3','#824DD2','#9067E0','#9D82EF','#ADA1FF','#C0B7FF','#B7B1DD','#A099D0'
,'#8A83BB','#726BA4','#5D5690','#443C78','#5A287B','#70438F','#885FA3','#9F7BB8','#B595CB','#D0B5E2','#D1A3F1',
'#C085EA','#AA69DF','#9B58D6','#8B37D0','#7811BD'];*/

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
	   	textStyle:{
	   		color: '#fff'
	   	},
	   	formatter:function(params){
        	return set_min_percent(params.value);
       	}
	}
}

function make_chart(data) {
	/*全局设置*/
	this.color = select_color_list;
	this.textStyle = default_test_style;  /*默认全局样式,字体，字号，颜色*/
	
	/*标题设置*/
	this.title = get_chart_title(data.title);
	
	/*图例设置*/
	this.legend = get_ver_legend(data.legend.data);
	this.legend.bottom = 65;
	
	/*工具设置，目前这有下载和数据视图*/
	this.toolbox = get_tools();
	
	/*提示框组件*/
	this.tooltip = tooltip_style;
	
	/*直角坐标系样式*/
	this.grid = grid_ver_style;
	this.grid.bottom = 65;
	
	/*x轴样式*/
	this.xAxis = xAxis_style;
	this.xAxis.axisLabel = axisLabel_style;
	this.xAxis.data = data.xAxis.data;
	
	/*y轴样式*/
	this.yAxis = yAxis_style;
	this.yAxis.show = false;
	
	/*数据样式*/
	this.series = set_serise_data(data);
}

/*初始化，拿柱图数据*/
function init_echarts(){
	$.ajax({
		type: "get",
		url: 'json/P2.json',
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
	   		set_height($$('main'),res.data);
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

/*整理serise数据*/
function set_serise_data(data){
	var xAxis_data = data.xAxis.data;
	var series_data =  data.series.data;
	var sums = [];			//用于存储当前数据的总和
	for(var i=0;i<xAxis_data.length;i++){
		sums.push(parseInt(get_sums(xAxis_data[i])));
	}
	for(var i=0;i<series_data.length;i++){
		for(var j=0;j<series_data[i].data.length;j++){
			var current_value = series_data[i].data[j];
			current_value = current_value * 100;
			series_data[i].data[j] = parseInt(current_value / sums[j]);
		}
		series_data[i].type = 'bar';
		series_data[i].stack = '1';
		series_data[i].barCategoryGap = '34%';
		series_data[i].label = normal_style;
	}
	return series_data;
}

/*重写提示框组件*/
var tooltip_style = {
	formatter: function (params) {
		return Number(params.value)+'%<br/>'+params.name+'<br/>'+ calculate_frequency(params)+'人';
    }
}

/*计算实际的value人数*/
function calculate_frequency(params){
	var percent = params.value /100;
	var frequency = (get_sums(params.name))*percent;
	return parseInt(frequency);
};

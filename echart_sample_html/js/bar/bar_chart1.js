
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

function make_hor_store_chart(data) {
	var hor_store_option = {
		color:select_color_list,
		textStyle:default_test_style,
		title:get_chart_title(data.title),
		legend:{
			data:data.legend.data,
			itemWidth:14,
			itemHeight:14,
			itemGap:20,
			top: title_ver_height + 25,
			left:'35',
			//left: 0,
			orient:'vertical',
			formatter:function(params){
				if(params.length>5){
					params = params.substr(0,5) +'..';
				}
				return params;
			}
		},
		xAxis:{
			data:data.xAxis.data
		},
		yAxis:{
			show:false
		}
	}
	return hor_store_option;
}

/*初始化，拿柱图数据*/
function init_hor_store_echarts(i){
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
	   		var chart_pie = make_hor_store_chart(res.data);
	   		console.log(chart_pie);
			$("body").append('<div class="echarts-main echarts-main-hor-store" id="main' + i + '"></div>');
			set_height($$(('main' + i)),res.data);
			var myChart = echarts.init(document.getElementById('main' + i));
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
function set_hor_store_serise_data(data){
	console.log(data);
	var xAxis_data = data.xAxis.data;
	var series_data =  data.series.data;
	var sums = [];			//用于存储当前数据的总和
	/*for(var i=0;i<xAxis_data.length;i++){
		sums.push(parseInt(get_sums(xAxis_data[i])));
	}*/
	for(var i=0;i<series_data.length;i++){
		/*for(var j=0;j<series_data[i].data.length;j++){
			var current_value = series_data[i].data[j];
			current_value = current_value * 100;
			series_data[i].data[j] = parseInt(current_value / sums[j]);
		}*/
		series_data[i].data = series_data[i].data;
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

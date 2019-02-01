/*饼图数据样式部分*/
function get_pie_series() {
	var series = {};
	series.type = 'pie';
	series.radius = ['70', '125'];
	series.center = ['350', '215'];
	series.hoverAnimation = false;
	series.height = 230;
	series.label = {
		normal: {
			position: 'inside',
			formatter: function (params) {
				return set_percent(params.data.percent)
			},
			textStyle: {
				color: '#fff'
			}
		}
	}
	return series;
}

function make_chart(data) {
	this.color = select_color_list;
	this.textStyle = default_test_style,
	this.title = get_chart_title(data.title);
	this.legend = get_ver_legend(data.legend.data);
	this.toolbox = get_tools();
	this.tooltip = tooltip_style;
	/*this.grid={
	    	show:true,
	    	backgroundColor:'red',
			top:90
	},*/
	this.series = get_pie_series();
	this.series.data = this.getSeries(data);
}

/*小于百分之3，则不显示*/
function set_percent(percent) {
	console.log(percent);
	if (percent < min_block_value) {
		percent = '';
	} else {
		percent = parseInt(percent) + '%';
	}
	return percent;
}

make_chart.prototype = {
	constructor: make_chart, //原型字面量方式会将对象的constructor变为Object，此外强制指回Person
	getSeries: function (data) {
		var series_data = data.series.data;
		var series_arr = [];
		var j=0;
		for (var i = 0; i < series_data.length; i++) {
			series_data[i].name = data.legend.data[i];
			if (series_data[i].special_item == 1) {
				series_data[i].itemStyle = {
					normal: {
						color: special_color_list[j],
					}
				}
				j++;
			}
		}
		series_arr = series_data;
		return series_arr;
	}
}

function init_pie_echarts(i){
	$.ajax({
		type: "get",
		//url: 'json/j_pie.json',
		url:pie_url,
		data: {

		},
		dataType: "jsonp",
		jsonp:"jsonpcallback",
		headers: {
			'X-Requested-With': "XMLHttpRequest",
			'Authorization': auth
		},
		xhrFields: {
			withCredentials: true
		},
		success: function (res) {
		//	var color_type = res.data.color_type;
			var color_type = getParams("color_type");
			select_color(color_type);
			var chart_pie = new make_chart(res.data);
			console.log(chart_pie);
			$("body").append('<div class="echarts-main echarts-main-pie" id="main' + i + '"></div>');
			var myChart = echarts.init(document.getElementById('main' + i));
			myChart.setOption(chart_pie);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

function select_color(color_type) {
	if (color_type == '1') {
		select_color_list = default_single_colors_list;
	} else {
		select_color_list = color_list;
	}
}


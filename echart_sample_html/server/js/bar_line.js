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

/*重写提示框组件*/
var tooltip_style = {
	formatter: function (params) {
		return params.data.percent+'%<br/>'+params.seriesName+'<br/>'+ params.value+'人';
    }
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

function make_bar_line_chart(data) {
	/*var str1 = "总数";
	var str2 = "n=1100";
	var Months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    textColor = '#999',
    lineColor = '#ddd',
    dataInvestCount = [180, 150, 300, 650, 500, 580, 590, 581, 588, 700, 1100, 1190],
    dataInvestAmount = [4000000, 3000000, 5000000, 14000000, 9000000, 13000000, 16000000, 15000000, 19000000, 29000000, 41000000, 43000000];
	
	this.color = select_color_list;
	this.textStyle = default_test_style;  
*/
	//maxData = sum_arr(data.data.series.data);

	/*标题设置*/
	this.title = get_chart_title(data.title);
	this.tooltip = tooltip_style;
	
	this.legend = {
      left: '50%',
      data: [{
      	icon: 'rect',
      	name: '累计完成样本量'
      },{
      	icon:'rect',
      	name:'当日完成样本量'
      }
      ]/*,
      itemWidth: 20,
      itemHeight: 4*/
    },

	/*工具设置，目前这有下载和数据视图*/
	this.toolbox = get_tools();

	/*提示框组件*/

	/*x轴样式*/
	this.xAxis = {};
	this.xAxis.axisTick = {
		show: false
	},
	this.xAxis.data = data.xAxis.data;

	/*grid轴样式*/
	this.grid = {
      bottom: 120,
      left: 65,
      right: 0,
      top: 100
   };

	/*y轴样式*/
	this.yAxis = {};
	console.log(data.yAxis.max)
	this.yAxis.max = data.yAxis.max;
	this.yAxis.splitLine = {
    	show: false
    }
	/*this.yAxis = {
		type: 'value',
        max: 500,
        min: 0,
        splitLine: {
        	show: false
        }
    };*/
	

	/*数据样式*/
	this.series = set_bar_line_serise_data(data);



	/*var option = {
		title: [{
          text: '啊啦啦啦啦啦',
          subtext: '啊啦啦啦啦啦'
        },
        {
          left: 0,
          bottom: 0,
          subtext: '啊啦啦啦啦啦'
        }],
		tooltip: {
			trigger: 'axis'
		},
		backgroundColor: 'transparent',
		legend: {
			left: '3%',
			data: ['投资额', '投资笔数']
		},
		grid: {
			left: '4%',
			right: '8%'
		},
		xAxis: {
			type: 'category',
			axisTick: {
				show: false,
				alignWithLabel: true
			},
			axisLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#999'
				},
				margin: 30
			},
			data: Months
		},
		yAxis: [{
			type: 'value',
			min: 0,
			max: 1400,
			position: 'left',
			interval: 200,
			axisLine: {
				lineStyle: {
					color: lineColor
				}
			},
			axisLabel: {
				textStyle: {
					color: textColor
				},
				formatter: function(value) {
					return value / 1000 + 'K'
				}
			},
			splitLine: {
				lineStyle: {
					type: 'dotted'
				}
			}
		}],
		series: [{
			name: '投资笔数',
			type: 'line',
			yAxisIndex: 0,
			symbolSize: 9,
			hoverAnimation: false,
			itemStyle: {
				normal: {
					color: '#abbeed'
				},
				emphasis: {
					color: '#de45a0'
				}
			},
			data: dataInvestCount
		}, {
			name: '投资额',
			type: 'bar',
			itemStyle: {
				normal: {
					color: '#dfdfdf'
				},
				emphasis: {
					color: '#66d593'
				}
			},
			data: [100,100,100,100,100,100,100,100,100,100,100,100]
		}]
	};
	return option;*/
}

function set_bar_line_serise_data(data){
	console.log(data)
	var series_data = [{
		name: data.legend.data[1],
		type: 'line',
		yAxisIndex: 0,
		symbol: 'circle',
		symbolSize: 4,
		hoverAnimation: false,
		label: {
			normal: {
				show: true,
				position: 'top'
			}
		},
		itemStyle: {
			normal: {
				color: '#732FC3'
			},
			emphasis: {
				color: '#824DD2'
			}
		},
		data: data.series.data.line
	}, {
		name: data.legend.data[0],
		type: 'bar',
		itemStyle: {
			normal: {
				color: '#9067E0'
			},
			emphasis: {
				color: '#824DD2'
			}
		},
		tooltip: {
			formatter: function (params) {
				console.log(params)
				return params.seriesName+'<br/>'+ params.value+'人';
		   	}
		},
		data: data.series.data.bar
	}];
	return series_data
}

/*初始化，拿柱图数据*/
function init_bar_line_echarts(i){
	$.ajax({
		type: "get",
	//	url: 'json/bar_line.json',
		url: progress_url,
		data: {},
		dataType: "jsonp",
		jsonp:"jsonpcallback",
		headers: {
			'X-Requested-With': "XMLHttpRequest"
		},
		xhrFields: {
			withCredentials: true
		},
		success: function(res) {
			console.log(res.data)
			var chart_bar_line_pie = new make_bar_line_chart(res.data);
			$("body").append('<div class="echarts-main main-bar-line" id="main'+i+'"></div>');
	   		var myChart = echarts.init(document.getElementById('main'+i));
	   		myChart.setOption(chart_bar_line_pie);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}
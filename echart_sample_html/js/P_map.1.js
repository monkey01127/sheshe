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
		position:'right',
	   /*	textStyle:{
	   		color: '#fff'
	   	},*/
	   	formatter:function(params){
        	return set_min_percent(params.value);
       	}
	}
}


    var mapType = map_type_province;
    var cityMap = map_type_city;

    function get_map_option(data){
        var option = {
                title: get_chart_title(data.title),
                tooltip: {
                    formatter: function (params) {
                        return params.name+'<br/>'+Number(params.data.percent)+'%<br/>'+params.value+'人';
                    }
                },
                    dataRange: {
                    min: 0,
                    max: 100,
                    color: ['#732FC3', '#D0B5E2'],
                    text: ['高', '低'],           // 文本，默认为数值文本
                    calculable: true
                },
                toolbox: get_tools(),
                series: [{
                    name: '规划区',
                    type: 'map',
                    mapType: 'china',
                    selectedMode: 'single',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                textStyle: {
                                    color: "rgb(249, 249, 249)"
                                }
                            },
                        },
                        emphasis: { label: { show: true } },
                    },
                    /*data: [
                        { name: '湖南', value: Math.round(Math.random() * 100),percent: Math.round(Math.random() * 100) },
                        { name: '湖北', value: Math.round(Math.random() * 100),percent: Math.round(Math.random() * 100) },
                        { name: '广东', value: Math.round(Math.random() * 100),percent: 59 }
                    ]*/
										data: data.series[0].data
                }]
            };
				console.log(option);
        return option;
    }

    function init_map(){
        var mapGeoData = require('echarts/util/mapData/params');
        for(var city in cityMap) {
            mapType.push(city);
            // 自定义扩展图表类型
            mapGeoData.params[city] = {
                getGeoJson: (function(c) {
                    var geoJsonName = cityMap[c];
                    return function(callback) {
                        $.getJSON('geoJson/china-main-city/' + geoJsonName + '.json', callback);
                    }
                })(city)
            }
        }
    }



    function echarts_map_init(data){
        var option = get_map_option(data);
        // 路径配置
        /*require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }
        });*/
				require.config({
            packages: [
                {
                    name: 'echarts',
                    location: './js/echarts',
                    main: 'echarts'
                },
                {
                    name: 'zrender',
                    location: './js/zrender',
                    main: 'zrender'
                }
            ]
        });

        // 使用
       require([
            'echarts',
            'echarts/chart/line', //使用线性图，加载line模块
            'echarts/chart/map'
        ],
            function(ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('main'));
                var ecConfig = require('echarts/config');
                var zrEvent = require('zrender/tool/event');
                var curIndx = 0;

                init_map();

                $("body").on("click","#return",function(){
                     init_map();
										 console.log(option);
                      myChart.setOption(option);
                });

                myChart.on(ecConfig.EVENT.MAP_SELECTED, function(param) {
                    var len = mapType.length;
                    var mt = param.target;
                    var f = false;
                    for(var i = 0; i < len; i++) {
                        if(mt == mapType[i]) {
                            f = true;
                            mt = mapType[i];
                        }
                    }
                     var newObject = jQuery.extend(true, {}, option);
                    if(!f) {
                        mt = 'china';
                        newObject.title.text = "全国地图";
                    }else{
                        newObject.title.text = mt+"地图";
                    }
                    newObject.tooltip.trigger = 'item';
                    newObject.series[0].mapType = mt;
                    myChart.setOption(newObject, true);
                });
                // 为echarts对象加载数据
                myChart.setOption(option);
            }
        );
    }


function make_map_chart(data) {
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
	this.grid = grid_hor_style;
	//this.grid.show = true;
	this.grid.bottom = 65;
	this.grid.right = 0;

	/*x轴样式*/
	this.xAxis = xAxis_style;
	this.xAxis.show = false;
	this.xAxis.max = 100;

	/*y轴样式*/
	this.yAxis = yAxis_style;
	this.yAxis.data = data.yAxis.data;


	/*数据样式*/
	this.series = set_serise_data(data);
}

/*初始化，拿柱图数据*/
function init_map_echarts(){
	$.ajax({
		type: "get",
		url: 'json/p_map.json',
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
			var echarts_map = new  echarts_map_init(res.data);
	   	/*	var chart_map = new get_map_option(res.data);
	   		console.log(chart_map);
	   		set_single_legend_height($$('main'),res.data);
	   		var myChart = echarts.init(document.getElementById('main'));
	   		myChart.setOption(chart_pie);*/
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
	var series_data = [];
	var obj = {};
	obj = data.series;
	for(var i=0;i<obj.length;i++){
		obj[i].barGap = '0%';
		obj[i].barCategoryGap = '34%';
		obj[i].label = normal_style;
	}
	series_data =  obj;
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

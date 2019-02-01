var provinces = {
    '上海': 'json/provinces/shanghai.json',
    '河北': 'json/provinces/hebei.json',
    '山西': 'json/provinces/shanxi.json',
    '内蒙古': 'json/provinces/neimenggu.json',
    '辽宁': 'json/provinces/liaoning.json',
    '吉林': 'json/provinces/jilin.json',
    '黑龙江': 'json/provinces/heilongjiang.json',
    '江苏': 'json/provinces/jiangsu.json',
    '浙江': 'json/provinces/zhejiang.json',
    '安徽': 'json/provinces/anhui.json',
    '福建': 'json/provinces/fujian.json',
    '江西': 'json/provinces/jiangxi.json',
    '山东': 'json/provinces/shandong.json',
    '河南': 'json/provinces/henan.json',
    '湖北': 'json/provinces/hubei.json',
    '湖南': 'json/provinces/hunan.json',
    '广东': 'json/provinces/guangdong.json',
    '广西': 'json/provinces/guangxi.json',
    '海南': 'json/provinces/hainan.json',
    '四川': 'json/provinces/sichuan.json',
    '贵州': 'json/provinces/guizhou.json',
    '云南': 'json/provinces/yunnan.json',
    '西藏': 'json/provinces/xizang.json',
    '陕西': 'json/provinces/shanxi1.json',
    '甘肃': 'json/provinces/gansu.json',
    '青海': 'json/provinces/qinghai.json',
    '宁夏': 'json/provinces/ningxia.json',
    '新疆': 'json/provinces/xinjiang.json',
    '北京': 'json/provinces/beijing.json',
    '天津': 'json/provinces/tianjin.json',
    '重庆': 'json/chongqing.json',
    '香港': 'json/provinces/xianggang.json',
    '台湾': 'json/provinces/taiwan.json',
    '澳门': 'json/provinces/aomen.json'
};


function get_provinces_data (data){
	var data1 = data;
	for(var i=0;i<data1.length;i++){
		if(data1[i].value){
			data1[i].tooltip = {
				formatter: function (params) {
					var tool_data = params.data;
					return tool_data.name+'<br/>'+Number(tool_data.percent)+'%<br/>'+tool_data.value+'人';

				}
			}
		}
	}
	for(var j=0;j<data1.length;j++){
		if(parseInt(data1[j].value) > 70 ){
				data1[j].label = big_item_style;
		}
	}
	return data1;
}

var data1={};
var data2={};
var big_item_style = {
	normal: {
	show: true,
		textStyle: {
			color: '#fff'
			}
		}
	}

function get_map_options(data){
	data1= get_provinces_data(data.series.map_province);
	data2= get_city_data (data.series.map_city);
	var option = {
	    title:get_chart_title(data.title),
	    tooltip: {
			trigger:'item',
			formatter: function (params) {
					return params.name;
			}
	    },
	    toolbox: toolbox_style,
	    visualMap: {
	    	type: 'continuous',
	        min: 0,
	        max: data.yAxis.max,
	        inRange: {
	        	 color: ['rgba(115, 47, 165, 0.1)', '#732FC3']
	        },
			outOfRange: {
	        	 color: ['rgba(153, 153, 153, 0.5)']
	        },
	        text: ['高', '低'],           // 文本，默认为数值文本
	        calculable: true,
	        bottom:50,
	        zlevel:2,
	    },
	    /*grid:{
	    	show:true,
	    	backgroundColor:'red'
	    },*/
	    series: [{
	        name: '选择器',
	        type: 'map',
	        mapType: 'china',
			top: '110',
			width:450,
			center: [103.8328367911,36.0653685116],
			roam: false,
			textFixed:{
				"广东": [0, -10],
				"香港": [10, 10],
				"澳门": [-10, 18],
				"黑龙江": [0, 20],
				"天津": [5, 5],
				"深圳市": [-35, 0],
				"红河哈尼族彝族自治州": [0, 20],
				"楚雄彝族自治州": [-5, 15],
				"石河子市": [-5, 5],
				"五家渠市": [0, -10],
				"昌吉回族自治州": [10, 10],
				"昌江黎族自治县": [0, 20],
				"陵水黎族自治县": [0, 20],
				"东方市": [0, 20],
				"渭南市": [0, 20]
			},
	        zoom: 1.2,
	        itemStyle: {
	            normal: {
	            	label: {
	                    show: true,
	                    textStyle: {
	                   	 color: 'rgba(0, 0, 0, 0.6)'
	                    }
	               },
	               areaColor: 'rgba(153, 153, 153, 0.5)',
	               borderWidth: 0.5,
	               borderType: 'dotted',
	               borderColor: 'rgba(255, 255, 255, 0.1)'
	            },
	            emphasis: {
	                label: {
	                    show: true
	                }
	            }
	       },
	        data: data1
	    }],
	    animation: false
	};
	return option;
}



/*初始化，拿柱图数据*/
function init_map_echarts(i){
	$.ajax({
		type: "get",
		//url: 'json/p_map.json',
		url: map_url,
		data: {

		},
		dataType: "jsonp",
		jsonp:"jsonpcallback",
		headers: {
			'X-Requested-With': "XMLHttpRequest"
		},
		xhrFields: {
			withCredentials: true
		},
		success: function(res) {
			var wrap_map_html = '<div class="wrap-map echarts-main"><div class="echarts-main-map"  id="main'+i+'"></div><ul class="wrap-return">'
			+'<li class="icon-china" id="return"><img src="img/icon_china.png" />中国</li>'
			+'<li class="icon-arrow"><img src="img/menu_arrow.png" /></li>'
			+'<li class="current-city">上海</li>'
		+'</ul></div>';
			var echarts_map = new get_map_options(res.data);
			console.log(echarts_map);
			$("body").append(wrap_map_html);
	   		var myChart = echarts.init(document.getElementById('main'+i));
	   		myChart.setOption(echarts_map);
	   		delay(myChart,echarts_map);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

function get_city_data (map_city){
	var data2 = map_city;
	for(var i=0;i<data2.length;i++){
		if(data2[i].value){
			data2[i].tooltip = {
				formatter: function (params) {
					var tool_data = params.data;
					return tool_data.name+'<br/>'+Number(tool_data.percent)+'%<br/>'+tool_data.value+'人';

				}
			}
		}
	}
	for(var j=0;j<data2.length;j++){
		if(parseInt(data2[j].value) > 70 ){
				data2[j].label = big_item_style;
		}
	}
	return data2;
}

function delay(myChart,option) {
    myChart.on("click", function(param) {
        var selectedProvince = param.name;
        if (!provinces[selectedProvince]) {
            return;
        }
        $.get(provinces[selectedProvince], function(geoJson) {
            echarts.registerMap(selectedProvince, geoJson);

        var newObject = jQuery.extend(true, {}, option);
        newObject.series[0] = {
                name: '选择器',
                type: 'map',
                mapType: selectedProvince,
                roam: true,
		        zoom: 1,
                itemStyle: {
		            normal: {
		            	label: {
		                    show: true,
		                    textStyle: {
		                   	 color: 'rgba(0, 0, 0, 0.6)'
		                    }
		               },
		               areaColor: 'rgba(153, 153, 153, 0.5)',
		               //borderWidth: 2,
		               /*borderType: 'dotted',*/
		               borderColor: 'rgba(255, 255, 255, 0.1)'
					  // borderColor: 'rgba(255, 255, 255, 1)'
		            },
		            emphasis: {
		                label: {
		                    show: true
		                }
		            }
		       },
                data: data2
            };
            myChart.setOption(newObject, true);
            console.log(newObject);
            $("ul.wrap-return").show();
            $(".current-city").text(selectedProvince);
        });
    });

    /*返回到地图*/
    $("body").on("click","#return",function(){
            myChart.setOption(option);
            $("ul.wrap-return").hide();
    });
}

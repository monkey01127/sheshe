/*重写仪表图标题数据以及样式*/
function get_gauge_title(title){
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

/*重写仪表图提示框组件*/
var tooltip_gauge_style = {
	formatter: function (params) {
		console.log(params);
		return params.name+'<br/>'+Number(params.value)+'%';
    }
}

/*设置仪表图指针指向的值*/
function set_arrow_position(val){
	var val = Number(val) + 100;
	var percent = val/200;
	return percent;
}

/*设置仪表图option数据*/
function make_gauge_chart(data) {
	/*全局设置*/
	this.color = select_color_list;
	this.textStyle = default_test_style;  /*默认全局样式,字体，字号，颜色*/
	
	/*标题设置*/
	this.title = get_gauge_title(data.title);
	
	/*工具设置，目前这有下载和数据视图*/
	this.toolbox = get_tools();
	
	/*提示框组件*/
	this.tooltip = tooltip_gauge_style;
	
	/*数据样式*/
	this.series = set_gauge_serise(data);
}

/*初始化，拿仪表图数据*/
function init_gauge_echarts(){
	$.ajax({
		type: "get",
		url: 'json/gauge.json',
		//url: 'http://10.0.3.34:8080/analytics/nps/echarts/meter/findByProjectIdAndQuestionId?project_Id=6&question_Id=q2a',
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
	   		var chart_pie = new make_gauge_chart(res.data);
	   		console.log(chart_pie);
	   		var myChart = echarts.init(document.getElementById('main'));
	   		myChart.setOption(chart_pie);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

var default_gauge_style = {
	type: "gauge",
    startAngle: 180, //总的360，设置180就是半圆
    endAngle: 0,
    center: ["50%", "56%"], //整体的位置设置
    radius: 300,
    splitLine:{
    	length: "25",
    	lineStyle: {
			width: 2,
			type: "solid",
			opacity:0.7
		},
    },
    axisTick:{
    	length: "15",
    	splitNumber: 10,
    	lineStyle: {
			width: 2,
			type: "solid",
			opacity:0.4
		},
    },
    axisLabel: {
		show: true,
		distance: 90,
		textStyle: {
			fontSize: f18
		}
	},
    min:-100,
    max:100,
    splitNumber: 4,
    pointer: {
        width: 15, //指针的宽度
        length: "60%", //指针长度，按照半圆半径的百分比
        color: "#000"
    },
    itemStyle: {
		normal: {
			color: '#b1b1b1',
		}
	},
    title: {
        show: true,
        offsetCenter: [0, "60%"], //标题位置设置
        textStyle: { //标题样式设置
            color: default_single_colors_list[0],
            fontSize: f30,
            fontWeight: "bold"
        }
    }
}


/*整理仪表图serise数据*/
function set_gauge_serise(data){
	var percent_circle = set_arrow_position(data.series.value);
	console.log(percent_circle);
	var series_data = {
	        name: data.title.text,
	        axisLine: {
	            lineStyle: {
	                width: 100, //柱子的宽度
	                opacity: 0.8,
	                color: [[percent_circle, special_color_list[0]], [1, default_single_colors_list[0]]] //0.298是百分比的比例值（小数），还有对应两个颜色值
	            }
	        },
	        "detail": {
	            "formatter":function(params){
	            	console.log(params);
	            	return data.series.text +'\n\n '+parseInt(params)+'%';
	            },
	            "offsetCenter": [0, '30%'],
	            "textStyle": {
	                "color": "#000",
	                "fontSize": f30
	            },
	            
	        },
	        animation: false,
	        data: [{value:data.series.value, name: data.series.name,}]
	    };
	    
	    series_data = $.extend(series_data, default_gauge_style);
	    console.log(series_data);
	return series_data;
}

//function set_gauge_serise_style(){
		
//}

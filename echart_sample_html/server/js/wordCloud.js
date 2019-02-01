var maskImage = new Image();

var myChart = '';

/*重写仪表图提示框组件*/
var tooltip_wordcloud_style = {
	formatter: function (params) {
		return params.name+'<br/>'+Number(params.value);
    }
}

var grid_hor_style = {

}

function make_wordcloud_chart(data) {
	/*全局设置*/
	this.color = select_color_list;
	this.textStyle = default_test_style;  /*默认全局样式,字体，字号，颜色*/

	/*标题设置*/
	this.title = get_chart_title(data.title);

	this.grid = grid_hor_style;

	this.grid = {
		/*show:true,
		backgroundColor:'red',*/
		left:30,
		right:30
	};
	this.tooltip = tooltip_wordcloud_style;

	/*工具设置，目前这有下载和数据视图*/
	this.toolbox = get_tools();

	var _this = this;

	set_wordCloud_serise(_this,data.data.series);
}

/*初始化，拿柱图数据*/
function init_wordCloud_echarts(i){
	$.ajax({
		type: "get",
		//url: 'json/wordCloud.json',
		url: wordCould_url,
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
		success: function(res) {
	   		var chart_wordcloud = new make_wordcloud_chart(res.data);
	   		console.log(chart_wordcloud);
	   		$("body").append('<div class="echarts-main wordCloud" id="main'+i+'"></div>');
	   		myChart = echarts.init(document.getElementById('main'+i));
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

/*整理wordCloud图serise数据*/
function set_wordCloud_serise(other_option,keywords){
	var data = [];
	var i = 0
    for (var name in keywords) {
        data.push({
            name: name,
            //value: Math.sqrt(keywords[name])
            value: keywords[name]
        })
    }

    var series_data = {
        series:  {
            type: 'wordCloud',
            // 设置字符字体大小的范围
            sizeRange: [12, 80],
            // 设置字符旋转的角度范围
            rotationRange: [0, 0],
           // rotationStep: 45,
            gridSize: 0,
            maskImage: maskImage,
            textStyle: {
                normal: {
                    color: function (params) {
						var len = color_list.length;
						var remainder = parseInt(params.dataIndex%len);
						return color_list[remainder];
                    }
                }
            },
           width: '100%',
          /*  height:240,*/
           // top: -10,
            data: data.sort(function (a, b) {	//把数组按从大到小的方式排序
                return b.value  - a.value;
            })
        }
    };

    series_data = $.extend(other_option, series_data);
    maskImage.onload = function() {
		myChart.setOption(series_data);
	}
	maskImage.src = 'logo.png';
}

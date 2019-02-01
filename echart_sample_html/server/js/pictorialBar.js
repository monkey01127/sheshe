var maxData = 0;

/*标题数据以及样式*/
/*function get_chart_title(title){
	title = get_title(title);
	return title;
}*/

var pictorial_grid_style = {
		//show:true,
		top: 78,
		height: 180,
		left: 110,
		right: 0,
		bottom:0/*,
		backgroundColor:'red'*/
}


function make_pictorial_chart(data) {
	/*全局设置*/
	this.color = select_color_list;
	this.textStyle = default_test_style;  /*默认全局样式,字体，字号，颜色*/

	//maxData = sum_arr(data.data.series.data);
	maxData = 100;

	/*标题设置*/
	this.title = get_chart_title(data.title);

	/*工具设置，目前这有下载和数据视图*/
	this.toolbox = get_tools();

	/*提示框组件*/
	this.tooltip = tooltip_pictorial_style;

	/*y轴样式*/
	this.yAxis = yAxis_style;
	this.yAxis.axisLabel = axisLabel_style;
	this.yAxis.data = y_pictorial_data(data);

	/*grid轴样式*/
	this.grid = pictorial_grid_style;

	/*y轴样式*/
	this.xAxis = xAxis_style;
	this.xAxis.max=maxData,

	/*数据样式*/
	this.series = set_serise_data(data.data.series.data);
}

/*初始化，拿柱图数据*/
function init_pictorial_echarts(i){
	$.ajax({
		type: "get",
	//	url: 'json/pictorialBar.json',
		url: pictogram_url,
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
	   		var chart_pie = new make_pictorial_chart(res.data);
	   		$("body").append('<div class="echarts-main echarts-main-pictorialBar" id="main'+i+'"></div>');
	   		var myChart = echarts.init(document.getElementById('main'+i));
	   		console.log(chart_pie);
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

var green_path = 'path://M0,249 C0,386.531 111.469,498 249,498 C386.5144,498 498,386.531 498,249 C498,111.4856 386.5144,0 249,0 C111.469,0 0,111.4856 0,249 Z M290.5,182.6 C290.5,159.6754 309.092,141.1 332,141.1 C354.9246,141.1 373.5,159.6754 373.5,182.6 C373.5,205.508 354.9246,224.1 332,224.1 C309.092,224.1 290.5,205.508 290.5,182.6 Z M124.5,182.6 C124.5,159.6754 143.092,141.1 166,141.1 C188.9246,141.1 207.5,159.6754 207.5,182.6 C207.5,205.508 188.9246,224.1 166,224.1 C143.092,224.1 124.5,205.508 124.5,182.6 Z M336.5318,299.0158 C340.9806,292.3592 350.011,290.5664 356.6842,295.0318 C363.3408,299.4806 365.1336,308.511 360.6682,315.1676 C337.4614,349.8782 295.231,371.425 248.9668,371.425 C202.7524,371.425 160.5718,349.928 137.3318,315.2838 C132.8664,308.6438 134.6426,299.6134 141.3158,295.1314 C147.9724,290.666 157.0028,292.4422 161.4682,299.1154 C179.1804,325.526 212.2476,342.375 248.9668,342.375 C285.7358,342.375 318.8196,325.4762 336.5318,299.0158 Z';
var yellow_path = 'path://M10.2565161,249 C10.2565161,386.531 121.178839,498 258.014968,498 C394.834581,498 505.740387,386.531 505.740387,249 C505.740387,111.4856 394.834581,0 258.014968,0 C121.178839,0 10.2565161,111.4856 10.2565161,249 Z M299.30529,182.6 C299.30529,159.6754 317.786839,141.1 340.579097,141.1 C363.387871,141.1 381.869419,159.6754 381.869419,182.6 C381.869419,205.508 363.387871,224.1 340.579097,224.1 C317.786839,224.1 299.30529,205.508 299.30529,182.6 Z M134.127484,182.6 C134.127484,159.6754 152.625548,141.1 175.417806,141.1 C198.226581,141.1 216.724645,159.6754 216.724645,182.6 C216.724645,205.508 198.226581,224.1 175.417806,224.1 C152.625548,224.1 134.127484,205.508 134.127484,182.6 Z M144.466581,329.925 C144.466581,321.9072 150.924387,315.4 158.901677,315.4 L357.095226,315.4 C365.072516,315.4 371.563355,321.9072 371.563355,329.925 C371.563355,337.9428 365.072516,344.45 357.095226,344.45 L158.901677,344.45 C150.924387,344.45 144.466581,337.9428 144.466581,329.925 Z';var red_path = 'path://m 100.55702,161.03384 c -6.077439,-1.21802 -8.357637,-8.69503 -4.007038,-13.13952 4.820698,-4.92474 13.254328,-1.44121 13.254328,5.47473 0,4.87383 -4.51213,8.61379 -9.24729,7.66479 z m -0.759346,-4.37014 c 1.200056,-0.91533 2.469196,-1.08812 3.700536,-0.50381 0.54186,0.25713 1.04654,0.62735 1.12151,0.82271 0.20972,0.54653 1.13802,0.43807 1.13802,-0.13296 0,-0.97295 -2.03243,-2.15767 -3.70157,-2.15767 -1.77676,0 -3.954581,1.35381 -3.612375,2.24559 0.205632,0.53587 0.32354,0.51202 1.353879,-0.27386 z m 0.615486,-4.4059 c 0.40929,-0.40929 0.40929,-1.60154 0,-2.01083 -0.40929,-0.40929 -1.601547,-0.40929 -2.010836,0 -0.409289,0.40929 -0.409289,1.60154 0,2.01083 0.409289,0.40929 1.601546,0.40929 2.010836,0 z m 5.29166,0 c 0.40929,-0.40929 0.40929,-1.60154 0,-2.01083 -0.40928,-0.40929 -1.60154,-0.40929 -2.01083,0 -0.17462,0.17462 -0.3175,0.62706 -0.3175,1.00541 0,0.37836 0.14288,0.83079 0.3175,1.00542 0.40929,0.40929 1.60155,0.40929 2.01083,0 z';
var red_path = 'path://m 100.55702,161.03384 c -6.077439,-1.21802 -8.357637,-8.69503 -4.007038,-13.13952 4.820698,-4.92474 13.254328,-1.44121 13.254328,5.47473 0,4.87383 -4.51213,8.61379 -9.24729,7.66479 z m -0.759346,-4.37014 c 1.200056,-0.91533 2.469196,-1.08812 3.700536,-0.50381 0.54186,0.25713 1.04654,0.62735 1.12151,0.82271 0.20972,0.54653 1.13802,0.43807 1.13802,-0.13296 0,-0.97295 -2.03243,-2.15767 -3.70157,-2.15767 -1.77676,0 -3.954581,1.35381 -3.612375,2.24559 0.205632,0.53587 0.32354,0.51202 1.353879,-0.27386 z m 0.615486,-4.4059 c 0.40929,-0.40929 0.40929,-1.60154 0,-2.01083 -0.40929,-0.40929 -1.601547,-0.40929 -2.010836,0 -0.409289,0.40929 -0.409289,1.60154 0,2.01083 0.409289,0.40929 1.601546,0.40929 2.010836,0 z m 5.29166,0 c 0.40929,-0.40929 0.40929,-1.60154 0,-2.01083 -0.40928,-0.40929 -1.60154,-0.40929 -2.01083,0 -0.17462,0.17462 -0.3175,0.62706 -0.3175,1.00541 0,0.37836 0.14288,0.83079 0.3175,1.00542 0.40929,0.40929 1.60155,0.40929 2.01083,0 z';
var symbol_list = [red_path,yellow_path,green_path];
var color_pictorialBar_list = ['#DC1E35','#F6A623','#40BA2C'];
/*整理serise数据*/
function set_serise_data(data){
	var series_data = set_pictorial_serise(data);
	return series_data;
}

/*默认象形图属性*/
var default_pictorial_style = {
	animation: false,
    type: 'pictorialBar',
    symbolRepeat: '10',
   	symbolMargin: '0',
    symbolClip: true,
    symbolSize: 40,
    symbolBoundingData: 100,
}

/*整理pictorial图serise数据*/
function set_pictorial_serise(data){
	var serise_data = [];
	var len = 2;
	var data_list = [];
	var list = {};
	var data_list_obj = {};
	for (var j=0;j<data.length;j++){
		data_list_obj = {
			value: data[j].percent,
			percent: data[j].value,
			people: data[j].percent,
			symbol: symbol_list[j],
			itemStyle: {
				normal: {
					color: color_pictorialBar_list[j]
				}
			}
		}
		data_list.push(data_list_obj);
		list.data = data_list;
	};

	/*复制数据*/
	series_data_list = $.extend(list, default_pictorial_style);
	var newObject = jQuery.extend(true, {}, series_data_list);

	for(var i=0;i<3;i++ ){
		newObject.data[i].value = 100;
		newObject.data[i].itemStyle = {
	            normal: {
	                opacity: 0.2,
	                color: '#b1b1b1'
	            }
	        }
	}
	newObject.z = -5;

	serise_data.push(series_data_list);
	serise_data.push(newObject);
	return serise_data;
}


/*重写提示框组件。*/
var tooltip_pictorial_style = {
	formatter: function (params) {
		var name = params.name;
		return name.split(' ')[0]+'<br/>'+params.data.people+'%<br/>'+params.data.percent+'人';
		//return Number(params.percent).toFixed(1)+'%<br/>'+params.name+'<br/>'+params.value+'人';
   }
}

/*整理y轴数据*/
function y_pictorial_data(all_data){
	var series_data = all_data.data.series.data;
	var y_data = all_data.yAxis.data;
	for(var i=0;i<series_data.length;i++){
		y_data[i] = y_data[i] + ' '+ parseInt(series_data[i].percent) + '%';
	}
	return y_data;
}

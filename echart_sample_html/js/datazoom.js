/*比例最小为3*/
var min_block_value = 3;
var default_colors_list = ['#732FC3','#9663D2','#9D82EF','#7D68BF','#C08FE7','#A0435F','#BB7676','#C95477'
,'#EA9494','#D25459','#EF955D','#E4B84B','#C2A014','#5C9C1A','#008760','#40A588','#4C7F5C','#5F9F74','#87B797',
'#A1C5B8','#57979D','#1F92A8','#55B0D3','#459FC5','#077FB1','#05658D'];

var default_single_colors_list = ['#732FC3','#824DD2','#9067E0','#9D82EF','#ADA1FF','#C0B7FF','#B7B1DD','#A099D0'
,'#8A83BB','#726BA4','#5D5690','#443C78','#5A287B','#70438F','#885FA3','#9F7BB8','#B595CB','#D0B5E2','#D1A3F1',
'#C085EA','#AA69DF','#9B58D6','#8B37D0','#7811BD'];

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

var xAxis_style = {
	xAxis: {
	    type: 'value',
	    min: 'dataMin',
	    max: 'dataMax',
	    splitLine: {
	        show: true
	    }
	}
}
	

var yAxis_style = {
	yAxis: {
	    type: 'value',
	    min: 'dataMin',
	    max: 'dataMax',
	    splitLine: {
	        show: true
	    }
	}
}

var dataZoom_style = [
        {
            type: 'slider',
            xAxisIndex: [0],
            //backgroundColor: 'red',
            dataBackground: {
				lineStyle: {
					color: '#732FC3',
					width: 0.5,
					type: 'solid',
					/*shadowBlur: ...,
					shadowColor: ...,*/
					shadowOffsetX: 0,
					shadowOffsetY: 0,
					opacity: 0.2,
				},
				areaStyle: {
					color: '#732FC3',
				/*	shadowBlur: ...,
					shadowColor: ...,*/
					shadowOffsetX: 0,
					shadowOffsetY: 0,
					opacity: 0.1,
				},
			},
			fillerColor:'rgba(115, 47, 195, 0.1)',
			borderColor:'#EAEAEA',
			//handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
	        handleSize: '80%',
	        handleStyle: {
	            color: '#B997E1',
	            //opacity: 0.8,
	            shadowBlur: 3,
	            shadowColor: 'rgba(185, 151, 255, 0.3)',
	            shadowOffsetX: 2,
	            shadowOffsetY: 2
	        },
            start: 1,
            end: 30
        }
    ]

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
	this.xAxis.data = get_x_data();
	
	//this.xAxis.type = 'value';
	//this.xAxis = xAxis_style;
/*	this.xAxis.axisLabel = axisLabel_style;
	this.xAxis.data = data.xAxis.data;*/
	
	/*y轴样式*/
	this.yAxis = yAxis_style;
	//this.yAxis = yAxis_style;
/*	this.yAxis.show = false;*/
	
	this.dataZoom = dataZoom_style;
	
	/*数据样式*/
	//this.series = set_serise_data(data);
	this.series = get_test_serise();
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

function get_test_serise(){
	var serise_data = {};
	serise_data.data = get_random();
	serise_data.type = 'bar';
	serise_data.barCategoryGap = '34%';
	return serise_data;
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

function get_random(){
	var serise_data = [];
	for(var i=0;i<100;i++){
		// serise_data.push([random(15), random(10), random(1)]);
		 //serise_data.push([random(100)]);
		serise_data.push(random(100));
	}
	console.log(serise_data);
	return serise_data;
}

function get_x_data(){
	var name_data = [];
	for(var i=0;i<100;i++){
		name_data.push('x'+i);
	}
	return name_data;
}

var random = function (max) {
    return parseInt(Math.random() * max);
};
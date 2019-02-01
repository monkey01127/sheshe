/*全局的字体样式*/
var text_style = {
	color: '#000',
	fontStyle: 'normal',
	fontWeight: 'normal',
	fontFamily: 'Microsoft Yahei',
	fontSize: 14,
}

/*正标题，副标题样式*/
var title_style = {
	fontWeight: 'bolder',
	fontSize: 16
}

var subtext_style = {
	fontSize: 14,
	color: '#9b9b9b'
}

/*数据来源样式*/
var data_source_style = {
	fontSize: 12,
	fontWeight: 'normal',
	color: '#9b9b9b'
}

/*图例样式*/
var legend_top = 50;
var legend_style = {
	left: '50%',
	right: '0',
	itemGap: 12,
	itemWidth: 12,
	itemHeight: 12,
	top: legend_top,
}

/*直角坐标系内绘图网格*/
var grid_style = {
	left: '0',
	/*top:'30%',*/
	top: 100,
	right: 40,
	/*bottom: '25%',*/
	bottom: 120,
	containLabel: true,
	show: false
}

var toolbox_style = {
	itemSize: 20,
	itemGap: 15,
	right: 30,
	feature: {
		saveAsImage: {},
		dataView: {}
	}
}

/*提示框组件。*/
var tooltip_style = {
	formatter: function (params) {
		return Number(params.value).toFixed(1)+'%<br/>'+params.name+'<br/>'+params.value+'人';
   }
}

/*图表上数字样式*/
var lableStyle ={
	normal: {
		show: true,
		position: 'inside',
		textStyle: {
			color: '#fff',
		}
	}
}

/*标记图形*/
var symbol_arr = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'];

/*图形样式*/
//var item_color_arr = ['rgb(91,155,213)', 'rgb(237,125,49)', 'rgb(255,192,0)', 'rgb(68,114,196)', 'rgb(122,173,71)', 'rgb(165,165,165)', 'rgb(255,80,80)'];

var item_color_arr = ['#350584','#4c1999','#5f24af','#732fc3','#8742c8','#9c5dd0','#b077dd','#be8fe1','#cca3eb','#d7b6ee'];

var item_kind_color_arr = ['#d3a600','#b41866','#34c7cb','#5f24af','#52c764','#5ba3dc','#da519b','#edcd00','#277bbd','#b077dd'];

/*x轴的样式*/
var xAxis_style = {
	inverse: true,
	axisLabel: {
		margin: 15/*,
		rotate: 45,*/
	},
	
	//boundaryGap: false,
	/*axisLine:{
		show:false
	},*/
	axisTick: {
		show: false
	}
}

var yAxis_style = {
	/*
	 * show:false,
	 * axisLine:{
		show:false
	},
	axisTick: {
		show: false
	},
	show:false,*/
	/*min: 0,
	interval: 100,
	max: 500*/
}

var graphic_style = {
	type: 'image',
	id: 'logo',
	right: 'center',
	top: 'center',
	z: -10,
	bounding: 'raw',
	origin: [75, 75],
	style: {
		image: 'img/logo.png',
		width: 150,
		height: 150,
		opacity: 1
	}
}

function make_chart(list,num) {
	this.list = list;
	
	this.textStyle = textStyle,
	this.title = [{
		text: '正标题',
		textStyle: title_style,
		subtext: '负标题',
		subtextStyle: subtext_style
	},{
		left: '0',
		top: 700,
		text: '基数: 所有被访者 n=400 \n\n数据来源：B12',
		textStyle: data_source_style,
	}];
	/*this.title[0] = {
		text: '正标题',
		textStyle: title_style,
		subtext: '负标题',
		subtextStyle: subtext_style
	};
	this.title[1] = {
		left: '0',
		top: 700,
		text: '基数: 所有被访者 n=400 \n\n数据来源：B12',
		textStyle: data_source_style,
	};*/
	this.legend = legend_style;
	this.legend.data = list.legend;

	this.grid = grid_style;
	this.toolbox = toolbox_style;
	this.xAxis = xAxis_style;
	this.xAxis.type = list.config.axis.xAxis.type;
	this.xAxis.data = list.config.axis.xAxis.data;

	this.yAxis = yAxis_style;
	this.yAxis.type = list.config.axis.yAxis.type;
	this.yAxis.data = list.config.axis.yAxis.data;
	this.graphic = graphic_style;
	this.add_div(num);
	this.series = this.getSeries(list.data);
	
	this.tooltip = tooltip_style;

}

var interval = 45;

var half = "50%";
make_chart.prototype = {
	constructor: make_chart, //原型字面量方式会将对象的constructor变为Object，此外强制指回Person
	set_grid_height: function(list,i){
		
		var all_height = 800;
			if(list.type == 'bar' ){
				var yAxis_length = list.config.axis.yAxis.data.length;
				var fixed_height = 230;
				if(list.legend.length > 10){
					fixed_height = 300;
					grid_style.top = 190;
					
				}
				if(yAxis_length >0 ){
					$('#main'+i).css("border","2px solid red");
					var grid_height = yAxis_length *interval;
					all_height = grid_height + fixed_height;
					this.title[1].top = all_height -100;
					//$$('main'+i).style.height = all_height +'px';
					//this.title[1].top = all_height - 300;
				}
			}
			return all_height;
		},
	add_div: function(num){
		var _this = this.list;
		var _this_source =this.title 
		var all_height = this.set_grid_height(_this,num);
		var Odiv = document.createElement("div"); //创建一个div
		Odiv.setAttribute("id", "main"+num);
		Odiv.style.cssText = "width: 100%; box-sizing: border-box; height: "+all_height+"px; margin: 0 auto;"; //创建div的css样式
		document.body.appendChild(Odiv);
	},
	getSeries: function(series_data) {
		var series_arr = [];
		for(var i = 0; i < series_data.length; i++) {
			var item_style = {
				normal: {
					color: item_color_arr[i]
				}
			}
			
			/*if(series_data[i].type == 'line'){
				lableStyle.normal.show = false;
			}*/

			var item = {
				name: series_data[i].name,
				type: series_data[i].type,
				symbol: symbol_arr[i],
				symbolSize: 20,
				itemStyle: item_style,
				data:series_data[i].data,
				label:lableStyle,
			}
			
			
			if(series_data[i].stack == 'stack'){
				item.stack = series_data[i].stack;
			}
			
			if(series_data[i].type == "bar"){
				item.barCategoryGap = '40%';
			}
			
			series_arr.push(item);
			
		}
		return series_arr;
	}
}

//封装$$
function $$(id){
	return document.getElementById(id);
}

init_echarts();

function init_echarts(){
	$.ajax({
		type: "get",
		url: 'json/simple.json',
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
			var list_arr = res.list;
			for(var i=0;i<list_arr.length;i++ ){
    			eval("var chart"+i+"=new make_chart(list_arr[i] , "+i+");");
    			var chart = 'myChart'+i ;
    			chart = echarts.init($$('main'+i));
    			console.log(eval("chart"+i));
    		//	set_grid_height(list_arr[i],i);
    			chart.setOption(eval("chart"+i));
	    }
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

function choose(){
	item_color_arr = item_kind_color_arr;
	init_echarts();
}

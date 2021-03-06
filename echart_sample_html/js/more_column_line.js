/*比例最小为3*/
var min_block_value = 3;
var default_colors_list = ['#732FC3','#9663D2','#9D82EF','#7D68BF','#C08FE7','#A0435F','#BB7676','#C95477'
,'#EA9494','#D25459','#EF955D','#E4B84B','#C2A014','#5C9C1A','#008760','#40A588','#4C7F5C','#5F9F74','#87B797',
'#A1C5B8','#57979D','#1F92A8','#55B0D3','#459FC5','#077FB1','#05658D'];

var default_single_colors_list = ['#732FC3','#824DD2','#9067E0','#9D82EF','#ADA1FF','#C0B7FF','#B7B1DD','#A099D0'
,'#8A83BB','#726BA4','#5D5690','#443C78','#5A287B','#70438F','#885FA3','#9F7BB8','#B595CB','#D0B5E2','#D1A3F1',
'#C085EA','#AA69DF','#9B58D6','#8B37D0','#7811BD'];


var icon_line_list = ['rect', 'circle', 'triangle', 'diamond', 'arrow','path://M85.824691 395.069871c-45.524846 14.613836 0.240477 58.026578 0.240477 58.026578L240.302995 581.87544l480.002238-284.209994c0 0-324.257082 249.802346-423.188278 327.219553L631.373785 877.839129c52.878324 34.872229 66.652026 7.013741 66.652026 7.013741l23.223934-55.231929 235.68686-655.987369c8.836249-22.785959-16.068977-48.846498-42.760896-44.568055L85.824691 395.069871 85.824691 395.069871zM427.285596 778.927375l-127.845737-95.472422-0.420579 184.699606L427.285596 778.927375 427.285596 778.927375zM427.285596 778.927375'];

function get_chart_title(title){
	title = [{
		text: title.text,
		subtext: title.subtext,
		textStyle: title_text_style,
		subtextStyle: subtext_text_style
	},{
		left: '0',
		top: '85%',
		subtext: title.source,
		textStyle: data_source_style,
	}];
	return title;
}

var normal_style = {
	normal:{
		show:true,
		position:'inside',
		formatter:function(params){
			var p_value = params.value>3 ? params.value :'';
	    	return p_value;
	   },
	   textStyle:{
	   		color: '#fff'
	   }
	}
}

function get_bar_series(){
	var series ={};
	//series.hoverAnimation = false;
	series.normal = {   
				show:true,
				position:'inside',
				formatter:function(params){
					console.log(params);
                	return set_percent(params.percent)
               },
               textStyle:{
               		color: '#fff'
               }
	}
	return series;
}


function make_chart(data) {
	//this.list = list;
	this.color = select_color_list;
	this.textStyle = default_test_style,
	this.title = get_chart_title(data.title);
	
	this.legend = get_legend(data.legend.data);
	
	this.toolbox = get_tools();
	
	this.tooltip = tooltip_style;
	//this.series = get_bar_series(data.series.type);
	
	this.grid = grid_left_style;
/*	this.xAxis = xAxis_style;
	this.xAxis.show = false;*/
	
	//this.yAxis = yAxis_style;
	this.xAxis = {};
	this.xAxis = {
		 type : 'category'/*,
		 data : data.xAxis.data*/
	};
	
	this.yAxis = {
		 type : 'value'
	};
	//sthis.yAxis.axisLabel = axisLabel_style;
	this.xAxis.data = data.xAxis.data;
	
	var s_part1 = get_bar_series();
	var s_part2 = this.getSeries(data.series.data);
	
	this.series = this.getSeries(data.series.data);
	
}


make_chart.prototype = {
	constructor: make_chart, //原型字面量方式会将对象的constructor变为Object，此外强制指回Person
/*	set_grid_height: function(list,i){
		
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
	},*/
	getSeries: function(series_data) {
		var series_arr = [];
		for(var i = 0; i < series_data.length; i++) {
			var item = {
				type: 'line',
				symbol:icon_line_list[i],
				symbolSize: 20,
				name: series_data[i].name,
				data:series_data[i].data_arr
			}
		
			series_arr.push(item);
			
		}
		//series_arr= series_data;
		return series_arr;
	}
}

//init_echarts();

function init_echarts(){
	$.ajax({
		type: "get",
		url: 'json/more_column_line.json',
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
	   		var myChart = echarts.init(document.getElementById('main'));
	   		myChart.setOption(chart_pie);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}


function select_color(obj){
	console.log(obj.getAttribute('data-id'));
	if(obj.getAttribute('data-id') == 'purple'){
		select_color_list = default_single_colors_list;
	}else{
		select_color_list = default_colors_list;
	}
	init_echarts();
}


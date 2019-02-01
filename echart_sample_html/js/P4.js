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

function make_chart(data) {
	/*全局设置*/
	this.color = select_color_list;
	this.textStyle = default_test_style;  /*默认全局样式,字体，字号，颜色*/

	/*标题设置*/
	this.title = get_chart_title(data.title);

	/*图例设置*/
	//this.legend = {};
	this.legend = get_hor_legend(data.legend.data);
	//this.legend.data = data.legend.data;
	//this.legend.bottom = 65;

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

var myChart = '';

/*初始化，拿柱图数据*/
function init_echarts(){
	$.ajax({
		type: "get",
		url: 'json/P4.json',
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
	   		set_single_legend_height($$('main'),res.data);
	   		myChart = echarts.init(document.getElementById('main'));
	   		myChart.setOption(chart_pie);

				 init_echarts_click();
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
/*	obj.barCategoryGap = '34%';
	obj.label = normal_style;*/
	series_data=  obj;
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

function init_echarts_click(){
		myChart.on('legendselectchanged', function (params) {
			console.log(params);
			city_color = ['#077FB1','#E4B84B','#40A588','#AC8957'];
			var city_obj = {};
			 for(var i=0;i<city_array.length;i++){
        city_obj.city_name = city_array[i];
        getBoundary(city_obj);
    }
		k = 0;
			// 获取点击图例的选中状态
			var isSelected = params.selected[params.name];
			// 在控制台中打印
			console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);
			// 打印所有图例的状态
			console.log(params.selected);
	});
}

/*地图部分*/
// 百度地图API功能
	var map = new BMap.Map("allmap");
	map.centerAndZoom(new BMap.Point(116.403765, 39.914850), 5);
	map.enableScrollWheelZoom();

  var k = 0;
	function getBoundary(city){
		var bdary = new BMap.Boundary();
		bdary.get(city.city_name, function(rs){       //获取行政区域
			var count = rs.boundaries.length; //行政区域的点有多少个
			if (count === 0) {
				alert('未能获取当前输入行政区域');
				return ;
			}
          	var pointArray = [];
			for (var i = 0; i < count; i++) {
        console.log(k);
				var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, fillColor:city_color[k],strokeColor: city_color[k]}); //建立多边形覆盖物
				map.addOverlay(ply);  //添加覆盖物
        k++;
				pointArray = pointArray.concat(ply.getPath());
			}
		//	map.setViewport(pointArray);    //调整视野
			addlabel();
		});
	}

	/*setTimeout(function(){
		getBoundary();
	}, 2000);*/

  var city_array = ['青岛市','盐城市','海门市','临汾市'];
  var city_color = ['#732FC3','#EF955D','#F3C81A','#73C421'];

  setTimeout(function(){
    	map.clearOverlays();        //清除地图覆盖物
      var city_obj = {};
  for(var i=0;i<city_array.length;i++){
        city_obj.city_name = city_array[i];
        getBoundary(city_obj);
    }
  }, 2000);







	function addlabel() {
	    var pointArray = [
	      new BMap.Point(121.716076,23.703799),
	      new BMap.Point(112.121885,14.570616),
	      new BMap.Point(123.776573,25.695422)];
	    var optsArray = [{},{},{}];
	    var labelArray = [];
	    var contentArray = [
	      "台湾是中国的！",
	      "南海是中国的！",
	      "钓鱼岛是中国的！"];
	    for(var i = 0;i < pointArray.length; i++) {
	      optsArray[i].position = pointArray[i];
	      labelArray[i] = new BMap.Label(contentArray[i],optsArray[i]);
	      labelArray[i].setStyle({
			  color : "red",
			  fontSize : "12px",
				 height : "20px",
				 lineHeight : "20px",
				 fontFamily:"微软雅黑"
			 });
	      map.addOverlay(labelArray[i]);
	    }
	}

  setTimeout(function(){

  },5000);













/*两列对比横向__条形图*/
get_two_coloum_data();
function get_two_coloum_data(){
	$.ajax({
		type: "get",
		url: 'json/bar3.json',
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
			render_page(res.data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			Toast("可能网络不佳 ＞﹏＜ 请小主重试一下");
		}
	});
}

$("body").on("click",".color-list ul li",function(){
		var index = $(this).index();
		var type = $(this).attr("data-type");
		console.log(index);
		if(index == 0){
			color_arr = color_arr_purple;
		}else if(index == 1){
			color_arr = color_arr_rainbow_first;
		}else if(index == 2){
			color_arr = color_arr_rainbow_second;
		}else if(index == 3){
			color_arr = color_arr_rainbow_third;
		}
		get_two_coloum_data();
	});
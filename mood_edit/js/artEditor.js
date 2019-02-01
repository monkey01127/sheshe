/**
 * 移动端富文本编辑器
 * @author ganzw@gmail.com
 * @url    https://github.com/baixuexiyang/artEditor
 */
$.fn.extend({
	_opt: {
		placeholader: '<p style="color:#d5d5d5!important;">写下我的心事</p>',
		validHtml: [],
		limitSize: 3,
		showServer: false
	},
	artEditor: function(options) {
		var _this = this,
			styles = {
				"-webkit-user-select": "text",
				"user-select": "text",
				"overflow-y": "auto",
				"text-break": "brak-all",
				"outline": "none",
				"cursor": "text"
			};
		$(this).css(styles).attr("contenteditable", true);
		_this._opt = $.extend(_this._opt, options);
		try{
			$(_this._opt.imgTar).on('change', function(e) {
				$("#loading, .loading-tips,.pop-bg").show();
				var file  = e.target.files[0];
				//e.target.value = '';
				if(Math.ceil(file.size/1024/1024) > _this._opt.limitSize) {
					successTips("图片太大了！");
					$("#loading, .loading-tips,.pop-bg").hide();
					console.error('文件太大');
					return;
				}
				
                var reader = new FileReader();
                reader.readAsDataURL(file);
              
                reader.onload = function(f) {
		 		var result = f.target.result;
		 		var img = new Image();
		 		img.src = f.target.result;
		
		 		var regExp = /\w{3,4}$/;
		 		var filevalue = $("#imageUpload").val();
		 		var ext = regExp.exec(filevalue);
		
		 		ext = JSON.stringify(ext);
		 		pic_type = ext.substring(2, ext.length - 2);
            		
                	if(_this._opt.showServer) {
                		
                		_this.upload(result,pic_type,f.name);
                		/*if(result.length <= maxsize) {
                			console.log("未压缩");
                			_this.upload(result,pic_type,f.name);
                		}else{
				            if(img.complete) {
				                callback();
				            } else {
				                img.onload = callback;
				            }
                		}
                		
			            function callback() {
			                var data = compress(img);
			                console.log(data.length);
			                _this.upload(data,pic_type,f.name);
			                img = null;
			            }*/
                		return ;
                	}
            		var img = '<img src='+ f.target.result +'/>';
            	    _this.insertImage(img);
            	    if(_this._opt.pageType==1){
                		saveCache();
                	}
                };
			});
			_this.placeholderHandler();
			_this.pasteHandler();
		} catch(e) {
			console.log(e);
		}
		if(_this._opt.formInputId && $('#'+_this._opt.formInputId)[0]) {
			$(_this).on('input', function() {
				$('#'+_this._opt.formInputId).val(_this.getValue());
			});
		}
	},
	upload: function(data,filetype,fileName) {
		var _this = this, filed = _this._opt.uploadField;
		var options = {
			type: 'post', // 提交方式 get/post
			url: _this._opt.uploadUrl, // 需要提交的 url
			dataType: 'json',
			headers: {
				'X-Requested-With': "XMLHttpRequest"
			},
			xhrFields: {
				withCredentials: true
			},
			success: function(res) { // data 保存提交后返回的数据，一般为 json 数据
				
				
				if(res.code=="200"){
					var src = _this._opt.uploadSuccess(res.data.url);
					var file_arr=[];
					file_arr=src.split(".");
					var len=file_arr.length;
					var fileType_reset=file_arr[len-1];
					src=src+"@"+editWidth+"w_1o."+fileType_reset.toLowerCase();
					var img = '<img class="insert-img'+_this._opt.imgNums+ '" src="'+ src +'" />';
					
  			    	_this.insertImage(img);
  			    	/*点击位置，1.如果是可输入区域的上半部分，则直接插入2.如果是下半部分，则是滚动输入；3.如果是整张图拍要看点击上班部分，还是下半部分，无法判定滚动*/
			    	setTimeout(function(){
			    		$(".insert-img"+_this._opt.imgNums).css("border","1px solid red;");
				    	var img_height=$(".insert-img"+_this._opt.imgNums).outerHeight();
				    	
				    	var c_position=_this._opt.clickPositon-80;
				    	var w_height=$(window).height()-80;
				    	var s_height=w_height-c_position;
				    	
				    	var scrollTop=$("#content").scrollTop();
				    	half_height=Math.floor(w_height/2);
				    	if(c_position>half_height){
				    		$("#content").animate({"scrollTop":scrollTop+c_position});
				    	}
				    	_this._opt.imgNums++;
			    	},500);
			    	
			    	$(".insert-img"+_this._opt.imgNums).load(function(){
						$("#loading, .loading-tips,.pop-bg").hide();
					});
			    	
			    	
			    	//set_focus($$("content"));
			    	
			    	$(".wrap-operate").fadeIn();
			    	$(".save").show();
			    	if(_this._opt.pageType==1){
			    		saveCache();
			    	}
				}else{
					_this._opt.uploadError(res.error);
					$("#loading, .loading-tips,.pop-bg").hide();
				}
				
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$("#loading, .loading-tips,.pop-bg").hide();
				successTips("可能网络不佳 ＞﹏＜ 请小主重试一下");
			},
		}
		$('#moodForm').ajaxSubmit(options);
	},
	insertImage: function(src) {
	    $(this).focus();
	  	//set_focus($$("content"));
		var selection = window.getSelection ? window.getSelection() : document.selection;
		var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
		if (!window.getSelection) {
		    range.pasteHTML(src);
		    range.collapse(false);
		    range.select();
		} else {
		    range.collapse(false);
		    var hasR = range.createContextualFragment(src);
		    var hasLastChild = hasR.lastChild;
		    while (hasLastChild && hasLastChild.nodeName.toLowerCase() == "br" && hasLastChild.previousSibling && hasLastChild.previousSibling.nodeName.toLowerCase() == "br") {
		        var e = hasLastChild;
		        hasLastChild = hasLastChild.previousSibling;
		        hasR.removeChild(e);
		    }
		    //range.insertNode(range.createContextualFragment("<br/>"));
		    range.insertNode(hasR);
		    if (hasLastChild) {
		        range.setEndAfter(hasLastChild);
		        range.setStartAfter(hasLastChild);
		    }
		    selection.removeAllRanges();
		    selection.addRange(range);
		}
		if(this._opt.formInputId && $('#'+this._opt.formInputId)[0]) {
			$('#'+this._opt.formInputId).val(this.getValue());
		}
		$(this).focus();
	},
	pasteHandler: function() {
		var _this = this;
		$(this).on("paste", function(e) {
			checkInput();
			console.log(e.clipboardData.items);
			var content = $(this).html();
			console.log(content);
			valiHTML = _this._opt.validHtml;
			content = content.replace(/_moz_dirty=""/gi, "").replace(/\[/g, "[[-").replace(/\]/g, "-]]").replace(/<\/ ?tr[^>]*>/gi, "[br]").replace(/<\/ ?td[^>]*>/gi, "&nbsp;&nbsp;").replace(/<(ul|dl|ol)[^>]*>/gi, "[br]").replace(/<(li|dd)[^>]*>/gi, "[br]").replace(/<p [^>]*>/gi, "[br]").replace(new RegExp("<(/?(?:" + valiHTML.join("|") + ")[^>]*)>", "gi"), "[$1]").replace(new RegExp('<span([^>]*class="?at"?[^>]*)>', "gi"), "[span$1]").replace(/<[^>]*>/g, "").replace(/\[\[\-/g, "[").replace(/\-\]\]/g, "]").replace(new RegExp("\\[(/?(?:" + valiHTML.join("|") + "|img|span)[^\\]]*)\\]", "gi"), "<$1>");
			if (!/firefox/.test(navigator.userAgent.toLowerCase())) {
			    content = content.replace(/\r?\n/gi, "<br>");
			}
			$(this).html(content);
		});
	},
	placeholderHandler: function() {
		var _this = this;
		$(this).on('click', function(event) {
			var e = event || window.event;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x = e.pageX || e.clientX + scrollX;
            var y = e.pageY || e.clientY + scrollY;
            _this._opt.clickPositon=y;
		});
		//var isIOS = (/iphone|ipad/gi).test(navigator.appVersion);

		$(this).on('focus', function() {
			$(".del-operate").fadeOut();
			$(".wrap-operate").fadeIn();
			if($.trim($(this).html()) === _this._opt.placeholader) {
				$(this).html('');
				set_focus($$("content"));
			}
			
		})
		.on('blur', function() {
				if(!$(this).html()) {
				$(this).html(_this._opt.placeholader);
			}
		});

		if(!$.trim($(this).text())) {
			$(this).html(_this._opt.placeholader);
		}
	},
	getValue: function() {
		return $(this).html();
	},
	setValue: function(str) {
		$(this).html(str);
	}
});

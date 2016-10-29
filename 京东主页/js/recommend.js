// recommend
$(function(){
	
	// 实现图片轮播
	var imgIndex = 0;
	var imgWidth = 1000;
	var per = 4;   // 每一轮轮播移动图片的数目
	
	// 将前四张图片克隆，放到最后面
	for(var i = 0; i < per; i++){
		$("#recommendImgList li").eq(i).clone().appendTo($("#recommendImgList"));
	}
	
	var imgSum = $("#recommendImgList li").length;     // 图片的总数
	var count = imgSum / per;                  // 可以轮播的次数
	
	// 设置一个定时器，让图片轮播
	var timer = setInterval(nextImg, 3000);
	
	// 显示下一张图片的函数
	function nextImg(){
		imgIndex++;
		
		// 设置recommendImgList容器的left值
		$("#recommendImgList").animate({left: -imgIndex * imgWidth}, 400, callback);
	}
	
	// 动画执行玩的回调函数
	function callback(){
		if(imgIndex == count - 1){
			$("#recommendImgList").css("left", 0);
			imgIndex = 0;
		}
	}
	
	// “recommendRight”的hover事件
	$(".recommendRight").hover(function(){
		$(this).find("span").show();
		clearInterval(timer);
	}, function(){
		$(this).find("span").hide();
		clearInterval(timer);
		timer = setInterval(nextImg, 3000);
	})
	
	// “上一张”的点击事件
	$(".recommendToLeft").click(function(){
		clearInterval(timer);

		// 判断是否已经到第一张
		if(imgIndex == 0){
			imgIndex = count - 1;
			$("#recommendImgList").css("left", (-imgIndex * imgWidth) + "px");
		}
		imgIndex -= 2;
		nextImg();
		timer = setInterval(nextImg, 3000);
	})
	
	// “下一张”的点击事件
	$(".recommendToRight").click(function(){
		clearInterval(timer);
		callback();
		nextImg();
		timer = setInterval(nextImg, 3000);
	})
	
	// 页面失去焦点事件
	$(window).blur(function(){
		clearInterval(timer);
	})
	
	// 页面获得焦点事件
	$(window).blur(function(){
		clearInterval(timer);
		timer = setInterval(nextImg, 3000);
	})
	
	
	// 根据json生成品质生活中的样式
	$.ajax({
		type: "get",
		url: "json/qualityLife.json",
		dataType: "json",
		success: function(res){
			var index = 0;
			for(var i = 0; i < res.length; i++){
				// 创建一个标题标签
				var oH4 = $("<h4>" + res[i].title + "</h4>");
				
				// 追加标题
				if(res[i].id == 1){
					$(".qualityLifeLeft").append(oH4);
				}else if(res[i].id == 2){
					$(".qualityLifeCenter").append(oH4);
				}else if(res[i].id == 3){
					$(".qualityLifeRight").append(oH4);
				}
				
				for(var j = 0; j < res[i].content.length; j++){
					index++;
					// 创建一个div标签
					var oDiv = $("<div id='qualityLife0" + index + "'></div>");
					
					// 创建一个图片标签
					var oImg = $("<img src='img/qualityLife/" + res[i].content[j].src + "' />");
					
					// 创建一个div便签，用于保存描述
					var oDescrition = $("<div class='sub-tit'></div>");
					
					// 分别创建3个p标签
					var tit = $("<p class='tit'>" + res[i].content[j].tit + "</p>");
					var desc = $("<p class='desc'>" + res[i].content[j].desc + "</p>");
					var promotion = $("<p class='promotion'>" + res[i].content[j].promotion + "</p>");
					
					// 追加
					oDescrition.append(tit);
					oDescrition.append(desc);
					oDescrition.append(promotion);
					
					oDiv.append(oDescrition);
					oDiv.append(oImg);
					
					// 追加内容
					if(res[i].id == 1){
						$(".qualityLifeLeft").append(oDiv);
					}else if(res[i].id == 2){
						$(".qualityLifeCenter").append(oDiv);
					}else if(res[i].id == 3){
						$(".qualityLifeRight").append(oDiv);
					}
				}
			}
		}
	});

	// 为“品质生活”的右边部分添加边框
	$(".qualityLifeProductList a:even").css({
		"border-right": "1px dashed #ccc",
		"border-bottom": "1px dashed #ccc"
	});
	$(".qualityLifeProductList a:odd").css({
		"border-bottom": "1px dashed #ccc"
	});
	$(".qualityLifeProductList a:gt(-3)").css({
		"border-bottom": "none"
	})
})
//1楼
$(function(){
	// 楼层导航栏的鼠标移入事件
	$(".floor1 .floorNav li").mouseenter(function(){
		// 设置当前鼠标移入的li的样式
		$(this).addClass("floorNavActive").children("a").css("border-right", "none");
		
		// 设置其兄弟元素的样式
		$(this).siblings().removeClass("floorNavActive").children("a").css("border-right", "1px solid #ccc");
		$(this).siblings(".lastLi").children("a").css("border-right", "1px solid #fff");
		
		// 将该li对应的内容显示出来
		$(".floor1Right").children("div").eq($(this).index()).show().siblings().hide();
	})
	
	// 初始化
	var floorNavIndex = 0;
	$(".floor1 .floorNav li").eq(floorNavIndex).mouseenter();
	
	// 图片轮播
	// 实现图片轮播
	var imgIndex = 0;
	var imgWidth = $("#floor1ImgList li").outerWidth();
	$("#floor1NumList li").eq(imgIndex).addClass("floor1NumListActive");
	
	// 第一张图片克隆，放到最后面
	$("#floor1ImgList li").eq(0).clone().appendTo($("#floor1ImgList"));
	
	// 图片的总数
	var imgSum = $("#floor1ImgList li").length;     
	
	// 设置一个定时器，让图片轮播
	var timer = setInterval(nextImg, 3000);
	
	// 显示下一张图片的函数
	function nextImg(){
		imgIndex++;
		
		// 设置recommendImgList容器的left值
		$("#floor1ImgList").stop(true).animate({left: -imgIndex * imgWidth}, 400, callback);
		
		// 设置下标的背景颜色
		if(imgIndex == imgSum - 1){
			$("#floor1NumList li").eq(0).addClass("floor1NumListActive").siblings().removeClass("floor1NumListActive");
		}else{
			$("#floor1NumList li").eq(imgIndex).addClass("floor1NumListActive").siblings().removeClass("floor1NumListActive");	
		}
	}
	
	// 动画执行玩的回调函数
	function callback(){
		if(imgIndex == imgSum - 1){
			$("#floor1ImgList").css("left", 0);
			imgIndex = 0;
		}
	}
	
	// 下标的鼠标移入事件
	$("#floor1NumList li").mouseenter(function(){
		clearInterval(timer);
		imgIndex = $(this).index() - 1;
		nextImg();
		timer = setInterval(nextImg, 3000);
	})
	
	// “recommendRight”的hover事件
	$(".floor1RightScroll").hover(function(){
		$(this).find("span").show();
		clearInterval(timer);
	}, function(){
		$(this).find("span").hide();
		clearInterval(timer);
		timer = setInterval(nextImg, 3000);
	})
	
	// “上一张”的点击事件
	$(".floor1ToLeft").click(function(){
		clearInterval(timer);

		// 判断是否已经到第一张
		if(imgIndex == 0){
			imgIndex = imgSum - 1;
			$("#floor1ImgList").css("left", (-imgIndex * imgWidth) + "px");
		}
		imgIndex -= 2;
		nextImg();
		timer = setInterval(nextImg, 3000);
	})
	
	// “下一张”的点击事件
	$(".floor1ToRight").click(function(){
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
	
	
	// 用ajax请求商品信息
	$.ajax({
		type: "get",
		url: "json/floor1.json",
		dataType: "json",
		success: function(res){
			for(var i = 0; i < res.length; i++){
				// 创建一个大的div容器
				var floor1Box = $("<div class='floor1Box2'></div>");
				
				// 循环并创建容器的头部
				for(var j = 0; j < res[i].topContent.length; j++){
					// 创建一个dl,dt,dd
					var oDl = $("<dl class='floor1Box2Top'></dl>");
					var oDt = $("<dt><a href='#'><img src='img/floor1/" + res[i].topContent[j].src + "' /></a></dt>");
					var oDd = $("<dd></dd>");
					
					// 创建显示描述内容和价格的标签
					var desc = $("<a class='floor1Box2Desc' href='#'>" + res[i].topContent[j].desc + "</a>");
					var price = $("<span class='floor1Box2Price'>" + res[i].topContent[j].price + "</span>");
					
					// 追加
					oDd.append(desc);
					oDd.append(price);
					oDl.append(oDt);
					oDl.append(oDd);
					floor1Box.append(oDl);
				}
				
				// 循环并创建容器的底部
				for(var j = 0; j < res[i].bottomContent.length; j++){
					// 创建一个图片标签
					var oImg = $("<img src='img/floor1/" + res[i].bottomContent[j] + "' />");
					
					// 追加
					floor1Box.append(oImg);
				}
				
				// 将大容器追加到页面中
				$(".floor1Right").append(floor1Box);
			}
		}
	});
})

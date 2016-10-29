//3楼
$(function(){
	// 楼层导航栏的鼠标移入事件
	$(".floor3 .floorNav li").mouseenter(function(){
		// 设置当前鼠标移入的li的样式
		$(this).addClass("floorNavActive").children("a").css("border-right", "none");
		
		// 设置其兄弟元素的样式
		$(this).siblings().removeClass("floorNavActive").children("a").css("border-right", "1px solid #ccc");
		$(this).siblings(".lastLi").children("a").css("border-right", "1px solid #fff");
		
		// 将该li对应的内容显示出来
		$(".floor3Right").children(".myFloor3Box").eq($(this).index()).show().siblings().hide();
	})
	
	// 初始化
	var floorNavIndex = 0;
	$(".floor3 .floorNav li").eq(floorNavIndex).mouseenter();
	
	
	// 图片轮播
	// 实现图片轮播
	var imgIndex = 0;
	var imgWidth = $("#floor3ScrollList li").outerWidth();
	$("#floor3NumList li").eq(imgIndex).addClass("floor3NumListActive");
	
	// 第一张图片克隆，放到最后面
	$("#floor3ScrollList li").eq(0).clone().appendTo($("#floor3ScrollList"));
	
	// 图片的总数
	var imgSum = $("#floor3ScrollList li").length;     
	
	// 设置一个定时器，让图片轮播
	var timer = setInterval(nextImg, 3000);
	
	// 显示下一张图片的函数
	function nextImg(){
		imgIndex++;
		
		// 设置recommendImgList容器的left值
		$("#floor3ScrollList").stop(true).animate({left: -imgIndex * imgWidth}, 400, callback);
		
		// 设置下标的背景颜色
		if(imgIndex == imgSum - 1){
			$("#floor3NumList li").eq(0).addClass("floor3NumListActive").siblings().removeClass("floor3NumListActive");
		}else{
			$("#floor3NumList li").eq(imgIndex).addClass("floor3NumListActive").siblings().removeClass("floor3NumListActive");
		}
	}
	
	// 动画执行玩的回调函数
	function callback(){
		if(imgIndex == imgSum - 1){
			$("#floor3ScrollList").css("left", 0);
			imgIndex = 0;
		}
	}
	
	// 下标的鼠标移入事件
	$("#floor3NumList li").mouseenter(function(){
		clearInterval(timer);
		imgIndex = $(this).index() - 1;
		nextImg();
		timer = setInterval(nextImg, 3000);
	})
	
	// “floor2Scroll”的hover事件
	$(".floor3Scroll").hover(function(){
		$(this).find("span").show();
		clearInterval(timer);
	}, function(){
		$(this).find("span").hide();
		clearInterval(timer);
		timer = setInterval(nextImg, 3000);
	})
	
	// “上一张”的点击事件
	$(".floor3ToLeft").click(function(){
		clearInterval(timer);

		// 判断是否已经到第一张
		if(imgIndex == 0){
			imgIndex = imgSum - 1;
			$("#floor3ScrollList").css("left", (-imgIndex * imgWidth) + "px");
		}
		imgIndex -= 2;
		nextImg();
		timer = setInterval(nextImg, 3000);
	})
	
	// “下一张”的点击事件
	$(".floor3ToRight").click(function(){
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
		url: "json/floor3.json",
		dataType: "json",
		success: function(res){
			for(var i = 0; i < res.length; i++){
				// 创建一个大的容器ul
				var oUl = $("<ul class='floor3Box2 myFloor3Box'></ul>");
				
				// 循环并创建容器里的每一个li
				for(var j = 0; j < res[i].topContent.length; j++){
					// 分别创建li,dl,dt,dd,a,span
					var oLi = $("<li></li>");
					var oDl = $("<dl></dl>");
					var oDt = $("<dt><a href='#'><img src='img/floor1/" + res[i].topContent[j].src + "' /></a></dt>");
					var oDd = $("<dd></dd>");
					var oA = $("<a href='#' class='floor3Box2ListDesc'>" + res[i].topContent[j].desc + "</a>");
					var oSpan = $("<span class='floor3Box2ListPrice'>" + res[i].topContent[j].price + "</span>");
					
					// 追加各个元素
					oDd.append(oA);
					oDd.append(oSpan);
					oDl.append(oDt);
					oDl.append(oDd);
					oLi.append(oDl);
					oUl.append(oLi);
				}
				
				// 将容器ul追加到文档中
				$(".floor3Right").append(oUl);
			}
		}
	});
})

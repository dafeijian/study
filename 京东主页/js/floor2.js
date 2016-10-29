//2楼
$(function(){
	// 楼层导航栏的鼠标移入事件
	$(".floor2 .floorNav li").mouseenter(function(){
		// 设置当前鼠标移入的li的样式
		$(this).addClass("floorNavActive").children("a").css("border-right", "none");
		
		// 设置其兄弟元素的样式
		$(this).siblings().removeClass("floorNavActive").children("a").css("border-right", "1px solid #ccc");
		$(this).siblings(".lastLi").children("a").css("border-right", "1px solid #fff");
		
		// 将该li对应的内容显示出来
		$(".floor2Right").children(".myFloor2Box").eq($(this).index()).show().siblings().hide();
	})
	
	// 初始化
	var floorNavIndex = 0;
	$(".floor2 .floorNav li").eq(floorNavIndex).mouseenter();
	
	
	// 图片轮播
	// 实现图片轮播
	var imgIndex = 0;
	var imgWidth = $("#floor2ScrollList li").outerWidth();
	$("#floor2NumList li").eq(imgIndex).addClass("floor2NumListActive");
	
	// 第一张图片克隆，放到最后面
	$("#floor2ScrollList li").eq(0).clone().appendTo($("#floor2ScrollList"));
	
	// 图片的总数
	var imgSum = $("#floor2ScrollList li").length;     
	
	// 设置一个定时器，让图片轮播
	var timer = setInterval(nextImg, 3000);
	
	// 显示下一张图片的函数
	function nextImg(){
		imgIndex++;
		
		// 设置recommendImgList容器的left值
		$("#floor2ScrollList").stop(true).animate({left: -imgIndex * imgWidth}, 400, callback);
		
		// 设置下标的背景颜色
		if(imgIndex == imgSum - 1){
			$("#floor2NumList li").eq(0).addClass("floor2NumListActive").siblings().removeClass("floor2NumListActive");
		}else{
			$("#floor2NumList li").eq(imgIndex).addClass("floor2NumListActive").siblings().removeClass("floor2NumListActive");
		}
	}
	
	// 动画执行玩的回调函数
	function callback(){
		if(imgIndex == imgSum - 1){
			$("#floor2ScrollList").css("left", 0);
			imgIndex = 0;
		}
	}
	
	// 下标的鼠标移入事件
	$("#floor2NumList li").mouseenter(function(){
		clearInterval(timer);
		imgIndex = $(this).index() - 1;
		nextImg();
		timer = setInterval(nextImg, 3000);
	})
	
	// “floor2Scroll”的hover事件
	$(".floor2Scroll").hover(function(){
		$(this).find("span").show();
		clearInterval(timer);
	}, function(){
		$(this).find("span").hide();
		clearInterval(timer);
		timer = setInterval(nextImg, 3000);
	})
	
	// “上一张”的点击事件
	$(".floor2ToLeft").click(function(){
		clearInterval(timer);

		// 判断是否已经到第一张
		if(imgIndex == 0){
			imgIndex = imgSum - 1;
			$("#floor2ScrollList").css("left", (-imgIndex * imgWidth) + "px");
		}
		imgIndex -= 2;
		nextImg();
		timer = setInterval(nextImg, 3000);
	})
	
	// “下一张”的点击事件
	$(".floor2ToRight").click(function(){
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
		url: "json/floor2.json",
		dataType: "json",
		success: function(res){
			for(var i = 0; i < res.length; i++){
				// 创建一个大的容器ul
				var oUl = $("<ul class='floor2Box2 myFloor2Box'></ul>");
				
				// 循环并创建容器里的每一个li
				for(var j = 0; j < res[i].list.length; j++){
					// 分别创建li,dl,dt,dd,a,span
					var oLi = $("<li></li>");
					var oDl = $("<dl></dl>");
					var oDt = $("<dt><a href='#'><img src='img/floor2/" + res[i].list[j].src + "' /></a></dt>");
					var oDd = $("<dd></dd>");
					var oA = $("<a href='#' class='floor2Box2ListDesc'>" + res[i].list[j].desc + "</a>");
					var oSpan = $("<span class='floor2Box2ListPrice'>" + res[i].list[j].price + "</span>");
					
					// 追加各个元素
					oDd.append(oA);
					oDd.append(oSpan);
					oDl.append(oDt);
					oDl.append(oDd);
					oLi.append(oDl);
					oUl.append(oLi);
				}
				
				// 将容器ul追加到文档中
				$(".floor2Right").append(oUl);
			}
		}
	});
})

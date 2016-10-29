// banner
// 文档就绪函数
$(function(){
	// 动态生成商品列表
	$.ajax({
		type: "get",
		url: "json/allGoodsList.json",
		dataType: "json",
		success: function(res){
			// 动态地创建一级列表
			for(var i = 0; i < res.length; i++){
				var str = "";
				for(var j = 0; j < res[i].firstTitle.length; j++){
					if(j == res[i].firstTitle.length - 1){
						str += res[i].firstTitle[j];
					}else{
						str += res[i].firstTitle[j] + "、";
					}
				}
				
				// 创建一个新的保存一级列表的li标签
				var firstLi = $("<li>" + str + "<span>&gt;</span></li>");
				
				// 为每一个li添加鼠标移入事件
				firstLi.hover(function(){
					$("#allGoodsList").find(".details").eq($(this).index()).show();
				}, function(){
					$("#allGoodsList").find(".details").eq($(this).index()).hide();
				})
				
				// 将该firstLi追加到一级列表中
				$("#allGoodsList").append(firstLi);
			}
			
			// 动态创建二级列表
			for(var i = 0; i < res.length; i++){
				// 动态地创建二级列表
				var details = $("<div class='details'></div>");
				details.attr("flag", i);
				
				// 为每一块details添加鼠标移入事件
				details.hover(function(){
					$(this).show();
					$("#allGoodsList").children("li").eq($(this).attr("flag")).addClass("hover").children("span").hide();
				}, function(){
					$(this).hide();
					$("#allGoodsList").children("li").eq($(this).attr("flag")).removeClass("hover").children("span").show();
				})
				
				var detailsLeft = $("<div class='details-left'></div>");
				
				// 动态地创建二级列表
				var headerUl = $("<ul class='details-left-top'></ul>");
				var contentDl = $("<dl class='details-left-content'></dl>");
				
				// 创建头部列表 
				for(var j = 0; j < res[i].header.length; j++){
					var headerLi = $("<li><a href='#'>" + res[i].header[j] +"<span>&gt;</span></a></li>");
					
					// 将它追加到二级列表中
					headerUl.append(headerLi);
				}
				
				// 创建内容列表
				for(var j = 0; j < res[i].firstContent.length; j++){
					// 创建标题
					var contentDt = $("<dt><a>" + res[i].firstContent[j].secondTitle  + "</a><span>&gt;</span></dt>");
					
					// 标题追加
					contentDl.append(contentDt);
					
					// 创建内容
					var contentDd = $("<dd></dd>");
					var contentUl = $("<ul></ul>");
					
					for(var z = 0; z < res[i].firstContent[j].secondContent.length; z++){
						var contentLi = $("<li><a href='#'>" + res[i].firstContent[j].secondContent[z] + "</a></li>");
						
						contentUl.append(contentLi);
					}
					
					// 内容追加
					contentDd.append(contentUl);
					contentDl.append(contentDd);
				}
				
				// 创建右边的内容并追加
				var detailsRight = $("<div class='details-right'></div>"); 
				
				var detailsRightTop = $("<div class='details-right-top'></div>");
				
				var detailsRightBottom = $("<div class='details-right-bottom'></div>");
				
				// 遍历并将图片追加到页面中
				for(var j = 0; j < res[i].src1.length; j++){
					// 创建一个a标签，里面装有一张图片
					var oImg1 = $("<a href='#'><img src=img/banner/" + res[i].src1[j] + " /></a>");
					
					// 追加
					detailsRightTop.append(oImg1);
				}
				for(var j = 0; j < res[i].src2.length; j++){
					// 创建一个a标签，里面装有一张图片
					var oImg2 = $("<a href='#'><img src=img/banner/" + res[i].src2[j] + " /></a>");
					
					// 追加
					detailsRightBottom.append(oImg2);
				}
				
				detailsRight.append(detailsRightTop);
				detailsRight.append(detailsRightBottom);
				
				// 将headerUl追加
				detailsLeft.append(headerUl);
				detailsLeft.append(contentDl);
				details.append(detailsLeft);
				details.append(detailsRight);
				$("#allGoodsList").append(details);
				
			}
		}
	});
	
	// 图片播放
	var imgIndex = 0;
	$("#bannerImgList li").eq(imgIndex).show();
	$("#bannerNumList li").eq(imgIndex).addClass("bannerImgActive");
	
	// 设置一个定时器，实现图片轮播
	var timer = setInterval(imgChange, 3000);
	
	// 图片改变的函数
	function imgChange(){
		imgIndex++
		imgIndex = imgIndex % $("#bannerImgList li").length;
		
		// 图片淡入
		$("#bannerImgList li").eq(imgIndex).stop(true).fadeIn(300).siblings().stop(true).fadeOut(300);
		
		// 改变下标的背景颜色
		$("#bannerNumList li").eq(imgIndex).addClass("bannerImgActive").siblings().removeClass("bannerImgActive");
	}
	
	// 下标中每个li的鼠标移入事件
	$("#bannerNumList li").mouseenter(function(){
		clearInterval(timer);
		imgIndex = $(this).index() - 1;
		imgChange();
		timer = setInterval(imgChange, 3000);
	})
	
	// 上一张的按钮点击事件
	$(".toLeft").click(function(){
		clearInterval(timer);
		if(imgIndex == 0){
			imgIndex = $("#bannerImgList li").length;
		}
		imgIndex -= 2;
		imgChange();
		timer = setInterval(imgChange, 3000);
	})
	
	// 下一张的按钮点击事件
	$(".toRight").click(function(){
		clearInterval(timer);
		imgChange();
		timer = setInterval(imgChange, 3000);
	})
	
	// "bannerImgPlay"的鼠标移入事件
	$(".bannerImgPlay").hover(function(){
		clearInterval(timer);
		$(this).find("a").show();
	}, function(){
		clearInterval(timer);
		timer = setInterval(imgChange, 3000);
		$(this).find("a").hide();
	});
	
	// 当前网页失去焦点事件
	$(window).blur(function(){
		clearInterval(timer);
	});
	
	// 当前网页获得焦点事件
	$(window).focus(function(){
		clearInterval(timer);
		timer = setInterval(imgChange, 3000);
	})
	
	
	// 生成京东服务的列表的背景图片
	var iHeight = 25;    // 放置背景图片的span的高度
	$(".serviceList li").each(function(){
		$(this).find("span").css("background", "url(img/banner/57620bbcN26572c85.png) no-repeat 0 " + (-iHeight * $(this).index()) + "px");
	})
	
	// 顶部服务的鼠标移入事件
	$(".TopService").bind("mouseenter", function(){
		$(".serviceList").slideUp(400);
		$(".serviceDetails").slideDown(400);

		// 显示相应的内容
		$(".serviceHeader li").eq($(this).index()).addClass("headerActive").siblings().removeClass("headerActive");
		$(".mainService").eq($(this).index()).show().siblings(".mainService").hide();
	})
	
	// 上部最有边的li的鼠标移出事件
	$(".rightService").mouseleave(function(){
		$(".TopService").bind("mouseenter", function(){
			$(".serviceList").slideUp(400);
			$(".serviceDetails").slideDown(400);
	
			// 显示相应的内容
			$(".serviceHeader li").eq($(this).index()).addClass("headerActive").siblings().removeClass("headerActive");
			$(".mainService").eq($(this).index()).show().siblings(".mainService").hide();
		})	
	})
	
	// 关闭按钮的的点击事件
	$(".close").click(function(){
		$(".serviceDetails").slideUp(400);
		$(".serviceList").slideDown(400);
		
		// 取消鼠标移入事件，直到鼠标离开游戏的li的时候，再重新赋予鼠标移动事件
		$(".TopService").unbind("mouseenter");
	})
	
	// 头部服务的切换
	var headerIndex = 0;
	$(".serviceHeader li").eq(headerIndex).addClass("headerActive");
	$(".mainService").eq(headerIndex).show();
	// 为每个li添加鼠标移入事件
	$(".serviceHeader li").mouseenter(function(){
		// 改变标题的背景颜色
		headerIndex = $(this).index();
		$(this).addClass("headerActive").siblings().removeClass("headerActive");
		
		// 显示相应的内容
		$(".mainService").eq(headerIndex).show().siblings(".mainService").hide();
	})
	
	// 控制充值话费内容的切换
	var fareIndex = 0
	$(".fareList li").eq(fareIndex).addClass("fareActive");
	$(".pf").eq(fareIndex).show();
	// 为每个li添加鼠标移入事件
	$(".fareList li").mouseenter(function(){
		// 改变标题的背景颜色
		fareIndex = $(this).index();
		$(this).addClass("fareActive").siblings().removeClass("fareActive");
		
		// 显示相应的内容
		$(".pf").eq(fareIndex).show().siblings(".pf").hide();
	})
	
	// 机票里面内容的切换
	var ticketIndex = 0;
	var ticketWidth = $(".buyTicket").outerWidth();
	
	// 设置是单程还是往返
	if($("[name=way1]:checked").val() == "one"){
		$("[name=way1]").closest(".pt").siblings().find(".back").parent("p").hide();
	}else{
		$("[name=way1]").closest(".pt").siblings().find(".back").parent("p").show();
	}
	if($("[name=way2]:checked").val() == "one"){
		$("[name=way2]").closest(".pt").siblings().find(".back").parent("p").hide();
	}else{
		$("[name=way2]").closest(".pt").siblings().find(".back").parent("p").show();
	}
	
	// 单选框的点击事件
	$("[name=way1]").click(function(){
		if($("[name=way1]:checked").val() == "one"){
			$(this).closest(".pt").siblings().find(".back").parent("p").hide();
		}else{
			$(this).closest(".pt").siblings().find(".back").parent("p").show();
		}
	})
	$("[name=way2]").click(function(){
		if($("[name=way2]:checked").val() == "one"){
			$(this).closest(".pt").siblings().find(".back").parent("p").hide();
		}else{
			$(this).closest(".pt").siblings().find(".back").parent("p").show();
		}
	})
	
	$(".ticketList li").eq(ticketIndex).addClass("ticketActive");
	// 为每个li添加鼠标移入事件
	$(".ticketList li").mouseenter(function(){
		// 改变标题的背景颜色
		ticketIndex = $(this).index();
		$(this).addClass("ticketActive").siblings().removeClass("ticketActive");
		
		// 显示相应的内容
		$(".ticketBox").animate({left: -ticketWidth * ticketIndex + 10}, 300);
	})
	
	// 控制电影票内容的切换
	var movieIndex = 0
	$(".movieList li").eq(movieIndex).addClass("movieActive");
	$(".mv").eq(movieIndex).show();
	// 为每个li添加鼠标移入事件
	$(".movieList li").mouseenter(function(){
		// 改变标题的背景颜色
		movieIndex = $(this).index();
		$(this).addClass("movieActive").siblings().removeClass("movieActive");
		
		// 显示相应的内容
		$(".mv").eq(movieIndex).show().siblings(".mv").hide();
	}) 
	
	// 游戏里面内容的切换
	var gametIndex = 0;
	var gameWidth = $(".gm").outerWidth();
	
	$(".gameList li").eq(gametIndex).addClass("gameActive");
	// 为每个li添加鼠标移入事件
	$(".gameList li").mouseenter(function(){
		// 改变标题的背景颜色
		gametIndex = $(this).index();
		$(this).addClass("gameActive").siblings().removeClass("gameActive");
		
		// 显示相应的内容
		$(".gameBox").animate({left: -gameWidth * gametIndex + 10}, 300);
	})
})

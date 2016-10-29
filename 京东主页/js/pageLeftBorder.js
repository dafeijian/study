//网页的左侧
$(function(){
	// 记录当前是第几楼
	var floorIndex = 0;
	var flag = false;
	
	// 左侧菜单的鼠标移入和移出事件
	$(".pageLeftBorder li").hover(function(){
		$(this).find("a").show();
	}, function(){
		$(this).find("a").hide();
	})
	
	// 左侧菜单的鼠标点击事件
	$(".pageLeftBorder li").click(function(){
		// 显示被点击li的样式，隐藏其它li的样式
		$(this).find("span").show();
		$(this).siblings().find("span").hide();
		
		// 标志正在动画的过程中
		flag = true
		
		// 设置楼层的变动
		$("html, body").stop(true).animate({scrollTop: $(".floor").eq($(this).index()).offset().top}, 400, function(){
			// 标志者动画结束
			flag = false;
		});
	})
	
	// 显示和隐藏左侧菜单栏
	$(window).scroll(function(){
		if(!flag){
			if($(this).scrollTop() < 1000){
				$(".pageLeftBorder").slideUp(200);
			}else if($(this).scrollTop() > 1000){
				floorIndex = 0;
				$(".pageLeftBorder").slideDown(200);
				$(".pageLeftBorder li").eq(floorIndex).find("span").show();
				$(".pageLeftBorder li").eq(floorIndex).siblings().find("span").hide();
			}
			
			// 遍历每一个楼层，判断当前网页处于第几楼
			$(".floor").each(function(){
				if($(window).scrollTop() > $(this).offset().top - $(this).outerHeight() / 2){
					// 显示被点击li的样式，隐藏其它li的样式
					$(".pageLeftBorder li").eq($(this).attr("floorIndex")).find("span").show();
					$(".pageLeftBorder li").eq($(this).attr("floorIndex")).siblings().find("span").hide();
				}
			})
		}
	})

})

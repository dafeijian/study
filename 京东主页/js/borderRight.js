/*网页右部的菜单*/
$(function(){
	// 菜单的鼠标移入事件
	$(".pageRightMiddle li").hover(function(){
		$(this).children("a").css("background-color", "#C81623").delay(200).stop(true).animate({width: "64px"}, 200);
	}, function(){
		$(this).children("a").css("background-color", "#7a6e6e").delay(200).stop(true).animate({width: 0}, 200);
	})
	
	// 顶部菜单的鼠标移入事件
	$(".pageRightBottom li").hover(function(){
		$(this).children("a").css("background-color", "#C81623").delay(200).stop(true).animate({width: "64px"}, 200);
	}, function(){
		$(this).children("a").css("background-color", "#7a6e6e").delay(200).stop(true).animate({width: 0}, 200);
	})
	
	// “回到顶部”按钮的点击事件
	$(".backToTop").click(function(){
		$("html, body").animate({"scrollTop": 0}, 400);
	})
})
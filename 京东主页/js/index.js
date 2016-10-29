// 文档就绪函数
$(function(){
	// 根据json动态地添加地址
	$.ajax({
		type: "get",
		url: "json/address.json",
		dataType: "json",
		success: function(res){
			// 遍历保存地址的数组
			for(var i = 0; i < res.length; i++){
				// 创建一个新的li，记录的是每一个省的名字
				var oLi = $("<li><a href='#'>" + res[i] + "</a></li>");
				
				// 判断显示的是哪个地址
				if(res[i] == $("#address").text()){
					oLi.children("a").addClass("active");
				}
				
				// 地址列表中每一个li里面的a标签的点击事件
				oLi.click(function(){
					// 改变运送地址的值
					$("#address").text($(this).text());
					
					// 改变地址列表中的a标签的背景颜色
					$(this).find("a").addClass("active");
					$(this).siblings().find("a").removeClass("active");
				})
	
				// 将oLi追加到地址列表中
				$("#addressList").append(oLi);
			}
		}
	});
	
	// 显示和隐藏地址列表
	$(".welcome-left").hover(function(){
		$("#addressList").show();
		$("#address").css("background-image", "url(img/welcome/arrowUp.png)");
	}, function(){
		$("#addressList").hide();
		$("#address").css("background-image", "url(img/welcome/arrowDown.png)");
	});
	
	// "我的京东"的显示隐藏
	$(".myJD").hover(function(){
		$("#myJD").show();
		$(this).children("a").css("background-image", "url(img/welcome/arrowUp.png)");
	}, function(){
		$("#myJD").hide();
		$(this).children("a").css("background-image", "url(img/welcome/arrowDown.png)");
	})
	
	// "手机京东"的显示隐藏
	$(".phoneJD").hover(function(){
		$("#phoneJD").show();
		$(this).css("background-position-y", "-20px");
		$(this).children("a").css("background-image", "url(img/welcome/arrowUp.png)");
	}, function(){
		$("#phoneJD").hide();
		$(this).css("background-position-y", "5px");
		$(this).children("a").css("background-image", "url(img/welcome/arrowDown.png)");
	})
	
	// "关注京东"的显示隐藏
	$(".concernJD").hover(function(){
		$("#concernJD").show();
		$(this).children("a").css("background-image", "url(img/welcome/arrowUp.png)");
	}, function(){
		$("#concernJD").hide();
		$(this).children("a").css("background-image", "url(img/welcome/arrowDown.png)");
	})
	
	// "客户服务"显示隐藏
	$(".service").hover(function(){
		$("#service").show();
		$(this).children("a").css("background-image", "url(img/welcome/arrowUp.png)");
	}, function(){
		$("#service").hide();
		$(this).children("a").css("background-image", "url(img/welcome/arrowDown.png)");
	})
	
	// 根据json动态添加导航
	$.ajax({
		type: "get",
		url: "json/welcomeNav.json",
		dataType: "json",
		success: function(res){
			// 遍历数组
			for(var i = 0; i < res.length; i++){
				// 创建一个新的ul
				if(i == 0){
					var oUl = $("<ul class='firstul'></ul>");
				}else{
					var oUl = $("<ul class='otherul'></ul>");
				}
				
				// 创建h4并追加
				var oH4 = $("<h4>" + res[i].title + "</h4>");
				oUl.append(oH4);
				
				// 循环创建li
				for(var j = 0; j < res[i].content.length; j++){
					// 创建li并追加
					var oLi = $("<li><a href='#'>" + res[i].content[j] + "</a></li>");
					oUl.append(oLi);
				}
				
				// 将ul追加到页面中
				$("#welcomeNav").append(oUl);
			}
		}
	})
	
	// "页面导航"的显示隐藏
	$(".welcomeNav").hover(function(){
		$("#welcomeNav").show();
		$(this).children("a").css("background-image", "url(img/welcome/arrowUp.png)");
	}, function(){
		$("#welcomeNav").hide();
		$(this).children("a").css("background-image", "url(img/welcome/arrowDown.png)");
	})
	
	// "购物车"的显示隐藏
	$(".shoppingCar").hover(function(){
		$("#shoppingBorder").show();
		$("#shoppingList").show();
	}, function(){
		$("#shoppingBorder").hide();
		$("#shoppingList").hide();
	})
	
//	// 判断cookie是否为空
	if(document.cookie == ""){
		// 显示购物车为空的样式
		$("#shoppingList li").first().show();
		$("#pageRightMiddleCart").hide();
	}
	else{
		// 显示购物车不为空的样式
		$("#shoppingList li").first().hide();
		$("#pageRightMiddleCart").show();
		
		//获取所有的cookie
		var cookieStr = decodeURIComponent(document.cookie);
		
		//去掉cookie中的空格
		cookieStr = cookieStr.replace(/ /g, "");
		var arr = cookieStr.split(";");
		
		// 修改商品的数目
		$("#shoppingNum").text(arr.length);
		$("#pageRightMiddleCart").text(arr.length);
		
		// ajax获取商品信息的json
		$.ajax({
			type: "get",
			url: "json/shoppingCar.json",
			dataType: "json",
			success: function(res){
				// 将原来的table中的tbody清空
		 		$(".cartTable tbody").empty();
				
				for(var i = 0; i < arr.length; i++){
					var subArr = arr[i].split("=");
					// subArr[0]  商品的id
		 			// subArr[1]  购物车中该商品的数量
		 			
		 			// 遍历json，找到该商品的详细信息
		 			for(var j = 0; j < res.length; j++){
		 				if(res[j].id == subArr[0]){
							// 为主页中的购物车添加商品信息
							var oLi = $("<li><a href='#'><img src=" + res[j].src + " /></a><a href='#'>" + res[j].name + "</a></li>");
							$("#shoppingList").append(oLi);
						}
		 			}
		 		}
			}
		});
	}
})

//购物车
$(function(){
	// 创建购物车
	createCart();
	
	// “全选”的点击事件
	$("[name=selectAll]").click(function(){
		if($(this).prop("checked")){
			$("[name=selectAll]").prop("checked", true);
			$("[name=select]").prop("checked", true);
			
			// 设置被选中的tr的背景颜色 
			$(".cartTable tbody tr").css("background-color", "#fff4e8");
		}else{
			$("[name=selectAll]").prop("checked", false);
			$("[name=select]").prop("checked", false);
			
			// 设置被选中的tr的背景颜色 
			$(".cartTable tbody tr").css("background-color", "#fff");
		}
		
		// 修改选中商品的总价格
		$(".allPrice").text("¥" + getAllPrice());
	})
	
	// “删除选中的商品”点击事件
	$(".delSelected").click(function(){
		$("[name=select]").each(function(){
			if($(this).prop("checked")){
				$(this).closest("td").siblings().find(".delP").click();
			}
		})
		
		// 修改选中商品的总价格
		$(".allPrice").text("¥" + getAllPrice());
	})
	
	// “加入购物车”按钮的点击事件
	$(".addCart").click(function(){
		// 获取对应的数据
		var id = $(this).closest("li").attr("productId");
		var num = 1;
		
		// 判断cookie里面是否存在该商品
		if(getCookieByName(id) != ""){
			num = parseInt(getCookieByName(id)) + 1;
		}
		
		// 修改cookie里面商品的数目
		setNum(id ,num);
		
		// 刷新购物车的数据
		createCart();
	})
	
	// 根据cookie的内容创建购物车的内容
	function createCart(){
		// 判断cookie是否为空
		if(document.cookie == ""){
			// 显示购物车为空的样式
			$(".cartEmpty").show();
			$(".cartNotEmpty").hide();
		}
		else{
			// 显示购物车不为空的样式
			$(".cartNotEmpty").show();
			$(".cartEmpty").hide();
			
			//获取所有的cookie
			var cookieStr = decodeURIComponent(document.cookie);
			
			//去掉cookie中的空格
			cookieStr = cookieStr.replace(/ /g, "");
			var arr = cookieStr.split(";");
			
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
			 					// 创建一个tr便签，并把它追加到购物车的table中
			 					var oTr = $("<tr productId=" + subArr[0] + "></tr>");
			 					
			 					// 创建第一个td
			 					var oTd1 = $("<td class='tbCheckbox'></td>");
			 					var oSelect = $("<input type='checkbox' name='select' class='select' />");
			 					
			 					// 每一个商品前面的多选框的点击事件
								oSelect.click(function(){	
									if($(this).prop("checked")){
										// 设置被选中的tr的背景颜色 
										$(this).closest("tr").css("background-color", "#fff4e8");
									}else{
										// 设置被选中的tr的背景颜色 
										$(this).closest("tr").css("background-color", "#fff");
									}
									
									// 遍历判断是否全部被选中
									var flag = true;
									$("[name=select]").each(function(){
										if(!$(this).prop("checked")){
											flag = false;
										}
									})
									
									// 设置全选多选框的选中情况
									$("[name=selectAll]").prop("checked", flag);
									
									// 修改选中商品的总价格
									$(".allPrice").text("¥" + getAllPrice());
								})
								// 追加
			 					oTd1.append(oSelect);
			 					
			 					//创建第二个td
			 					var oTd2 = $("<td></td>");
			 					
			 					// 第二个td里面的子内容，包括dl，dt，dd
			 					var oDl = $("<dl></dl>");
			 					var oDt = $("<dt><a href='#'><img src=" + res[j].src + " /></a></dt>");
			 					var oDd = $("<dd><a href='#'>" + res[j].name + "</a></dd>");
			 					oDl.append(oDt);
			 					oDl.append(oDd);
			 					oTd2.append(oDl);
			 					
			 					// 创建第三个td及其子内容
			 					var oTd3 = $("<td></td>");
			 					var oSpan = $("<span class='eachPrice'>" + res[j].price + "</span>");
			 					oTd3.append(oSpan);
			 					
			 					// 创建第四个td及其子内容
			 					var oTd4 = $("<td></td>");
			 					var oDiv = $("<div class='pNumBox'></div>");
			 					var oTxt = $("<input class='pNum' type='text' value=" + subArr[1] + " />");
			 					var addSpan = $("<span class='add'>+</span>");
			 					var reduceSpan = $("<span class='reduce'>-</span>");
			 					
			 					// txt框的失去焦点事件
								oTxt.blur(function(){
									// 获取txt框里面的值
									var sum = $(this).val();
									
									// 改变“-”的背景颜色
									if(sum > 1){
										$(this).siblings(".reduce").css("color", "#666");
									}else{
										$(this).siblings(".reduce").css("color", "#ccc");
									}
									
									// 获取每一件商品的价格
									var eachPrice = $(this).closest("td").prev().find(".eachPrice").text();
									var totalPrice = sum * eachPrice;
									
									// 设置总价格
									$(this).closest("td").next().find(".totalPrice").text(totalPrice.toFixed(2));
									
									// 修改选中商品的总价格
									$(".allPrice").text("¥" + getAllPrice());
									
									// 修改cookie里面商品的数目
									setNum($(this).closest("tr").attr("productId") ,sum);
								})
			 					// 加一个的点击事件
			 					addSpan.click(function(){
			 						// 获取原先txt框里面的值
									var sum = $(this).siblings("input").val();
									sum++;
									
									// 改变“-”的背景颜色
									$(this).siblings(".reduce").css("color", "#666");
									
									// 获取每一件商品的价格
									var eachPrice = $(this).closest("td").prev().find(".eachPrice").text();
									var totalPrice = sum * eachPrice;
									
									// 设置总价格
									$(this).closest("td").next().find(".totalPrice").text(totalPrice.toFixed(2));
									
									// 将sum值重新写回txt框里面
									$(this).siblings("input").val(sum);
									
									// 修改选中商品的总价格
									$(".allPrice").text("¥" + getAllPrice());
									
									// 修改cookie里面商品的数目
									setNum($(this).closest("tr").attr("productId") ,sum);
			 					})
			 					
			 					// 减一个的点击事件
			 					reduceSpan.click(function(){
									// 获取原先txt框里面的值
									var sum = $(this).siblings("input").val();
									if(sum == 1){
										return;
									}
									
									// 减少一件
									sum--;
									
									// 如果再减少后，购物车中该商品只有一件了，就改变该按钮的颜色
									if(sum == 1){
										$(this).css("color", "#ccc");
									}
									
									// 获取每一件商品的价格
									var eachPrice = $(this).closest("td").prev().find(".eachPrice").text();
									var totalPrice = sum * eachPrice;
									
									// 设置总价格
									$(this).closest("td").next().find(".totalPrice").text(totalPrice.toFixed(2));
									
									// 将sum值重新写回txt框里面
									$(this).siblings("input").val(sum);
									
									// 修改选中商品的总价格
									$(".allPrice").text("¥" + getAllPrice());
									
									// 修改cookie里面商品的数目
									setNum($(this).closest("tr").attr("productId") ,sum);
								})
			 					
			 					// 追加
			 					oDiv.append(oTxt);
			 					oDiv.append(addSpan);
			 					oDiv.append(reduceSpan);
			 					oTd4.append(oDiv);
			 					
			 					// 创建第五个td及其子内容
			 					var oTd5 = $("<td><span class='totalPrice'>" + (res[j].price * subArr[1]).toFixed(2) + "</span></td>");
			 					
			 					// 创建第六个td及其子内容
			 					var oTd6 = $("<td></td>");
			 					var oDel = $("<a class='delP'>删除</a>");
			 					// “删除商品”的点击事件
								oDel.click(function(){
									// 删除对应的cookie的内容
									removeCookieByname($(this).closest("tr").attr("productId"));
									
									if(document.cookie == ""){
										// 显示购物车为空的样式
										$(".cartEmpty").show();
										$(".cartNotEmpty").hide();
									}
									
									// 删除相应的tr
									$(this).closest("tr").remove();
									
									// 修改选中商品的总价格
									$(".allPrice").text("¥" + getAllPrice());
								})
			 					oTd6.append(oDel);
			 					
			 					// 将6个td追加到tr中
			 					oTr.append(oTd1);
			 					oTr.append(oTd2);
			 					oTr.append(oTd3);
			 					oTr.append(oTd4);
			 					oTr.append(oTd5);
			 					oTr.append(oTd6);
			 					
			 					// 将tr追加到table中
			 					$(".cartTable tbody").append(oTr);
			 				}
			 			}
					}	
					
					// 遍历设置“-”的背景颜色
					$(".reduce").each(function(){
						if($(this).siblings("input").val() > 1){
							$(this).css("color", "#666");
						}else{
							$(this).css("color", "#ccc");
						}
					})
				}
			});
		}
	}
	
	// 改变cookie中相应商品的数量
	function setNum(id, num){
		// 设置cookie的过期时间
		var d = new Date();
		d.setDate(d.getDate() + 365);
		
		// 设置cookie
		setCookie(id, num, d);
	}
	
	// 计算出选中商品的总价格
	function getAllPrice(){
		var allPrice = 0;
		$("[name=select]").each(function(){
			if($(this).prop("checked")){
				allPrice += parseFloat($(this).closest("td").siblings().find(".totalPrice").text());
			}
		})
		
		// 返回总价格
		return allPrice.toFixed(2);
	}
})

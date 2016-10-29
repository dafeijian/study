//设置cookie
function setCookie(name, value, expires){
	var cookieStr = "";
	if(name && value){
		cookieStr += encodeURIComponent(name) + "=" + encodeURIComponent(value);
	}
	
	//expires必须时Date类型
	if(expires instanceof Date){
		cookieStr += ";expires=" + expires;
	}
	
	//设置cookie
	document.cookie = cookieStr;
	return decodeURIComponent(cookieStr);
}

//获取cookie
function getCookieByName(name){
	if(!name){
		return "";
	}
	
	//获取所有的cookie
	var cookieStr = decodeURIComponent(document.cookie);
	
	//去掉cookie中的空格
	cookieStr = cookieStr.replace(/ /g, "");
	
	var arr = cookieStr.split(";");
	for(var i = 0; i < arr.length; i++){
		var subArr = arr[i].split("=");
		if(subArr[0] == name){
			return subArr[1];
		}
	}
	return "";
}

//删除cookie
function removeCookieByname(name){
	document.cookie = name + "=;expires=" + new Date();
}

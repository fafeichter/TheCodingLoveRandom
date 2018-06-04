function makeNewBody(){
	$(".social-share").remove()
	$(".post-meta-info").remove()
	var post = $('.blog-post');
	var nav = $('.nav-link');
	nav.css({display: "none"});
	$('body').html($('<div>').append(nav).html() + post.html());
}

function changeApperance(value, size){
	setImgSize(size);
	$('.blog-post-title').replaceWith(function () {
		return "<h1 style='padding-bottom:70px; padding-top:50px; text-align: center;'>" + $(this).html() + "</h1>";
	});
}

function setImgSize(size){
	var sizeVal = 50;
	if(size == 's'){
		sizeVal=30;
	}else if(size == 'm'){
		sizeVal=50;
	}else{
		sizeVal=70;
	}
	
 	var img = $('img')
	
	var imgW = img.width();
	var imgH = img.height();
	var screenH = $(window).height();
	var screenW = $(window).width();
	
	if (screenW-imgW<screenH-imgH){
		img.attr('style','width:'+sizeVal+'%; height:auto;');
	}else{
		img.attr('style','width:auto; height:'+sizeVal*screenH/100+'px;');
	}	

	img.css({    
		display: "block",
		"margin-left": "auto",
		"margin-right": "auto"
	})
}

chrome.runtime.onMessage.addListener(
  function(request) {
	if(request.reloadPage == 0){
		window.location.reload();
	}else if(request.reloadPage == 1){
		window.location.href = $(".nav-link").attr("href");
	}	
 });

chrome.storage.sync.get(['TCLRefreshTime', 'TCLImgSize'], function(data) {	
	var value = data.TCLRefreshTime==null?10:data.TCLRefreshTime;
	var size = data.TCLImgSize==null?'m':data.TCLImgSize;
	makeNewBody();
	changeApperance(value, size);
	setTimeout(function(){window.location.href = $(".nav-link").attr("href");}, value*1000*60);
});

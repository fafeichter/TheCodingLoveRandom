var locationUrl = "http://thecodinglove.com/random";

function makeNewBody(){
	var content = $('#post1');
	$('body').html(content.html());
}

function changeApperance(value, size){
	setImgSize(size);
	$('.centre h3').replaceWith(function () {
		return "<h1 style='padding-bottom:70px; padding-top:50px'>" + $(this).html() +" - "+ value+size +"</h1>";
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
	
	var img = $('img').detach();
	img.appendTo('div.centre');
	
	var imgW = img.width();
	var imgH = img.height();
	var screenH = $(window).height();
	var screenW = $(window).width();
	
	if (screenW-imgW<screenH-imgH){
		$('img').attr('style','width:'+sizeVal+'%; height:auto;');
	}else{
		$('img').attr('style','width:auto; height:'+sizeVal*screenH/100+'px;');
	}	
}

chrome.runtime.onMessage.addListener(
  function(request) {
	if(request.reloadPage == 0){
		window.location = locationUrl;
	}else if(request.reloadPage == 1){
		window.location.reload(false);
	}	
 });

chrome.storage.sync.get(['TCLRefreshTime', 'TCLImgSize'], function(data) {	
	var value = data.TCLRefreshTime==null?10:data.TCLRefreshTime;
	var size = data.TCLImgSize==null?'m':data.TCLImgSize;
	makeNewBody();
	changeApperance(value, size);
	setTimeout(function(){window.location = locationUrl;}, value*1000);
});
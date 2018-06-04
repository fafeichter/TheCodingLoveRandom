var locationUrl = "https://thecodinglove.com/when-the-sales-guy-asks-me-to-smile-in-front-of-the-clients";
var initReloadTime = 30;
var initImgSize = 'm';

function sendReloadRequest(type){
	//0-refresh page (the same gif)
	//1-load new gif
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {reloadPage: type});
	});
}

function saveValue(){
	var sliderValue = $('#timeSlider').val();
	chrome.storage.sync.set({ TCLRefreshTime: sliderValue});
	$('#actualSliderValue').html(sliderValue+'m');
}

function saveSize(){
	chrome.storage.sync.set({ TCLImgSize: this.value});
	sendReloadRequest(0);
}

function initialize(){
	chrome.storage.sync.get(['TCLRefreshTime', 'TCLImgSize'], function(data) {
		var actualValue = data.TCLRefreshTime;
		var actualSize = data.TCLImgSize;
		
		if(actualValue==null){
			chrome.storage.sync.set({ TCLRefreshTime: initReloadTime});
			$('#timeSlider').val(initReloadTime);
		}else{
			$('#timeSlider').val(actualValue);
			$('#actualSliderValue').html(actualValue+'m');
		}
		
		if(actualSize==null){
			chrome.storage.sync.set({ TCLImgSize: initImgSize});
			$("input[name='imgSize'][value='"+initImgSize+"']").prop("checked",true);
		}else{
			$("input[name='imgSize'][value='"+actualSize+"']").prop("checked",true);
		}
	});
	
}

document.addEventListener('DOMContentLoaded', function() {
	initialize();
	
	$('#timeSlider').on("input", saveValue);	
	$('#timeSlider').on("change", function(){sendReloadRequest(0);});
	$('#openBtn').on("click", function(){chrome.tabs.create({ url: locationUrl });});
	$('#reloadBtn').on("click", function(){sendReloadRequest(1);});
	$('input[name=imgSize]').on("click", saveSize);
});


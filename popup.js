var locationUrl = "https://thecodinglove.com/random";
var initReloadTime = 30;

function sendReloadRequest(type) {
    // 0 = refresh page (the same gif)
    // 1 = load new gif
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {reloadPage: type});
    });
}

function saveInterval() {
    var sliderValue = $('#timeSlider').val();
    chrome.storage.sync.set({TCLRefreshTime: sliderValue});
    $('#actualSliderValue').html(sliderValue + 'm');
}

function initialize() {
    chrome.storage.sync.get(['TCLRefreshTime'], function (data) {
        var actualInterval = data.TCLRefreshTime;

        if (actualInterval == null) {
            chrome.storage.sync.set({TCLRefreshTime: initReloadTime});
            $('#timeSlider').val(initReloadTime);
        } else {
            $('#timeSlider').val(actualInterval);
            $('#actualSliderValue').html(actualInterval + 'm');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initialize();

    $('#timeSlider').on("input", saveInterval);
    $('#timeSlider').on("change", function () {
        sendReloadRequest(0);
    });
    $('#reloadBtn').on("click", function () {
        sendReloadRequest(1);
    });
    $('#openBtn').on("click", function () {
        chrome.tabs.create({url: locationUrl});
    });
});
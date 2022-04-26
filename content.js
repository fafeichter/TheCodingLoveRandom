function makeNewBody() {
    $(".social-share").remove();
    $(".post-meta-info").remove();
    $('.post-nav').css('display', 'none');
    $('body').html($('.blog-post').html());
}

function changeApperance(value) {
    $('.blog-post-title').replaceWith(function () {
        return "<h1>" + $(this).html() + "</h1>";
    });

    $('h1').css({
        'height': '25vh',
        'margin-left': '10%',
        'margin-right': '10%',
        'text-align': 'center',
        'font-size': '4.5rem',
        'display': 'grid',
        'align-items': 'center',
        'margin-bottom': '0'
    });

    $('div.blog-post-content').css({
        'height': '75vh',
        'text-align': 'center'
    });

    $('div p').css({
        'margin-bottom': '0',
        'height': 'inherit'
    });

    $('div p img, div p video').css({
        'height': 'inherit',
        'width': 'inherit'
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.reloadPage === 0) {
        window.location.reload();
    } else if (message.reloadPage === 1) {
        window.location.href = $(".next-posts-btn").attr("href");
    }
    sendResponse({});
});

chrome.storage.sync.get(['TCLRefreshTime'], function (data) {
    var value = data.TCLRefreshTime == null ? 1 : data.TCLRefreshTime;
    makeNewBody();
    changeApperance(value);
    setTimeout(function () {
        window.location.href = $(".next-posts-btn").attr("href");
    }, value * 1000 * 60);
});
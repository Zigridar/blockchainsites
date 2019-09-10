'use strict';

const utils = require("./utils");

const browser = new Navigation({
  defaultFavicons: true,
  newTabCallback: newTabCallback
});

//function override for specific URL tbtc://
//browser._purifyUrl = async function (url) {
//    if (urlRegex({
//            strict: false,
//            exact: true
//        }).test(url)) {
//        url = (url.match(/^https?:\/\/.*/)) ? url : 'http://' + url;
//    } else {
//        if(url.slice(0, 7) == 'tbtc://') 
//        {
//            const ret = await utils.GetPageFromBlockchain(url.substr(7), 'tBTC');
//            return "data:text/plain,"+ret;    //Specific URL
//        }
//        url = (!url.match(/^[a-zA-Z]+:\/\//)) ? 'https://www.google.com/search?q=' + url.replace(' ', '+') : url;
//    }
//    return url;
//}

function newTabCallback(url, options)
{
    if(url.slice(0, 7) == 'tbtc://')
    {
        return {postTabOpenCallback: async webview => {
            const ret = await utils.GetPageFromBlockchain(webview.src.substr(7), 'tBTC');
            webview.src = "data:text/html;base64,"+ret;
        }};
    }
}

browser.changeTab = async function (url, id)
{
    if(url.slice(0, 7) == 'tbtc://')
    {
        const ret = await utils.GetPageFromBlockchain(url.substr(7), 'tBTC');
        url = "data:text/html;base64,"+ret;
    }
    else
        url = this._purifyUrl(url);
        
    id = id || null;
    if (id == null) {
        $('.nav-views-view.active').attr('src', url);
    } else {
        if ($('#' + id).length) {
            $('#' + id).attr('src', url);
        } else {
            console.log('ERROR[electron-navigation][func "changeTab();"]: Cannot find the ID "' + id + '"');
        }
    }
} 

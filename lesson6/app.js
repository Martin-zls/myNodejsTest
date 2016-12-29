var superagent = require('superagent');
var cheerio = require('cheerio');

getpage('https://item.taobao.com/item.htm?id=536926570392');

function getpage(url){
    superagent.get(url)
        .end(function (err,sres){
            if(err){
                return next(err);
            }
        })
}



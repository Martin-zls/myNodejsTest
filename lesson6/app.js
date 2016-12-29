var superagent = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require("request");
var path = require('path');
// var mkdirp = require('mkdirp');

getpage(543365677466);

function getpage(id){
    superagent.get('https://item.taobao.com/item.htm?id='+id)
        .end(function (err,sres){
            if(err){
                return next(err);
            }

            var $ = cheerio.load(sres.text);
            $('#J_UlThumb li img').each(function(idx, element){
                var $element = $(element);
                var srcstr = $element.data('src').split('.');
                var picUrl = 'https:'+srcstr[0]+'.'+srcstr[1]+'.'+srcstr[2]+'.jpg';

                var filename = parseUrlForFileName(picUrl);  //生成文件名
                downloadImg(picUrl,filename,function() {
                    console.log(filename + ' done');
                });
            });
        })
}

function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}

var downloadImg = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        // console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
        // console.log('content-length:', res.headers['content-length']);  //图片大小
        if (err) {
            console.log('err: '+ err);
            return false;
        }
        console.log('res: '+ res);
        request(uri).pipe(fs.createWriteStream('images/'+filename)).on('close', callback);  //调用request的管道来下载到 images文件夹下
    });
};



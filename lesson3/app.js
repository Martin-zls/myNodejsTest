var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function(req, res, next) {
    superagent.get('https://www.ntjrchina.com/front/biddingInfos.do')
        .end(function (err, sres){

            if(err){
                return next(err);
            }

            var $ = cheerio.load(sres.text);
            var items = [];
            var data = JSON.parse(sres.text)
            if(data.result.code=='0001'){
                data.investmentInfoList.forEach(function(el){
                    items.push({
                        title: el.title,
                        href: el.id,
                        rate: el.loanYearRate,
                        time: el.repaymentMonths+'个月',
                        total: el.remainAmount+'元'
                    });
                });
            }

            res.send(items);
        });
});

app.listen(3000, function(req, res){
    console.log('app is running at port 3000');
});
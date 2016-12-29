var path = require('path');
var fs = require('fs');
var images = require('images');
var rootPath = __filename;
var dirPath = __dirname;
var watermarkImg = null;
getshuiyin(path.join(__dirname,'shuiyin/'));

//先获取水印图片
function getshuiyin(dir){
    fs.readdir(dir,function(error,files){
        var len = files.length;
        if(len>0){
            watermarkImg = images(path.join(dir,files[0]));
            filesInDir(path.dirname(rootPath));
        }
    });
}

//获取路径下的文件
function filesInDir(dir){
    fs.readdir(dir,function(error, files){
        var len = files.length;
        var file = null,num=0;
        for(var i=0;i<len;i++){
            file = files[i];
            var filepath = dir+"\\"+file;
            getPicture(filepath);
            if(file == 'result'){
                num++;
            }
        }
        // console.log(num,__dirname,dir);
        // console.log(dir.replace(__dirname,''));
        var dirArr = dir.replace(__dirname,'').split('\\'),newdir='result';
        if(num == 0){
            for(var i = dirArr.length-1;i>=0;i--){
                if(dirArr[i]){
                    newdir = dirArr[i]+'\\'+newdir;
                }
            }
            //新建个存放的文件夹
            fs.mkdirSync(newdir, '0755');
        }
    });
}

//筛出要加水印的图片
function getPicture(filepath){
    fs.stat(filepath,function(err,stats){
        if(stats.isFile()){
            var filename = path.basename(filepath);
            var parentDir = path.dirname(filepath);
            var fileArr = filename.split('.');
            var arr = ['jpg','jpeg','png','gif'];
            for( var i in arr ){
                if(arr[i] == fileArr[1]){
                    var sourceUrl = parentDir+'\\'+filename;
                    var saveUrl = parentDir+'\\'+'result\\'+fileArr[0]+'-shuiyin.'+fileArr[1];
                    // console.log(saveUrl);
                    addWaterMarkImg(sourceUrl,saveUrl);
                }
            }
        }else if(stats.isDirectory()){
            //水印文件夹中的文件不动
            if(path.basename(filepath) != "shuiyin" && path.basename(filepath) != "result"){
                // console.log("============["+filepath+"] isDir===========");
                filesInDir(filepath);
            }
        }else{
            console.log("unknow type of file");
        }
    });
}

//添加水印的方法，传入图片的路径sourceUrl，保存的路径saveUrl
function addWaterMarkImg(sourceUrl,saveUrl){
    var sourceImg = images(sourceUrl);
    var savePath = path.join(saveUrl);
    // 比如放置在右下角，先获取原图的尺寸和水印图片尺寸
    var sWidth = sourceImg.width();
    var sHeight = sourceImg.height();
    var wmWidth = watermarkImg.width();
    var wmHeight = watermarkImg.height();
    images(sourceImg)
    // 设置绘制的坐标位置，右下角距离 10px
    //     .draw(watermarkImg, sWidth - wmWidth - 10, sHeight - wmHeight - 10)
        .draw(watermarkImg, 20, 20)
        // 保存格式会自动识别
        .save(savePath);
}

//图片重命名
var path = require('path');
var fs = require("fs");
var rootPath = __filename;
renameFilesInDir(path.dirname(rootPath));

function changeFileName(filepath){
    fs.stat(filepath,function(err,stats){
        if(stats.isFile()){
            var filename = path.basename(filepath);
            var parentDir = path.dirname(filepath);
            var parentDirname = path.basename(path.dirname(filepath));
            var thisFilename = path.basename(__filename);
            // console.log(filename,parentDir,parentDirname,thisFilename);
            if(filename != thisFilename && filename.indexOf(parentDirname)<0){
                var newName = parentDirname+"-"+filename;
                var newPath = parentDir+"\\"+newName;
                console.log("going to rename form "+filepath+" to "+newPath);
            }
        }else if(stats.isDirectory()){
            console.log("============["+filepath+"] isDir===========");
            renameFilesInDir(filepath);
        }else{
            console.log("unknow type of file");
        }
    });
}

//
function renameFilesInDir(dir){
    fs.readdir(dir,function(error, files){
        var len = files.length;
        var file = null;
        for(var i=0;i<len;i++){
            file = files[i];
           changeFileName(dir+"\\"+file);
        }
    });
}
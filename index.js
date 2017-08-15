var http = require('http');
var https = require('https');
var path = require('path');
var port = process.env.app_port||3000;
var URI = "http://judge.u-aizu.ac.jp/onlinejudge";
// URI = "https://ghost-hujimiya.cloudno.de/";
// Create HTTP Server
http.createServer(function(req, res) {

    var uri = URI + req.url;
    var file = req.url.replace(/\?.*/ig, '');
    var ext = path.extname(file);
    var type = getContentType(ext);
    console.info("Now res.url is",req.url);
    res.writeHead(200, {
        'Content-Type': type
    });

    http.get(uri, function(response) {
        // TODO
        
        debugger
        // res.statusCode = response.statusCode;
        // res.statusMessage = response.statusMessage;
        for(let key in response.headers){
            // res.setHeader(key,response.headers[key]);
        }
        let buf = '';
        response.on('data',(d)=>{
            // debugger
            buf = buf + d.toString();
        });
        response.on("end",()=>{
            debugger
            if(buf.indexOf("platform.twitter")>0){
                debugger
            }
            res.end(buf);
            // console.log(buf);

        })
    });
}).listen(port);

// Get content-type
var getContentType = function(ext) {
    var contentType = '';
    switch (ext) {
        case "":
            contentType = "text/html";
            break;
        case ".html":
            contentType = "text/html";
            break;
        case ".js":
            contentType = "text/javascriptss";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".gif":
            contentType = "image/gif";
            break;
        case ".jpg":
            contentType = "image/jpeg";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".ico":
            contentType = "image/icon";
            break;
        default:
            contentType = "application/octet-stream";
    }

    return contentType;
};
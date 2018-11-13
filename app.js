var http = require('http');
const fs = require('fs');
var parser = require('url');
const express = require('express');

const app = express();
const server = http.createServer(app);

//Write a Nodejs server that listens on port 3001 and outputs a file content from any local directory
// var myReadStream = fs.createReadStream(__dirname + '/readme.txt','utf-8');
// var myWriteStream = fs.createWriteStream(__dirname + '/writeme.txt');
// myReadStream.on('data',function(chunk){
//     myWriteStream.write(chunk);
//     }); 


app.get('/readContent',function(req, res){

    if('readme.txt' == undefined){
        res.sendStatus(404);
        res.end()
      }
      else{
        fs.readFile('readme.txt','utf-8',function(err,data){
            fs.writeFile('writeme.txt',data)
            if(err){
                res.end(err)
               }
               else{
                res.statusCode = 200;
                res.end("writeme.txt created.........");
            }
          });
      }
  
});


//Write a Nodejs server that serves as a RESTFUL API that takes two parameters in a GET call and produces their product.
  app.get('/product/:p1/:p2',function(req,res){
    var num1 = parseInt(req.params.p1)
    var num2 = parseInt(req.params.p2)
    if(isNaN(num1) || isNaN(num2)){
        res.sendStatus(404);
        res.end()
    }
    else {
      res.write((num1*num2).toString()); //write a response
      res.end(); //end the response
    }
 })

 //Write a Nodejs server that serves as a RESTFUL  API that accepts a file content and writes them to the disk.
 app.get('/writeContent/:content',function(req,res){
    var data = req.params.content;
    fs.writeFile('output.txt',data, (err) => {
        if(err){
          res.end(err)
         }
         else{
             res.statusCode = 200;
             res.end("output.txt created");
         }
       });
})

//Write a Nodejs server that serves as a RESTFUL API that accepts a String as an input name and returns the first non-repeating character in the String.
app.get('/string/:str',function(req,res){
    var str = req.params.str
    let char = ''
    if(isNaN(parseInt(str))){
        for(var i=0; i<str.length;i++)
        {
            if(str.indexOf(str[i]) === str.lastIndexOf(str[i]))
            {
                char = str[i];
                break;
            }
        }
          res.write(char); //write a response
        res.end(); //end the response
    }
    else{
      res.sendStatus(404);
      res.end(); //end the response
    }

 })
// var server  =  http.createServer(function(req, res){
//     res.writeHead(200,{'Content-Type':'text/plain'});
//     res.end("Creating node.js server.");
// });
app.get('/',function(req, res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end("Creating Nodejs server.");
});

server.listen(3001);
console.log("server listening on port 3001");

module.exports = server;
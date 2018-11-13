const app = require('../app.js');
var expect  = require('chai').expect;
const chai =  require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = require('request');
//Reading a file from the local directory
describe(" api test case for reading file content from disk",function(){
    it('When readme file is present ',function(done) {
        chai.request(app).get(`/readContent`).end(function(err,res){
               expect(res).to.have.status(200);
               expect(res.text).to.equal(`writeme.txt created.........`);
               done();
             })
        })
  })

// for product of two numbers 
describe("Api test cases for product of two numbers",function(){
    it('Inputs must be numbers',function(done) {
      chai.request(app).get(`/product/x/y`).end(function(err,res){
             expect(res).to.have.status(404);
             expect(res.text).to.equal('Not Found');
             done();
           })
      })
  
      it('When user does not pass Input',function(done) {
          chai.request(app).get(`/product`).end(function(err,res){
                 expect(res).to.have.status(404);
                 expect(res.text).to.equal(`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET /product</pre>\n</body>\n</html>\n`);
                 done();
               })
          })
  
    it('Get the product of 2 numbers',function(done) {
      chai.request(app).get(`/product/2/4`).end(function(err,res){
           expect(res).to.have.status(200);
           expect(res.text).to.equal(`8`);
           done();
         })
    })
  })
// for non repitative character
  describe("Api test cases for first non-repitative character ",function(){
    it('When no Input is passed',function(done) {
        chai.request(app).get(`/string`).end(function(err,res){
               expect(res).to.have.status(404);
               expect(res.text).to.equal(`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET /string</pre>\n</body>\n</html>\n`);
               done();
             })
        })
        it('When Input is a number',function(done) {
            chai.request(app).get(`/string/123`).end(function(err,res){
                   expect(res).to.have.status(404);
                   expect(res.text).to.equal(`Not Found`);
                   done();
                 })
            })
     it('Print the 1st non repitative character',function(done) {
       chai.request(app).get(`/string/sumitsmi`).end(function(err,res){
             expect(res.text).to.equal(`u`);
             expect(res.status).to.equal(200);
             done();
          })
     })
   })
   // for writing  a file
   describe("Api test cases writing file content to the disk",function(){
    it('When no Content is passed',function(done) {
        chai.request(app).get(`/writeContent`).end(function(err,res){
               expect(res).to.have.status(404);
               expect(res.text).to.equal(`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET /writeContent</pre>\n</body>\n</html>\n`);
               done();
             })
        })
      it('Writing content to the local file',function(done) {
        chai.request(app).get('/writeContent/content writing in the sampleoutput').end(function(err,res){
            expect(res.status).to.equal(200);
            expect(res.text).to.equal(`output.txt created`);
            done();
         })
    })
  })

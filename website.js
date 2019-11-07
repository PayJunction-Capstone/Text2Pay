var express = require('express');
var app = express();
var router = express.Router();

/*var assert = require('assert');
var jsdom = require('mocha-jsdom');

global.document = jsdom();
*/
  
var path = __dirname + '/MDB/';
  
app.use('/',router);
app.use(express.static(path + 'pay.html'));
  
router.get('/',function(req, res){
<<<<<<< HEAD
  res.sendFile(path + 'home.html');});
=======
  res.sendFile(path + 'home.html');

  /*var button = document.getElementById('payHoward')
  button.onClick = function(res,req) {
    router.get('/pay', function(req, res, next) {
      res.sendFile(path + 'pay.html')
    });
  }
  */
});

router.get('/home',function(req, res){
  res.sendFile(path + 'home.html');
});

router.post('/', (req,res) => {
  res.redirect('/pay')
});

router.post('/pay', (req,res) => {
  res.redirect('/home')
});
>>>>>>> a816cffd167240f49d4b9c5c2340a42f5ada7f4b
  
router.get('/login',function(req, res){
  res.sendFile(path + 'login.html');
});

router.get('/forgot',function(req, res){
    res.sendFile(path + 'forgotpw.html');
});

router.get('/pay',function(req, res){
  res.sendFile(path + 'pay.html');
});

router.get('/css/*', function(req, res) {
  res.sendFile(path + req.url)
})

router.get('/pics/*', function(req, res) {
  res.sendFile(path + req.url)
})

router.get('/js/*', function(req, res) {
  res.sendFile(path + req.url)
})

router.get('/img/*', function(req, res) {
  res.sendFile(path + req.url)
})

router.get('/font/*', function(req, res) {
  res.sendFile(path + req.url)
})
/*
app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});
*/
  
app.listen(3000,function(){
  console.log("Server running at Port 3000");
});
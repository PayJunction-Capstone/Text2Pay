var express = require('express');
var app = express();
var router = express.Router();
  
var path = __dirname + '/MDB/';
  
app.use('/',router);
  
router.get('/',function(req, res){
  res.sendFile(path + 'home.html');});
  
router.get('/login',function(req, res){
  res.sendFile(path + 'login.html');
});

router.get('/forgot',function(req, res){
    res.sendFile(path + 'forgotpw.html');
});
  
app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});
  
app.listen(3000,function(){
  console.log("Server running at Port 3000");
});
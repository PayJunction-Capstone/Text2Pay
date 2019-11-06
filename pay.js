var express = require('express');
var app = express();
var router = express.Router();
  
var path = __dirname + '/MDB/';
  
app.use('/pay', pay);

router.get('/pay',function(req, res){
    res.sendFile(path + 'pay.html');
});
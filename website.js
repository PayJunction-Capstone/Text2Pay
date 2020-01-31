var express = require('express');
const https = require('https');

const accountSid = 'AC0be21a36ad616556b63e4fb2de58b74f';
const authToken = '7aed3e119c852ce96f3276611ea3bcbf';
//const twilio = require('twilio')(accountSid, authToken);

var bodyParser = require('body-parser')
var app = express();
var router = express.Router();


/*var assert = require('assert');
var jsdom = require('mocha-jsdom');
global.document = jsdom();
*/

var path = __dirname + '/MDB/';

app.use(express.json())
app.use('/',router);
//app.use(express.static(__dirname + '/build/static'));
app.use('/static', express.static(__dirname + '/reacttext2pay/build/static'))

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))

router.get('/',function(req, res){
  res.sendFile(path + 'login.html');
});

router.get('/addinfo',function(req, res){
  res.sendFile(path + 'addinfo.html');
});

router.get('/home',function(req, res){
  res.sendFile(__dirname + '/reacttext2pay/build/index.html');
});

// const uuidv4 = require('uuid/v4');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
//curl -X POST -u "pj-ql-01:pj-ql-01p" -H "Accept: application/json" -H "X-PJ-Application-Key: c98a331b-e7a7-4e64-b34c-134bfb406a30"     -d "cardNumber=444433332222111"     -d "cardExpMonth=01"     -d "cardExpYear=2020" -d "cardCvv=999"    -d "amountBase=2.00" "https://api.payjunctionlabs.com/transactions"



router.post('/incomplete/:uuidTemp', (req,res) => {
  //res.redirect('/home')
  //console.log(req.params.uuidTemp)
  //console.log(req)


  const data = {
    cardNumber:req.body.details.cardNumber,
    cardExpMonth:req.body.details.expiryMonth,
    cardExpYear:req.body.details.expiryYear,
    cardCvv:req.body.details.cardSecurityCode,
    amountBase:req.body.amountBase
  }

  var data1 = toURLcode(data)

  const options = {
    hostname: 'api.payjunctionlabs.com',
    port: 443,
    path: '/transactions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data1.length,
      'X-PJ-Application-Key': 'c98a331b-e7a7-4e64-b34c-134bfb406a30',
      'Authorization': 'Basic ' + new Buffer('julialiu16 ' + ':' + 'Jubiepie716!').toString('base64')
    }
  }

  const req1 = https.request(options, res => {
    //console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req1.on('error', error => {
    console.error(error)
  })

  //console.log(data1)

  req1.write(data1)
  req1.end()
  res.sendStatus(200)
});

router.get('/signup',function(req, res){
  res.sendFile(path + 'signup.html');
});

router.get('/forgot',function(req, res){
    res.sendFile(path + 'forgotpw.html');
});

router.get('/css/*', function(req, res) {
  //console.log(req.params)
  res.sendFile(path + req.url)
  //console.log(req)
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

function toURLcode(obj) {
  var str = [];
    for (var key in obj) {
         if (obj.hasOwnProperty(key)) {
               str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
         }
    }
    return str.join("&");
}

/*
var path = __dirname + '/MDB/';

app.use(express.json())
app.use('/',router);
app.use(express.static(path + 'pay.html'));

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))

router.get('/',function(req, res){
  res.sendFile(path + 'login.html');
});

router.get('/addinfo',function(req, res){
  res.sendFile(path + 'addinfo.html');
});

router.get('/home',function(req, res){
  res.sendFile(path + 'home.html');
});

router.get('/pay/home',function(req, res){
  res.sendFile(path + 'home.html');
});

router.get('/pay',function(req, res){
  res.redirect('/pay/b55141d8-b954-4940-a2d2-e4297a1c21f1')
});

router.get('/pay/pay',function(req, res){
  res.redirect('/pay/b55141d8-b954-4940-a2d2-e4297a1c21f1')
});

router.get('/pay/login',function(req, res){
  res.redirect('/login')
});


const uuidv4 = require('uuid/v4');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
//curl -X POST -u "pj-ql-01:pj-ql-01p" -H "Accept: application/json" -H "X-PJ-Application-Key: c98a331b-e7a7-4e64-b34c-134bfb406a30"     -d "cardNumber=444433332222111"     -d "cardExpMonth=01"     -d "cardExpYear=2020" -d "cardCvv=999"    -d "amountBase=2.00" "https://api.payjunctionlabs.com/transactions"

*/

/*

router.post('/pay/:uuidTemp', (req,res) => {
  //res.redirect('/home')
  //console.log(req.params.uuidTemp)
  //console.log(req)


  const data = {
    cardNumber:req.body.details.cardNumber,
    cardExpMonth:req.body.details.expiryMonth,
    cardExpYear:req.body.details.expiryYear,
    cardCvv:req.body.details.cardSecurityCode,
    amountBase:req.body.amountBase
  }

  var data1 = toURLcode(data)

  const options = {
    hostname: 'api.payjunctionlabs.com',
    port: 443,
    path: '/transactions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data1.length,
      'X-PJ-Application-Key': 'c98a331b-e7a7-4e64-b34c-134bfb406a30',
      'Authorization': 'Basic ' + new Buffer('julialiu16 ' + ':' + 'Jubiepie716!').toString('base64')
    }
  }

  const req1 = https.request(options, res => {
    //console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req1.on('error', error => {
    console.error(error)
  })

  //console.log(data1)

  req1.write(data1)
  req1.end()
  res.sendStatus(200)
});
*/
/*

router.get('/login',function(req, res){
  res.sendFile(path + 'login.html');
});

router.get('/signup',function(req, res){
  res.sendFile(path + 'signup.html');
});

router.get('/forgot',function(req, res){
    res.sendFile(path + 'forgotpw.html');
});


router.get('/request',function(req, res){
  res.sendFile(path + 'request.html');
});

router.get('/pay/request',function(req, res){
  res.redirect('/request');
});


// just added this for fakehome.html
router.get('/pay/home2',function(req, res){
  res.sendFile(path + 'home2.html');
});


router.get('/pay/b55141d8-b954-4940-a2d2-e4297a1c21f1',function(req, res){
  res.sendFile(path + 'pay.html');
});
*/
/*
router.get('/css/*', function(req, res) {
  //console.log(req.params)
  res.sendFile(path + req.url)
  //console.log(req)
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

/*

app.listen(3000,function(){
  console.log("Server running at Port 3000");
});

function toURLcode(obj) {
  var str = [];
    for (var key in obj) {
         if (obj.hasOwnProperty(key)) {
               str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
         }
    }
    return str.join("&");
}
*/
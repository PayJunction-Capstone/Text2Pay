var express = require('express')
var router = express.Router();

router.get('/', function(req,res,next) {
	res.render('index', {title: 'Express'});
});

//webhook listener
router.post('/listen', function(req,res,next){
	console.log(req);
	res.status(201).send();
	//transaction functions
	var txnId = req.body.data.transactionId;
	req.saveTransaction(function() {
		req.updateFrontend(txnId);
	});
});

module.exports = router;
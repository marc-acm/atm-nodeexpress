var express = require('express');
var router = express.Router();
var ulist = [{"username":"abby", "password":"123456", "amount":25000},
         {"username":"babby", "password":"123456", "amount":30000},
         {"username":"cabby", "password":"123456", "amount":35000},
		 {"username":"dabby", "password":"123456", "amount":40000},
		 {"username":"ebby", "password":"123456", "amount":45000},
         ];

var r = express();
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.cookies['username'] != null ){
		res.redirect('/execute');
	}else{
		 res.render('index', { title: 'ATM APP' });
	}
 
});

router.post('/execute', function(req, res, next) {
	var login = false;
	var amount = 0;
	for(var x = 0; x<=ulist.length - 1; x++){
		if((req.body.username == ulist[x]['username']) && (req.body.password == ulist[x]['password'])){
			login = true;
			amount = ulist[x]['amount'];
			break;
		}
	}

	if(login == true){
		res.cookie('username', req.body.username);
		res.cookie('password', req.body.password);
		res.cookie('amount', amount);
		res.render('execute', {amount: amount, username: req.body.username});

	}else{
		res.send('Invalid username or password! <br /> <a href="/">Back to index</a>');
	}
 
});


router.get('/logout', function(req, res, next) {
	res.clearCookie('username');
	res.clearCookie('password');
	res.clearCookie('amount');
	res.redirect('/');
});


router.post('/deals', function(req, res, next) {
	if(req.body.withdraw == "Withdraw"){
		res.cookie('amount', parseInt(req.cookies['amount']) - parseInt(req.body.amount));	
		res.send('Thank you for banking with us! You withdrew ' + req.body.amount + '<br /><a href="/execute">Go Back</a>');
			for(var x = 0; x<=ulist.length - 1; x++){
					if((req.cookies['username'] == ulist[x]['username']) && (req.cookies['password'] == ulist[x]['password'])){
						ulist[x]['amount'] = parseInt(req.cookies['amount']) - parseInt(req.body.amount);
						break;
					}
				}

	
	}

	if(req.body.deposit == "Deposit"){
		res.cookie('amount', parseInt(req.cookies['amount']) + parseInt(req.body.amount));	
		res.send('Thank you for banking with us! You deposited ' + req.body.amount + '<br /><a href="/execute">Go Back</a>');

			for(var x = 0; x<=ulist.length - 1; x++){
				if((req.cookies['username'] == ulist[x]['username']) && (req.cookies['password'] == ulist[x]['password'])){
					ulist[x]['amount'] = parseInt(req.cookies['amount']) - parseInt(req.body.amount);
					break;
				}
			}
	}

	// res.redirect('/execute');
	});




router.get('/execute', function(req, res, next) {
	if(req.cookies['username'] != null ){
		res.render('execute', {amount: req.cookies['amount'], username: req.cookies['username']});
	}else{
		 res.redirect('/');
	}
  
});

router.get('/users', function(req, res, next) {
  res.send('Number of Accounts: ' + ulist.length + '<br /><br /> List </br /> ' + JSON.stringify(ulist));
});

module.exports = router;

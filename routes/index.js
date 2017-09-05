var express = require('express');
var router = express.Router();
var db = [{"username":"abby", "password":"123456", "money":25000},
         {"username":"babby", "password":"123456", "money":30000},
         {"username":"cabby", "password":"123456", "money":35000},
		 {"username":"dabby", "password":"123456", "money":40000},
		 {"username":"ebby", "password":"123456", "money":45000},
         ];

var r = express();
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.cookies['username'] != null ){
		res.redirect('/transaction');
	}else{
		 res.render('index', { title: 'ATM APP' });
	}
 
});

router.post('/transaction', function(req, res, next) {
	var login = false;
	var money = 0;
	for(var x = 0; x<=db.length - 1; x++){
		if((req.body.username == db[x]['username']) && (req.body.password == db[x]['password'])){
			login = true;
			money = db[x]['money'];
			break;
		}
	}

	if(login == true){
		res.cookie('username', req.body.username);
		res.cookie('password', req.body.password);
		res.cookie('money', money);
		res.render('transaction', {money: money, username: req.body.username});

	}else{
		res.send('Invalid username or password! <br /> <a href="/">Back to index</a>');
	}
 
});


router.get('/logout', function(req, res, next) {
	res.clearCookie('username');
	res.clearCookie('password');
	res.clearCookie('money');
	res.redirect('/');
});


router.post('/transact', function(req, res, next) {
	if(req.body.withdraw == "Withdraw"){
		res.cookie('money', parseInt(req.cookies['money']) - parseInt(req.body.money));	
		res.send('Thank you for banking with us! You withdrew ' + req.body.money + '<br /><a href="/transaction">Go Back</a>');
			for(var x = 0; x<=db.length - 1; x++){
					if((req.cookies['username'] == db[x]['username']) && (req.cookies['password'] == db[x]['password'])){
						db[x]['money'] = parseInt(req.cookies['money']) - parseInt(req.body.money);
						break;
					}
				}

	
	}

	if(req.body.deposit == "Deposit"){
		res.cookie('money', parseInt(req.cookies['money']) + parseInt(req.body.money));	
		res.send('Thank you for banking with us! You deposited ' + req.body.money + '<br /><a href="/transaction">Go Back</a>');

			for(var x = 0; x<=db.length - 1; x++){
				if((req.cookies['username'] == db[x]['username']) && (req.cookies['password'] == db[x]['password'])){
					db[x]['money'] = parseInt(req.cookies['money']) - parseInt(req.body.money);
					break;
				}
			}
	}

	// res.redirect('/transaction');
	});




router.get('/transaction', function(req, res, next) {
	if(req.cookies['username'] != null ){
		res.render('transaction', {money: req.cookies['money'], username: req.cookies['username']});
	}else{
		 res.redirect('/');
	}
  
});

router.get('/users', function(req, res, next) {
  res.send('Number of Accounts: ' + db.length + '<br /><br /> List </br /> ' + JSON.stringify(db));
});

module.exports = router;

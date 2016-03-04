var express = require('express');
var router = express.Router();

router.get('/',function(req,res) {
	res.render("index",{
		actives: {home: ' class=active', products: ''}
	});
})

router.get('/products',function(req,res) {
	res.render("products",{
		actives: {products: ' class=active', home: ''}
	});
})


module.exports = router;
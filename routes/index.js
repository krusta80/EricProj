var express = require('express');
var router = express.Router();

router.get('/',function(req,res) {
	res.render("index",{});
})

router.get('/products',function(req,res) {
	res.render("products",{});
})


module.exports = router;
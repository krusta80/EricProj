var express = require('express');
var router = express.Router();
var Product = require('../models');

router.get('/',function(req,res) {
	res.render("index",{
		actives: {home: ' class=active', products: ''}
	});
})

router.get('/products',function(req,res) {
	var search = {};
	if(req.query.type === 'active') search = {discontinued: false};
	Product.find(search).then(function(products) {
		res.render("products",{
		discontinued: search.discontinued === undefined,
		type: req.query.type,
		actives: {products: ' class=active', home: ''},
		products: products
		});
	})
})

router.post('/products/add', function(req,res) {

	var product = new Product();
	product.name = req.body.name;
	product.description = req.body.description;
	
	product.save().then(function() {
		res.redirect('/products?type='+req.query.type);	
	})
	.catch(function(error){
		console.log(error);
		res.redirect('/products?type='+req.query.type);	
	}) 
});

router.get('/products/toggle/:id', function(req,res) {

	Product.findById(req.params.id)
		.then(function(product) {
			if(product.discontinued) product.discontinued = false;
			else product.discontinued = true;
			return product.save();
		})
		.then(function() {
			res.redirect('/products?type='+req.query.type);
		})
		.catch(function(error){
			console.log(error);
			res.redirect('/products?type='+req.query.type);	
		});
});

router.get('/products/quantity/:id', function(req,res) {

	Product.findById(req.params.id)
		.then(function(product) {
			product.quantity = req.query.quantity;
			return product.save();
		})
		.then(function() {
			res.redirect('/products?type='+req.query.type);
		})
		.catch(function(error){
			console.log(error);
			res.redirect('/products?type='+req.query.type);	
		});
});


module.exports = router;
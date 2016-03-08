var express = require('express');
var router = express.Router();
var Product = require('../models');

router.use(function(req, res, next){
  res.locals.discontinueButtonText = function(product){
    //logic here..
  };
  next();
});

router.get('/',function(req,res) {
	res.render("index",{
		actives: {home: ' class=active', products: ''}
	});
});
//passing alot to view-- wondering if helper methods might be a better way to go?
router.get('/products',function(req,res) {
	var search = {};
	if(req.query.type === 'active') search = {discontinued: false};
	Product.find(search)
    .sort('name')
    .then(function(products) {
      res.render("products",{
      discontinued: search.discontinued === undefined,
      selected: req.query.id,
      type: req.query.type,
      actives: {products: ' class=active', home: ''},//magic string? ' class=active' using it in two places.. 
      products: products
      });
	});
});

//use restful routes '/products'
router.post('/products/add', function(req,res, next) {
	var product = new Product();
	product.name = req.body.name;
	product.description = req.body.description;
	
	product.save()
    .then(function() {
		  res.redirect('/products?type='+req.query.type);	
	}, next);
});

//changing data? use a put
router.get('/products/toggle/:id', function(req,res, next) {

	Product.findById(req.params.id)
		.then(function(product) {
      product.discontinued = !product.discontinued;
			return product.save();
		})
		.then(function() {
			res.redirect('/products?type='+req.query.type);
		}, next);
});

//changing data? use a put
router.get('/products/quantity/:id', function(req,res, next) {

	Product.findById(req.params.id)
		.then(function(product) {
			product.quantity = req.query.quantity;
			return product.save();
		})
		.then(function() {
			res.redirect('/products?type='+req.query.type);
		}, next);
});

//make it restful
router.get('/products/delete/:id', function(req,res, next) {
	Product.findByIdAndRemove(req.params.id)
		.then(function() {
			res.redirect('/products?type='+req.query.type);
		}, next);
});


module.exports = router;

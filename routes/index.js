var express = require('express');
var router = express.Router();

router.get('/',function(req,res) {
	res.render("index",{
		actives: {home: ' class=active', products: ''}
	});
})

router.get('/products',function(req,res) {
	res.render("products",{
		actives: {products: ' class=active', home: ''},
		products: [
					{id: "x", name: 'Product X', inStock: 3, description: "This is product x", disOrRe: "Discontinue", btnType: "Danger", bgColor: "white"},
					{id: "y", name: 'Product Y', inStock: 0, description: "This is product y", disOrRe: "Recontinue", btnType: "Primary", bgColor: "#cccccc"}
				]
	});
})


module.exports = router;
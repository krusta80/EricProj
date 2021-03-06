var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test');

var productSchema = new mongoose.Schema({
	name: {type: String, required: true, unique:true},
	quantity: {type: Number, default: 0, min: 0},
	description: {type: String},
	createdDate: {type: Date, default: Date.now},
	modifiedDate: {type: Date, default: Date.now},
	discontinued: {type: Boolean, default: false}
});

productSchema.virtual('disOrRe').get(function() {
	if(this.discontinued) return "Recontinue ";
	else return "Discontinue";
});

productSchema.virtual('btnType').get(function() {
	if(this.discontinued) return "Primary";
	else return "Danger";
});

productSchema.virtual('bgColor').get(function() {
	if(this.discontinued) return "#CCCCCC";
	else return "white";
});

var productModel = mongoose.model('Product',productSchema);

module.exports = productModel;
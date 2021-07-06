const mongoose = require("mongoose");
const productsSchema = require("./Schema")

const Products = mongoose.model('Products List', productsSchema)

module.exports = Products;
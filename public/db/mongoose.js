var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ShopifyApp')

module.exports = {
    mongoose: mongoose
}
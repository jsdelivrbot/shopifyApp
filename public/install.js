var express = require('express');
var router = express.Router();
var shopifyAPI = require('shopify-node-api');
var constants = require('./constants.js')


//DEFINE LOCAL VARIABLES
var ldb_uri_base = constants.ldb_uri_base;
var shopify_hidden_ss = constants.shopify_hidden_ss;
var shopify_hidden_ak = constants.shopify_hidden_ak;
var noncerequired = require('nonce')();
var noncestring = noncerequired();


router.get('/', function(req, res, next) {
  console.log("routing to install")
    console.log(req)
    var clientShop = req.query.shop.split(".")[0]
    
    console.log(clientShop)
    
  var Shopify = new shopifyAPI({
    shop: clientShop,
    shopify_api_key: shopify_hidden_ak,
    shopify_shared_secret: shopify_hidden_ss,
    shopify_scope: 'write_script_tags',
    redirect_uri: ldb_uri_base+'/select-tier.html',
    nonce: noncestring
  });
    
console.log("redirecting to: " + ldb_uri_base+'/select-tier.html');    
  var auth_url = Shopify.buildAuthURL();
  res.redirect(auth_url);//this is where Shopify redirects you to ".../finish_auth/"!
});

module.exports = router;

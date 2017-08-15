var express = require('express');//requires Express
var router = express.Router();//creates router object
var shopifyAPI = require('shopify-node-api');

//DEFINE LOCAL VARIABLES
var ldb_uri_base = "https://shopify-second-opinions-app.herokuapp.com";//THIS IS ONLY AN EXAMPLE!!
var shopify_hidden_ss = "2a2134b27760c013e1eebd784d5dc6fe";
var shopify_hidden_ak = "167922d6d9ace8e71795cb4c10074cf4";
var shopify_hidden_shopname = "second-opinions-store";
var noncerequired = require('nonce')();
var noncestring = noncerequired();

//THIS ONE WRITES METAFIELDS
// Shopify authentication process
router.get('/', function(req, res, next) {
  console.log("routing to install")
  var Shopify = new shopifyAPI({
    shop: shopify_hidden_shopname, // MYSHOP.myshopify.com
    shopify_api_key: shopify_hidden_ak, // Your API key
    shopify_shared_secret: shopify_hidden_ss, // Your Shared Secret
    shopify_scope: 'write_products',// define the scope according to your needs!
    redirect_uri: ldb_uri_base+'/finish_auth',
    nonce: noncestring // you must provide a randomly selected value unique for each authorization request
  });

console.log("installed, now redirecting to: " + ldb_uri_base+'/finish_auth');    
  var auth_url = Shopify.buildAuthURL();
  res.redirect(auth_url);//this is where Shopify redirects you to ".../finish_auth/"!
});

module.exports = router;
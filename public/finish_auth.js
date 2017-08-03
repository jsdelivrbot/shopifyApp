var express = require('express');//requires Express
var router = express.Router();//creates router object

var shopifyAPI = require('shopify-node-api');//SHOPIFY

//DEFINE LOCAL VARIABLES
var shopify_hidden_at = "";//define empty variable for access token
var ldb_uri_base = "nameless-ocean-79702.herokuapp.com";//THIS IS ONLY AN EXAMPLE!!
var shopify_hidden_ss = "275648faae5fca94ba4950ee18fd2d66";
var shopify_hidden_ak = "167922d6d9ace8e71795cb4c10074cf4";
var shopify_hidden_shopname = "second-opinions-store";


router.get('/finish_auth', function(req, res){
    //This is where it all happens: this is what happens you access "myn00bapp.herokuapp.com/install/"
    
    var query_params = req.query;
    
    console.log("FINISH_AUTH"+res)
    
    //define the configs for your connection
    var config = {
        shop: shopify_hidden_shopname, // MYSHOP.myshopify.com
        shopify_api_key: shopify_hidden_ak, // Your API key
        shopify_shared_secret: shopify_hidden_ss, // Your Shared Secret
        shopify_scope: 'write_products',//you might want to adapt the scope to your needs
        redirect_uri: ldb_uri_base+'/finish_auth',//not sure whether you have to specify that, but hey it works
        nonce: query_params.state//this is where you grab the random string created before
    };
    
    //create new shopify object for the next step
    var Shopify = new shopifyAPI(config);
    
    Shopify.exchange_temporary_token(query_params, function(err, data){
        shopify_hidden_at=data['access_token'];
        // YOU HAVE SAVED YOUR ACCESS_TOKEN YAY!
        console.log(shopify_hidden_at)
    });
});

module.exports = router;
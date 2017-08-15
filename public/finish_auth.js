var express = require('express');//requires Express
var router = express.Router()
var shopifyAPI = require('shopify-node-api');//SHOPIFY

//DEFINE LOCAL VARIABLES
var shopify_hidden_at = "";//define empty variable for access token
var ldb_uri_base = "https://shopify-second-opinions-app.herokuapp.com";//THIS IS ONLY AN EXAMPLE!!
var shopify_hidden_ss = "2a2134b27760c013e1eebd784d5dc6fe";
var shopify_hidden_ak = "167922d6d9ace8e71795cb4c10074cf4";
var shopify_hidden_shopname = "second-opinions-store";


router.get('/', function(req, res){
    //This is where it all happens: this is what happens you access "myn00bapp.herokuapp.com/install/"
    
    var query_params = req.query;
    
    console.log(query_params)
    
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
        console.log(shopify_hidden_at)
        console.log(config)
        console.log(Shopify.hostname())
        console.log(shopify_hidden_ak)
    });
        
    
    // Trying to make request outside of module
    
    /*var options = {
        hostname: 'second-opinions-store.myshopify.com',
        port: 443,
        path: '/admin/products.json',
        method: 'GET',
        headers: {
            'X-Shopify-Access-Token': shopify_hidden_at
        }
    }
    
    
    var https = require('https')
    https.request(options, function(res){
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        })
    })*/
    
    res.sendFile(__dirname+'/shopify.html')
    
});

module.exports = router;
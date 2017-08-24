var express = require('express');
var router = express.Router()
var shopifyAPI = require('shopify-node-api');
var constants = require('./constants.js')

//DEFINE LOCAL VARIABLES
var shopify_hidden_at = "";//define empty variable for access token
var ldb_uri_base = constants.ldb_uri_base;
var shopify_hidden_ss = constants.shopify_hidden_ss;
var shopify_hidden_ak = constants.shopify_hidden_ak;



router.get('/', function(req, res){
    
    var query_params = req.query;
    
    console.log(query_params)
    
    //define the configs for your connection
    var config = {
        shop: query_params.shop.split(".")[0],
        shopify_api_key: shopify_hidden_ak,
        shopify_shared_secret: shopify_hidden_ss,
        redirect_uri: ldb_uri_base+'/finish_auth',
        nonce: query_params.state
    };
    
    //create new shopify object for the next step
    var Shopify = new shopifyAPI(config);
        
    Shopify.exchange_temporary_token(query_params, function(err, data){
        shopify_hidden_at=data['access_token'];
        console.log("Access token: "+shopify_hidden_at)
        console.log(config)
        
        Shopify.get('/admin/shop.json', function(err, data, headers){
            var shopDomain = data.shop.domain
            var shopEmail = data.shop.email
            var shopName = data.shop.name
            var shopPhone = data.shop.phone
            var shopCountry = data.shop.country_name
            
            console.log("Shop Details as below:")
            
            console.log(shopName+", "+shopEmail+", "+shopPhone+", "+shopCountry+", "+shopDomain)
        })
        
        Shopify.get('/admin/script_tags.json', function(err, data, headers){
            var scriptTags = data.script_tags
            
            var scriptTagsDelete = []
            
            for (i=0; i<scriptTags.length; i=i+1){
                if (scriptTags[i].src.indexOf('secondopinions.help')>=0){
                   
                    scriptTagsDelete.push(scriptTags[i].id)
                    
                }
            }
            
            for (j=0; j<scriptTagsDelete.length; j=j+1){
                
                Shopify.delete('/admin/script_tags/'+scriptTagsDelete[j]+'.json')
                
            }
            

            var scriptTag1 = {
                "script_tag": {
                "event": "onload",
                "src": "https://secondopinions.help/api/v1/scripts/feedback-panel.js?app_id=af3f34c5c4c38b7fe2aeea04cd703f615101c6d856fcdfdb&app_secret=ef800ea5832bca09a5950d69aa82abfc329fe8c23e8091b4aaaa4c6975310753"
                }
            }


            Shopify.post('/admin/script_tags.json', scriptTag1, function(err, data1, headers){
            

            })
            
        })

        res.sendFile(__dirname+'/shopify.html')
        
        
    });
    
    

    
});

module.exports = router;
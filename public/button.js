

    $("body").append("<div class='panel-second'><p class='panel-text'>Unsure about this item? Get a second opinion now</p><center><div id='rate8-handler'></div></center><img class='close-second' src='https://secondopinions.help/assets/images/cancel.png'><img class='open-second' src='https://secondopinions.help/assets/images/back1.png'></div>")
    
    
    $("head").append("<link rel='stylesheet' href='https://secondopinions.help/assets/css/button.css'>")
    



setTimeout(function(){
                 
                    $(".panel-text").show()
                    $(".open-second").hide()
                    $("#rate8-handler").show()
                    $(".close-second").show()
                    $(".panel-second").addClass("panel-second2")
                    $(".panel-second2").removeClass("panel-second")
                
            },10000)


setTimeout(function(){

                $(".close-second").click(function(){
                    $(".panel-second").hide();
                    $(".panel-second2").hide();
                })
                
                $(".open-second").click(function(){{
                    
                    $(".panel-text").show()
                    $(".open-second").hide()
                    $("#rate8-handler").show()
                    $(".close-second").show()
                    $(".panel-second").addClass("panel-second2")
                    $(".panel-second2").removeClass("panel-second")
                    
                }})
}, 500)
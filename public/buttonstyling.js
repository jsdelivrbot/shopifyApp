setTimeout(function(){
                 
                    $(".panel-second").show()
            }, 1)    
                
            setTimeout(function(){
                 
                    $(".panel-text").show()
                    $(".open-second").hide()
                    $("#rate8-handler").show()
                    $(".close-second").show()
                    $(".panel-second").addClass("panel-second2")
                    $(".panel-second2").removeClass("panel-second")
                
            },10000)

// Script to close second opinions panel upon button click

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
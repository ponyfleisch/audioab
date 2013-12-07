$.fn.audioab = function( options ) {

    return this.each(function() {
        var items = [];
        var active = null;
        var $e = $(this);
                
        $.map(options.classes, function(c){
            var button = $e.find('a.'+c);            
            var element = $e.find('audio.'+c);
            
            var item = {};
            
            element.mediaelementplayer({
                audioWidth: '290',
                success: function(api){
                    item['api'] = api;
                }
            });
                        
            var container = $e.find('.mejs-container.'+c);
    
            item['container'] = container;
            item['element'] = element;
            item['button'] = button;
                
            items.push(item);
            
            container.css({top: '50px'});
            
            button.on('click', function(e){
                e.preventDefault();
                var $b = $(this);
                if(active != item){
                    container.css({top: 0, position: 'absolute'});
                    $b.removeClass('btn-default').addClass('btn-success').addClass('active');                    

                    if(active){
                        active.button.removeClass('active').removeClass('btn-success').addClass('btn-default');
                        active.container.css({top: '50px'});
                        
                        var currentTime = 0;
                        try{
                            currentTime = active.api.currentTime;
                            item.api.setVolume(active.api.volume);
                        }catch(err){
                            
                        }
                        
                        var paused = active.api.paused;                        
                        if(!paused){
                            active.api.pause();
                            $(item.api).one('playing', function(){
                                try{
                                    item.api.setCurrentTime(currentTime);
                                }catch(err){
                                    
                                }
                            });
                            item.api.play();
                        }else{
                            try{
                                item.api.setCurrentTime(currentTime);
                            }catch(err){
                                
                            }
                        }
                    }
                    
                    
                    active = item;
                }
                
            });
        });
        
        items[0].button.trigger('click');
        

        
    });
    
    
};

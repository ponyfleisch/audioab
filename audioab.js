var items = [];

$.fn.audioab = function( options ) {
    var active = null;

    return this.each(function() {
        var $e = $(this);
                
        $.map(options.classes, function(c){
            var button = $e.find('button.'+c);            
            var element = $e.find('audio.'+c);
            
            var item = {};
            
            element.mediaelementplayer({
                success: function(api){
                    item['api'] = api;
                }
            });
                        
            var container = $e.find('.mejs-container.'+c);
    
            /*
            var item = {
                button: button,
                element: element,
                container: container,
                api: api
            };
            */
            
            item['container'] = container;
            item['element'] = element;
            item['button'] = button;
                
            items.push(item);
            
            container.css({top: '50px'});
            
            button.on('click', function(){
                var $b = $(this);
                if(active != item){
                    container.css({top: 0, position: 'absolute'});
                    $b.removeClass('btn-default').addClass('btn-success').addClass('active');                    

                    if(active){
                        active.button.removeClass('active').removeClass('btn-success').addClass('btn-default');
                        active.container.css({top: '50px'});
                        var paused = active.api.paused;                        
                        active.api.pause();
                        item.api.setCurrentTime((active.api.currentTime));
                        item.api.setVolume(active.api.volume);
                        if(!paused) item.api.play();
                    }
                    
                    
                    active = item;
                }
                
            });
        });
        
        items[0].button.trigger('click');
        

        
    });
    
    
    function switchTo(){
        
    }
    
};

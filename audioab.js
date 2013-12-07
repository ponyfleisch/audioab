$.fn.audioab = function( options ) {
    var items = [];
    var active = null;

    return this.each(function() {
        var $e = $(this);
                
        options.classes.map(function(c){
            var button = $e.find('button.'+c);            
            var element = $e.find('audio.'+c);
            var api = null;
            
            element.mediaelementplayer({
                success: function(local_api){
                    api = local_api;
                }
            });
            var container = $e.find('.mejs-container.'+c);
    
            var item = {
                button: button,
                element: element,
                container: container,
                api: api
            };
    
            items.push(item);
            
            container.css({left: '-1000px'});
            
            button.on('click', function(){
                var $b = $(this);
                if(active != item){
                    if(active){
                        active.button.removeClass('active').removeClass('btn-success').addClass('btn-default');
                        active.container.css({left: '-1000px'});
                        var paused = active.api.paused;                        
                        active.api.pause();
                        item.api.setCurrentTime((active.api.currentTime));
                        item.api.setVolume(active.api.volume);
                        if(!paused) item.api.play();
                    }
                    $b.removeClass('btn-default').addClass('btn-success').addClass('active');                    
                    
                    container.css({left: 0, top: 0, position: 'absolute'});
                    
                    active = item;
                }
                
            });
        });
        
        items[0].button.trigger('click');
        

        
    });
    
    
    function switchTo(){
        
    }
    
};

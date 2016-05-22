/**
 * Created by hoyo on 19/05/2016.
 */

'use strict';

(function(){

    /* ANNOTATION PLUGIN*/
    var ANNO_on = false;
    var ANNO_INTERVAL = 1;
    var ANNO_FREQ = 100; // milisecond
    var rectList = [];

    function clearAnno(){
        if ( rectList && rectList.length ){
            rectList.forEach(function(anno){
                anno.remove();
            })
        }
        rectList = [];
    }

    function viewAnnotation(options){

        console.log(options);
        if ( ANNO_on ){
            clearAnno();
            ANNO_on = false;
            return;
        } else {
            ANNO_on = true;
        }
        /* Grab the necessary DOM elements */
        var player = options.player;
        var video =  options.video;
        var divParent = this.el().parentNode.height;
        console.log(player.width());
        console.log(player.height());

        /* Apply annotations base on passing scenario */
        var runAnnotation = function(scenario){
            if( Object.prototype.toString.call( scenario ) != '[object Array]' ) {
                return;
            }
            var rectAround = video.getBoundingClientRect();
            // Clear all annotation for this scene

            var loopFunction = setInterval(function(){
                clearAnno();
                for( var i = 0; i < scenario.length; ++i){
                    var frame = scenario[i];
                    var reDiff = player.currentTime() - frame['time'];  // Re-check
                    if ( reDiff < 0 || reDiff > ANNO_INTERVAL ){
                        continue;
                    }
                    // if ( drawed ) => wait
                    for ( var j = 0; j < frame['dataset'].length; ++j){
                        var dataset = frame['dataset'][j];
                        var how = {
                            pos: {
                                x: dataset['x']*rectAround.width + rectAround.left,
                                y: dataset['y']*rectAround.height + rectAround.top
                            },
                            size: {
                                w: dataset['w']*rectAround.width,
                                h: dataset['h']*rectAround.height
                            }
                        }
                        var rect = createAnnotation(how);
                        document.body.appendChild(rect);
                        rectList.push(rect);
                    }
                    break;
                }
                if ( !ANNO_on ){
                    clearTimeout(loopFunction);
                    clearAnno();
                }
            }, ANNO_FREQ);
        }
        httpGetAsync("video/sample.json", runAnnotation );
    }
    videojs.plugin('viewAnnotation', viewAnnotation);

})();
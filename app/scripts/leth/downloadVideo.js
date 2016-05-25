/**
 * Created by hoyo on 25/05/2016.
 */

'use strict';


(function(){

    function createButtonVideoJs(playerId, css, handle ){
        var videoPlayer = videojs('#' + playerId);
        var resultButtonClass = videojs.extend(videoJsButtonClass, {
            constructor: function () {
                videoJsButtonClass.call(this, videoPlayer);
            },
            handleClick: function() {
                handle(videoPlayer)
            }
        });
        var resultButton = videoPlayer.controlBar.addChild(new resultButtonClass());
        resultButton.addClass(css);
        return resultButton;
    }

    function downloadVideo(){

        createButtonVideoJs(this.el().id, "vjs-icon-play-circle", function(player){
            var a = document.createElement("a");
            //<a id="adownload" download="video.webm" href="src" title="Download recorded video">
            a.setAttribute("download", "video.webm");
            a.setAttribute("href", player.src());
            a.click();
            console.log(a);
        });

    }

    videojs.plugin('downloadVideo',downloadVideo);

})();

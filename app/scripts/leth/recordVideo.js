/**
 * Created by hoyo on 25/05/2016.
 */

(function(){
    'use strict';

    // Google keyword: creating-webm-video-from-getusermedia

    var _recording = false;

    function recordVideo(){

        var player = videojs('#' + this.el().id);
        var video = player.$('video');

        console.log(video.videoWidth);
        console.log(video.videoHeight);
        console.log(video);

        // Request navigator from browser
        var navigator = window.navigator;
        navigator.getMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

        video.autoplay = true; // Make sure we're not frozen!

        var canvas = document.createElement("canvas");

        var zip = 3;        // Zip ratio
        canvas.width = 100;
        canvas.height = 50;
        var ctx = canvas.getContext('2d');

        var rafId;
        var frames = [];
        var CANVAS_WIDTH = 100;
        var CANVAS_HEIGHT = 50;

        createButtonVideoJs(this.el().id, "vjs-captions-button", function(player) {

            if ( _recording ){
                try{
                    stop();
                } catch (e){
                    console.log(e);
                }
                _recording = false;
            } else {
                frames = [];
                _recording = true;
            }

            canvas.width = CANVAS_WIDTH = video.videoWidth/zip;
            canvas.height = CANVAS_HEIGHT = video.videoHeight/zip;

            function drawVideoFrame(time) {
                rafId = requestAnimationFrame(drawVideoFrame);
                ctx.drawImage(video, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                frames.push(canvas.toDataURL('image/webp', 1));
            };

            rafId = requestAnimationFrame(drawVideoFrame); // Note: not using vendor prefixes!

            function stop() {
                cancelAnimationFrame(rafId);  // Note: not using vendor prefixes!
                // 2nd param: framerate for the video file.
                var webmBlob = Whammy.fromImageArray(frames, 1000 / 80);
                var video = document.createElement('video');
                video.src = window.URL.createObjectURL(webmBlob);
                video.setAttribute("controls",true);
                //document.body.appendChild(video);
                insertVideo(video);
                //document.querySelector("#adownload").setAttribute('href',video.src);
            }
        });
    }

    videojs.plugin('recordVideo',recordVideo);

})();
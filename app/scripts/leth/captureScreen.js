/**
 * Created by hoyo on 19/05/2016.
 */

'use strict';

(function(){

    function captureScreen(store, zip){


        if ( Object.prototype.toString.call( store ) === '[object Array]' ){

            createButtonVideoJs(this.el().id, "vjs-captions-button", function(player){
                var video = player.$('video');
                var canvas = document.createElement('canvas');
                canvas.setAttribute('crossOrigin', 'Anonymous');
                video.setAttribute('crossOrigin', 'Anonymous');
                var w = video.videoWidth/zip;
                var h = video.videoHeight/zip;

                canvas.width = w;
                canvas.height = h;
                var context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, w, h);
                var image = canvas.toDataURL("image/jpeg");


                console.log("Image Size", image.length);
                var name = player.src().match(/\w*[.]\w*$/)[0]
                    + "_"
                    + parseInt(player.currentTime() / 60, 10)
                    + "_"
                    + parseFloat(player.currentTime() % 60, 10.2).toFixed(2) + ".jpeg";
                //var id = Math.random() + "";
                //localStorage.setItem(id, image);
                //console.log('id', id);


                var imageObj = {
                    name: name,
                    data: image
                }
                store.push(imageObj);
                try{
                    insertImage('links', imageObj);
                    }catch(e){
                }
            });
        };

        if ( Object.prototype.toString.call( store ) === '[object Function]' ){

            createButtonVideoJs(this.el().id, "vjs-captions-button", function(player){
                var canvas = document.createElement('canvas');
                var w = player.videoWidth/zip;
                var h = player.videoHeight/zip;

                canvas.width = w;
                canvas.height = h;
                var context = canvas.getContext('2d');
                context.drawImage(player.$('video'), 0, 0, w, h);
                var image = canvas.toDataURL("image/jpeg");

                var name = player.src().match(/\w*[.]\w*$/)[0]
                    + "_"
                    + parseInt(player.currentTime() / 60, 10)
                    + "_"
                    + parseFloat(player.currentTime() % 60, 10.2).toFixed(2) + ".jpeg";
                var id = Math.random() + "";
                localStorage.setItem(id, image);
                store(image);
            });
            return;
        }
    }

    videojs.plugin('captureScreen',captureScreen);

})();

/* ===== Remove child ===== */
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

/* ===== Ajax get JSON ===== */
function httpGetAsync(url, func) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            func(JSON.parse(xmlHttp.responseText));
    }

    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

/* ===== Test function ===== */
function testConsolelog(){
    console.log(arguments);
}

/* ===== Create annotation ===== */
function createAnnotation(how){
    var res = document.createElement("div");
    res.id = 'anno';
    res.style.paddingLeft = res.style.paddingRight = how.size.w/2 + "px";
    res.style.paddingTop = res.style.paddingBot = how.size.h/2 + "px";
    res.style.top = how.pos.y + "px";
    res.style.left = how.pos.x + "px";
    res.className += ' leth-annotation';
    return res;
}

/* ===== Get link from source ===== */
function applyMultiSrc(fileUrl){
    httpGetAsync(fileUrl,function(config){
        if( Object.prototype.toString.call( config ) != '[object Array]' ) {
            console.log(config, "is not a json array!");
            return;
        }
        var videosContainer = document.querySelector("#videos-container");
        var row = null;
        for( var i = 0; i < config.length; ++i ){
            var video = config[i];
            console.log(video);
            if ( i % 4  == 0 ){
                if ( row != null ){
                    videosContainer.appendChild(row);
                }
                row = document.createElement("div");
                row.className += " row";
            }
            var videoElement = createSubVideoElment(video['url'], null);
            row.appendChild(videoElement);
        }
        if ( row != null ){
            videosContainer.appendChild(row);
        }
        console.log(videosContainer);
    });
}

/* ===== Create video ===== */
function createSubVideoElment(url, annoPath){

    var padding = document.createElement("div");
    padding.className += " col-sm-3 nopadding";
    var bound = document.createElement("div");
    bound.className += " embed-responsive embed-responsive-16by9";
    var video = document.createElement("video");
    video.className += " video-js vjs-default-skin";
    video.setAttribute("autoplay", "true");
    var source = document.createElement("source");
    source.setAttribute("src", url);
    if ( url.indexOf("rtmp") > -1 ){
        source.setAttribute("type", "video/rtmp");
    }

    video.appendChild(source);
    bound.appendChild(video);
    padding.appendChild(bound);
    console.log(padding);
    return padding;
}
var videoJsButtonClass = videojs.getComponent('Button');
/* ======== Add new Button ======= */
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

/* ====== Test ====== */
function test(videoPlayer){
    /* ===== VideoJs annotation ===== */
    var downloadButtonClass = videojs.extend(videoJsButtonClass, {
        constructor: function () {
            videoJsButtonClass.call(this, videoPlayer);
        },
        handleClick: function () {
            var filePath = videoPlayer.src();
            window.location.assign(filePath + '?download=true');
        }
    });
    var downloadButton = videoPlayer.controlBar.addChild(new downloadButtonClass());
    downloadButton.addClass("vjs-subtitles-button");
}

    //<div class="w3s-img">
    //    <a href='{{image.data}}' title="Banana" data-gallery>
    //<img src='{{image.data}}' alt="Northern Lights" width="200" height="200">
    //    </a>
    //    <div class="w3s-img-desc">{{image.name}}</div>
    //</div>
    //* ======= Create ======= *//

function insertImage(id, imageObj){

    var div = document.createElement("div");
    div.className += " w3s-img";
    var a = document.createElement("a");
    a.className += " w3s-img";
    a.setAttribute("href", imageObj.data);
    a.setAttribute("title", imageObj.name);
    a.setAttribute("data-gallery", "true");
    var image = new Image();
    image.src = imageObj.data;
    image.setAttribute("width", "200");
    image.setAttribute("height", "200");
    //var desDiv = document.createElement("div");
    //desDiv.className += " w3s-img-desc";
    //desDiv.textContent(imageObj.name);

    a.appendChild(image);
    div.appendChild(a);
    //div.appendChild(desDiv);
    document.getElementById('links').appendChild(div);
}

// ===== Insert video ===== //
function insertVideo(video){
    var div = document.createElement("div");
    div.className += " w3s-img";
    var a = document.createElement("a");
    a.className += " w3s-img";
    var id = Date.now();
    video.setAttribute("id", id);
    video.className += " video-js vjs-default-skin"

    //var desDiv = document.createElement("div");
    //desDiv.className += " w3s-img-desc";
    //desDiv.textContent(imageObj.name);

    a.appendChild(video);
    div.appendChild(a);
    //div.appendChild(desDiv);
    document.getElementById('links').appendChild(div);
    setTimeout(function(){
        videojs(id + "" , {
            "width":200,
            "height": 200,
            'playbackRates' : [0.5, 1, 1.5, 2]
        }, function(){});

        videojs(id + "").downloadVideo();

    }, 100);
}
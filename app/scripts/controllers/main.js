/*global angular, $ */
/**
 * @ngdoc function
 * @name vjsVideoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vjsVideoApp
 */
'use strict';

angular.module('lethApp')
    .controller('MainCtrl', ['$scope', '$rootScope', '$sce', function ($scope, $rootScope, $sce) {
        var vm = this;

        vm.videoArray = videoArray;
        vm.videosSelected = [];
        vm.addingVideo = generateVideoSrc();
        vm.mainVideo = videoArray[0];
        vm.screenShots = [];

        function addToFullList(video, cap){
            if ( !video ){
                return;
            }
            if ( !cap ){
                cap = 4;
            }

            if ( video.selected ){
                var ind = vm.videosSelected.indexOf(video);
                if ( ind > -1 ){
                    video.selected = false;
                    videojs(video.id + "_vid").dispose();
                    vm.videosSelected.splice(ind, 1);
                }
                return;
            }

            if ( vm.videosSelected.length < cap ){
                video.selected = true;
                vm.videosSelected.push(video);
            }
        }

        // ====== OPEN TOAST ===== //
        function openToast (){
            if ( arguments.length <= 1 ){
                toastr["info"](arguments[0]);
                return;
            }
            toastr[arguments[0]](arguments[1]);
        }

        // ======= Load to full ======= //
        function loadFullScreen(element){

            vm.videosSelected.forEach(function(selectedV){
                try{
                    videojs(selectedV.id + "_vid").play();
                } catch (e){
                    videojs(selectedV.id + "_vid", {}, function(){});
                }
            });

            openToast('info','Press ESC to exit multi screen mode');

        }

        function generateVideoSrc(){
            return {
                "id"        : Math.floor((Math.random() * 100) + 1),
                "url"       : "",
                "annoPath"  : ""
            };
        }

        /* ======= Add video to the main video array ======= */
        function addVideoSrc(){
            vm.videoArray.push(vm.addingVideo);
            var id = vm.addingVideo.id;
            // Delay a moment for angular generate HTML element
            setTimeout(function(){
                videojs(id + "_sm_vid", {}, function(){}).play();
            },100);
            vm.addingVideo = generateVideoSrc();
            $('#fsModal').modal('hide');
        }


        /* ======= Change main =======*/
        function changeMainVideo(videoSrc, mainVideoId){
            vm.mainVideo = videoSrc;
            //mainVideo_html5_api
            var video = videojs('#' + mainVideoId);
            video.src(videoSrc.url);
        }

        $('#fsModal').on('hidden.bs.modal', function() {
           vm.videosSelected.forEach(function(video){
               videojs(video.id + "_vid").pause();
           });
        });

        $scope.thumbImages = [];

        vm.openToast = openToast;
        vm.addToFullList = addToFullList;
        vm.loadFullScreen = loadFullScreen;
        vm.addVideoSrc = addVideoSrc;
        vm.changeMainVideo = changeMainVideo;

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }
}]);


toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

var videoArray = [
    {
        "id"        : Math.floor((Math.random() * 100) + 1),
        "url"       : "video/sample.mp4",
        "annoPath"  : "video/sample.json"
    },
    {
        "id"        : Math.floor((Math.random() * 100) + 1),
        "url"       : 'rtmp://s1.thailandstreaming.net:1935/lkmetro/lkmetro3.stream',
        "type"      : "video/rtmp"
    },
    {
        "id"        : Math.floor((Math.random() * 100) + 1),
        "url"       : "video/sample2.mp4"
    },
    {
        "id"        : Math.floor((Math.random() * 100) + 1),
        "url"       : "video/sample.mp4"
    },
    {
        "id"        : Math.floor((Math.random() * 100) + 1),
        "url"       : "video/sample.mp4"
    },
    {
        "id"        : Math.floor((Math.random() * 100) + 1),
        "url"       : 'http://video.dailymail.co.uk/video/mol/2015/10/13/3334455893120077409/640x360_3334455893120077409.mp4'
    }
    //,{
    //    "id"        : Math.floor((Math.random() * 100) + 1),
    //    "url"       : "video/sample2.mp4"
    //},
    //{
    //    "id"        : Math.floor((Math.random() * 100) + 1),
    //    "url"       : "video/sample.mp4"
    //},
    //{
    //    "id"        : Math.floor((Math.random() * 100) + 1),
    //    "url"       : "video/sample2.mp4"
    //},
    //{
    //    "id"        : Math.floor((Math.random() * 100) + 1),
    //    "url"       : "video/sample.mp4"
    //},
    //{
    //    "id"        : Math.floor((Math.random() * 100) + 1),
    //    "url"       : "video/sample2.mp4"
    //},
    //{
    //    "id"        : Math.floor((Math.random() * 100) + 1),
    //    "url"       : "video/sample.mp4"
    //},
    //{
    //    "id"        : Math.floor((Math.random() * 100) + 1),
    //    "url"       : "video/sample2.mp4"
    //},
    //{
    //    "id"        : Math.floor((Math.random() * 100) + 1),
    //    "url"       : "video/sample.mp4"
    //}
];



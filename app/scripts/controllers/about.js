'use strict';

/**
 * @ngdoc function
 * @name lethApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lethApp
 */
angular.module('lethApp')
  .controller('AboutCtrl', function () {

    var vm = this;

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


    // ====== OPEN TOAST ===== //
    var openToast = function(){
      if ( arguments.length <= 1 ){
        toastr["info"](arguments[0]);
        return;
      }
      toastr[arguments[0]](arguments[1]);
    };

    vm.openToast = openToast;
  });



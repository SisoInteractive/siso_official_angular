"use strict";

angular.module('server',[])

.config(['$stateProvider', function( $stateProvider ) {

        $stateProvider
            .state('siso.server',{
                url:'/server',
                views:{
                    'main@':{
                        controller:"ServerController as ServerCtrl",
                        templateUrl:"server/server.tmpl.html"
                    }
                }
            })
}])

.controller('ServerController',['$scope','$http',function( $scope , $http){

        var ServerCtrl = this;

        function init(){
            var news_body = $('.m-server');
            news_body.mCustomScrollbar({
                autoHideScrollbar:false,
                theme:"inset",
                scrollEasing:"easeOut",
                scrollInertia:400,
                contentTouchScroll:30
            });


            $('.m-server-nav').hammer().bind('tap',function(){
                index.heardVideo.play();//导航视频播放
                $('.header,.main-views').removeClass('active');
            });
        }
        init();
    }])

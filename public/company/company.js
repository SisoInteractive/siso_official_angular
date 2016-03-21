/**
 * Created by hongjianqing on 15/9/16.
 */
"use strict";

angular.module('company', [])

.config(['$stateProvider' , function ( $stateProvider ){

        $stateProvider
            .state('siso.company',{
                url:'/company',
                views:{
                    'main@': {
                        controller: 'CompanyController as CompanylCtrl',
                        templateUrl: 'company/company.tmpl.html'
                    }
                }
            })

}])

.controller('CompanyController',['$scope','$http',function( $scope , $http ){

        var CompanylCtrl = this;
        CompanylCtrl.hotospImgs = [];
        //if( localStorage.getItem('CompanylCtrl.hotospImgs') ){
        //    CompanylCtrl.hotospImgs = JSON.parse( localStorage.getItem('CompanylCtrl.hotospImgs'));
        //    $scope.$on('$viewContentLoaded', function () {
        //        init();
        //    });
        //}else {
            $scope.$on('$viewContentLoaded', function () {
                $http.get("data/company.json").then(function (result) {
                    var hotospImgs = result.data;
                    if (hotospImgs) {
                        CompanylCtrl.hotospImgs = hotospImgs;
                        localStorage.setItem("CompanylCtrl.hotospImgs", JSON.stringify(hotospImgs));
                    }
                    init();
                }, function (error) {
                    init();
                });
            });
        //};


        function init(){
            console.log('join company');
            $('.m-company').addClass('active');

            /* company Scrollbar init  */
            var company = $('.m-company-wrapper');
            company.mCustomScrollbar({
                autoHideScrollbar:false,
                theme:"inset",
                scrollEasing:"easeOut",
                scrollInertia:400,
                contentTouchScroll:30
            });

            $('.m-company-nav').hammer().bind('tap',function(){
                index.heardVideo.play();//导航视频播放
                $('.header,.main-views').removeClass('active');
            });

            $('.playVideo-btn').hammer().bind("tap",function(){
                var video = $(this).parent().children('.myVideo');
                video.get(0).play();
                $(this).fadeOut();
                $(this).siblings('.myVideo_zz').fadeOut();
            })
            $('.myVideo').hammer().bind("tap",function(){
                $(this).get(0).pause();
                var myVideo_box = $(this).parent();
                myVideo_box.children('.myVideo_zz').fadeIn();
                myVideo_box.children('.playVideo-btn').fadeIn();
            })
        }

    }])

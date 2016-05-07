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

.controller('CompanyController',['$scope','$http', 'Entry', function( $scope , $http, Entry ){

        var CompanylCtrl = this;
        CompanylCtrl.hotospImgs = [];

        Entry.get('photo').then(
            function (res) {
                CompanylCtrl.hotospImgs = res.data.result;
                init();
            }, function (res) {
                console.error(res);
                init();
            });

        function init(){
            console.log('join company');
            $('.m-company').addClass('active');

            /* company Scrollbar init  */
            var company = $('.m-company-wrapper');
            company.mCustomScrollbar({
                autoHideScrollbar: false,
                theme: "inset",
                scrollEasing: "easeOut",
                scrollInertia: 400,
                contentTouchScroll: 30
            });

            $('.m-company-nav').hammer().bind( 'tap', function() {
                index.heardVideo.play();//导航视频播放
                $('.header,.main-views').removeClass('active');
            });

            $('.playVideo-btn').hammer().bind( "tap", function() {
                var video = $(this).parent().children('.myVideo');
                video.get(0).play();

                $(this).fadeOut();
                $(this).siblings('.myVideo_zz').fadeOut();
            });

            $('.myVideo').hammer().bind( "tap", function() {
                $(this).get(0).pause();
                var myVideo_box = $(this).parent();
                myVideo_box.children('.myVideo_zz').fadeIn();
                myVideo_box.children('.playVideo-btn').fadeIn();
            });

        }

    }])

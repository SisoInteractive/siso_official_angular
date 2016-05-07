/**
 * Created by hongjianqing on 15/9/16.
 */
"use strict";

angular.module('careers', [])

.config(['$stateProvider' , function ( $stateProvider ){

        $stateProvider
            .state('siso.careers',{
                url:'/careers',
                views:{
                    'main@': {
                        controller: 'CareersController as CareerCtrl',
                        templateUrl: 'careers/careers.tmpl.html'
                    }
                }
            })

}])

.controller('CareersController',['$scope','$http','Entry',function( $scope , $http, Entry ){
        var CareerCtrl = this;
        CareerCtrl.careersList = [];

        $scope.$on( '$viewContentLoaded', function() {
            Entry.get('career').then(
                function (res) {
                    CareerCtrl.careerList = res.data.result;
                }, function (res) {
                    console.error(res);
                    init();
            });

            $scope.$on('onRepeatLast', function(scope, element, attrs) {
                init();
            });

            CareerCtrl.formatBody = function (body) {
                return '<p>' + body.split('\n').join('</p><p>') + '</p>';
            };
        });

        function init(){
            console.log('join  careers');
            $('.m-careers').addClass('active');
            var news_body = $('.m-news-body');
            news_body.mCustomScrollbar({
                autoHideScrollbar:false,
                theme:"inset",
                scrollEasing:"easeOut",
                scrollInertia:400,
                contentTouchScroll:30
            });

            var item_box_bd = $('.item-box .hd');
            item_box_bd.hammer().bind('tap', function() {
                $(this).siblings(".content-dd").slideToggle();
                $(this).parents('.careerList').siblings('.careerList').find('.content-dd').slideUp();

                var icon = $(this).siblings('.icon-add');
                icon.toggleClass("active");

                var dl = $(this).parent();
                var db = $(this).parents('.bd');
                var db_top = parseInt(db.css('padding-top'));
                var dl_index = dl.index();

                var item_box = $(this).parents('.item-box');

                var calculate_height = 0;
                db.children('.calculate-height').each( function() {
                    calculate_height = calculate_height + $(this).outerHeight(true);
                });

                var goto_height = getItem_height( item_box,dl_index ) + db_top + calculate_height;
                setTimeout(function(){
                    $('.m-news-body').mCustomScrollbar("scrollTo",goto_height)
                },410);

            });

            function getItem_height( item_box, dl_index ) {
                var sum_height= 0;
                item_box.children( 'dl:lt('+ dl_index +')' ).each(function() {
                    sum_height = sum_height + $(this).outerHeight( true );
                });

                return sum_height;
            }


        }

        $('.m-careers-nav').hammer().bind( 'tap', function() {
            index.heardVideo.play();//导航视频播放
            $('.header,.main-views').removeClass('active');
        });


    }])

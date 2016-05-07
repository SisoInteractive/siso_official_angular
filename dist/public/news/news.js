/**
 * Created by hongjianqing on 15/9/16.
 */
"use strict";

angular.module('news', [])

.config(['$stateProvider' , function ( $stateProvider ){

        $stateProvider
            .state('siso.news',{
                url:'/news',
                views:{
                    'main@': {
                        controller: 'NewsController as NewsCtrl',
                        templateUrl: 'news/news.tmpl.html'
                    }
                }
            })

}])

.controller('NewsController',['$scope', '$http', 'Entry', function( $scope , $http, Entry ) {

        var NewsCtrl = this;
        NewsCtrl.newList = [];
        $scope.$on('$viewContentLoaded',function(){
            Entry.get('news').then(
                function (res) {
                    NewsCtrl.newList = res.data.result;
                }, function (res) {
                    console.error(res);
            });
            $scope.$on('onRepeatLast', function(scope, element, attrs){
                init();
            });
        });

        function init(){
            console.log('join  news');
            $('.m-news').addClass('active');

            var news_body = $('.m-news-body');
            news_body.mCustomScrollbar({
                autoHideScrollbar:false,
                theme:"inset",
                scrollEasing:"easeOut",
                scrollInertia:400,
                contentTouchScroll:30
            });

            var item_box_bd = $('.item-box .hd');
            item_box_bd.hammer().bind( 'tap', function() {
                $(this).siblings(".content-dd").slideToggle();

                $(this).parents('.newsList').siblings('.newsList').find('.content-dd').slideUp();

                var icon = $(this).siblings('.icon-add');
                icon.toggleClass("active");

                var dl = $(this).parent();
                var db = $(this).parents('.bd');
                var db_top = parseInt(db.css('padding-top'));
                var item_box = $(this).parents('.item-box');
                var dl_index = dl.index();
                var calculate_height = 0;

                db.children('.calculate-height').each(function() {
                    calculate_height = calculate_height + $(this).outerHeight(true);
                });
                var goto_height = getItem_height(item_box,dl_index) + db_top + calculate_height;

                setTimeout(function(){
                    $('.m-news-body').mCustomScrollbar( "scrollTo", goto_height )
                },410)
            });

            function getItem_height(item_box,dl_index){
                var sum_height= 0;
                item_box.children('dl:lt('+ dl_index +')').each(function() {
                    sum_height = sum_height + $(this).outerHeight(true);
                });

                return sum_height;
            }

        };

        $('.m-news-nav').hammer().bind( 'tap', function() {
            index.heardVideo.play();//导航视频播放
            $('.header,.main-views').removeClass('active');
        });

    }])

/**
 * Created by hongjianqing on 15/9/9.
 */
"use strict";

angular.module('home', [
    'home.model',
    'entry.service'
])
    .config(['$stateProvider', '$httpProvider', function( $stateProvider, $httpProvider ) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $stateProvider
            .state('siso.home', {
                url: '/home',
                views: {
                    'main@': {
                        controller: 'HomeController as HomeCtrl',
                        templateUrl: 'home/home.tmpl.html'
                    }
                },
                onExit:function() {}
            })
    }])

    .controller('HomeController', ['$scope','$http','$state','Home','Entry',function ($scope, $http, $state, Home, Entry) {
        //  show page
        var HomeCtrl = this;
        HomeCtrl.caseList = [];
        $scope.$on('$viewContentLoaded',function(){
            HomeCtrl.isMobile = index.window_width < 500;

            Entry.get('case').then(
                function (res) {
                    var caseList = [];
                    var resultList = res.data.result;
                    for ( var i = 0; i < resultList.length; i++ ) {
                        if (resultList[i].pushHome == true) {
                            caseList.push(resultList[i]);
                        } else {
                            break;
                        }
                    }

                    function rearrangement(a,b){
                        return a.order - b.order;
                    }

                    caseList.sort(rearrangement);
                    HomeCtrl.caseList = caseList;
                }, function (res) {
                    console.error(res);
                    init();
                });
            $scope.$on('onRepeatLast', function(scope, element, attrs){
                /* caseRList data processing */
                //
                init();
            });

            HomeCtrl.formatBody = function ( body ) {
                return '<p>' + body.split('\n').join('</p><p>') + '</p>';
            };
        });

        function init(){
            index.initNumber++;
            console.log('进入 main1!' + index.initNumber );
            /* Data initialization */
            var title_bg = $('.title-bg');
            var more_span = $('.more');
            var nextItem = HomeCtrl.caseList[0];
            title_bg.css({'background': '#' + nextItem.homeBlockColor, 'opacity':'0.95'});
            more_span.css({'background':'#' + nextItem.homeBtnColor});

            dataList(1);// init data

            $('.container-list').addClass('active');
            //parallax
            $('.frame-bg').parallax({});

            //fullPage.js
            if ( typeof $.fn.fullpage.destroy === 'undefined' ) {
                $('#fullpage').fullpage({
                    continuousVertical: true,
                    easing: 'easeInOutCubic',
                    //This callback is fired once the user leaves a section
                    onLeave: function( index, nextIndex, direction ) {
                        dataList(nextIndex);

                        var nextItem = HomeCtrl.caseList[nextIndex-1];
                        title_bg.css({'background': '#' + nextItem.homeBlockColor, 'opacity':'0.95'});
                        more_span.css({'background':'#' + nextItem.homeBtnColor});
                    }
                });
            } else {
                $.fn.fullpage.destroy("all");

                $('#fullpage').fullpage({
                    easing: 'easeInOutCubic',
                    //This callback is fired once the user leaves a section
                    onLeave: function(index, nextIndex, direction){
                        dataList(nextIndex);

                        var nextItem = HomeCtrl.caseList[nextIndex-1];
                        title_bg.css({'background': '#' + nextItem.homeBlockColor, 'opacity':'0.95'});
                        more_span.css({'background':'#' + nextItem.homeBtnColor});
                    }
                });
            } // destroy home-component plugin event

            function dataList(caseList){
                if(caseList){
                    var dataIndex = caseList - 1;

                    $( '.m-article-title' ).find( '.item-go' ).attr('data-index',HomeCtrl.caseList[dataIndex].order);

                    $( '.m-article-title' ).find( '.item-bd' ).html( HomeCtrl.caseList[dataIndex].title );

                    $( '.m-article-title' ).find( '.item-ft' ).html( HomeCtrl.formatBody(HomeCtrl.caseList[dataIndex].body) );
                }

            }

            //click moveSectionUp-btn
            $('#moveSectionUp-btn').hammer().bind( "tap", function() {
                $('#fullpage').fullpage.moveSectionUp();
            });

            //click moveSectionDown-btn
            $('#moveSectionDown-btn').hammer().bind( "tap", function() {
                $('#fullpage').fullpage.moveSectionDown();
            });

            $('.container-list-btn').hammer().bind( 'tap', function() {
                index.heardVideo.play();//导航视频播放

                $('.header,.main-views').removeClass('active');
            });

            // TODO
            $('.item-go').hammer().bind( "tap", function() {
                $('.detail-project-views').addClass('active');

                $('.detail-bg').addClass('active');

                var dataIndex = $(this).attr('data-index');
                setTimeout(function(){
                    $state.go('siso.caseDetail', {index:dataIndex});
                },1200);
            });
        }

    }]);


var myApp = angular.module('myApp',[]);
myApp.controller('ShowController', function ($scope) {
    $scope.shows = [
        {title: '幸福来敲门', subscribe: true},
        {title: '逆世界',subscribe: false},
        {title: '机器人总动员', subscribe: true},
        {title: '闻香识女人', subscribe: true},
        {title: '时间规划局', subscribe: false},
    ];
});
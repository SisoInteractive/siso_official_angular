/**
 * Created by hongjianqing on 15/9/9.
 */
"use strict";

angular.module('home', [
    'home.model'
])
    .config(['$stateProvider',function( $stateProvider ) {

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


    .controller('HomeController', ['$scope','$http','$state','Home',function ($scope, $http, $state ,Home) {
        //  show page
        var HomeCtrl = this;
        HomeCtrl.caseList = [];
        $scope.$on('$viewContentLoaded',function(){
            Home.getHomeList().then(function (result) {
                HomeCtrl.caseList = result;
            });
            $scope.$on('onRepeatLast', function(scope, element, attrs){
                /* caseRList data processing */
                //
                init();
            });
        });
        function init(){
            console.log('进入 main!');
            /* Data initialization */
            dataList(1);
            $('.container-list').addClass('active');
            //parallax
            $('.frame-bg').parallax({});
            //fullPage.js
            $('#fullpage').fullpage({
                css3: true,
                scrollingSpeed:800,
                continuousVertical: true,
                easing: 'easeInOutCubic',
                easingcss3: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
                //This callback is fired once the user leaves a section
                onLeave: function(index, nextIndex, direction){
                    var title_bg = $('.title-bg');
                    var more_span = $('.more');
                    var move_box_span = $('.move-box span');
                    dataList(nextIndex);
                    switch ( nextIndex ){
                        case 1:
                            title_bg.css({'background':'#1c6b38', 'opacity':'0.95'});
                            more_span.css({'background':'#1c6b38'});
                            move_box_span.removeClass();
                            move_box_span.addClass('green');
                            break;
                        case 2:
                            title_bg.css({'background':'#b61d22', 'opacity':'0.95'});
                            more_span.css({'background':'#d8282e'});
                            move_box_span.removeClass();
                            move_box_span.addClass('red');
                            break;
                        case 3:
                            title_bg.css({'background':'#a54c0c', 'opacity':'0.95'});
                            more_span.css({'background':'#c2621e'});
                            move_box_span.removeClass();
                            move_box_span.addClass('brown');
                            break;
                        case 4:
                            title_bg.css({'background':'#e49e4b', 'opacity':'0.95'});
                            more_span.css({'background':'#FFAE4E'});
                            move_box_span.removeClass();
                            move_box_span.addClass('brown');
                            break;
                        case 5:
                            title_bg.css({'background':'#949494', 'opacity':'0.95'});
                            more_span.css({'background':'#919191'});
                            move_box_span.removeClass();
                            move_box_span.addClass('gray');
                            break;
                    }

                }
            });

            function dataList(caseList){
                if(caseList){
                    var dataIndex = caseList - 1;
                    $( '.m-article-title' ).find( '.bd-ul' ).attr('data-index', dataIndex + 1)
                    $( '.m-article-title' ).find( '.item-bd' ).html( HomeCtrl.caseList[dataIndex].title );
                    $( '.m-article-title' ).find( '.item-ft' ).html( HomeCtrl.caseList[dataIndex].content );
                }

            }

            //each and loading images
            $('.data-img').each(function(){
                var data_src = $(this).attr('data-source');
                var dom_path = "assets/images/";
                if(index.window_width < 500){
                    dom_path = "assets/images/mobile/m-";
                };
                var img_path = dom_path+data_src;
                if(data_src){
                    $(this).attr('src',img_path);
                };
            });

            //click moveSectionUp-btn
            $('#moveSectionUp-btn').hammer().bind("tap",function(){
                $('#fullpage').fullpage.moveSectionUp();
            })
            //click moveSectionDown-btn
            $('#moveSectionDown-btn').hammer().bind("tap",function(){
                $('#fullpage').fullpage.moveSectionDown();
            })

            $('.container-list-btn').hammer().bind('tap',function(){
                index.heardVideo.play();//导航视频播放
                $('.header,.main-views').removeClass('active');
            });


            // TODO
            $('.item-go').hammer().bind("tap",function(){
                $('.detail-project-views').addClass('active');
                $('.detail-bg').addClass('active');
                var dataIndex = $(this).attr('data-index');
                setTimeout(function(){
                    $state.go('siso.caseDetail', {index:dataIndex});
                },1200);
            });
        }

    }]);
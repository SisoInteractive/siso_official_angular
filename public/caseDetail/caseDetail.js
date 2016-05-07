/**
 * Created by hongjianqing on 15/9/16.
 */
"use strict";

angular.module('caseDetail', [])

.config(['$stateProvider' , function ( $stateProvider ){

        $stateProvider
            .state('siso.caseDetail',{
                url:'/caseDetail?index:dataIndex',
                views:{
                    'caseDetail@': {
                        controller: 'CaseDetailController as CaseDetailCtrl',
                        templateUrl: 'caseDetail/caseDetail.tmpl.html'
                    }
                },
                onExit:function() {
                    $('.detail-project-views').removeClass('active');
                    $('.detail-bg').removeClass('active');
                }
            })
}])

.controller('CaseDetailController',['$scope','$stateParams','$location','$state',function( $scope , $stateParams,$location,$state ) {

        $scope.$on('$viewContentLoaded', init );

        function init (){
            console.log('进入 caseDetail!');
            $('.detail-bg').addClass('active');

            $('.detail-project-views').addClass('active');

            $('.playVideo-btn').hammer().bind("tap", function() {
                var video = $(this).parent().children('.myVideo');
                video.get(0).play();

                $(this).fadeOut();
                $(this).siblings('.myVideo_zz').fadeOut();
            })

            $('.myVideo').hammer().bind("tap", function() {
                $(this).get(0).pause();
                var myVideo_box = $(this).parent();

                myVideo_box.children('.myVideo_zz').fadeIn();
                myVideo_box.children('.playVideo-btn').fadeIn();
            })

            /* mCustomScrollbar start */
            $('.detail-item-body').mCustomScrollbar({
                autoHideScrollbar:false,
                theme:"inset",
                scrollEasing:"easeOut",
                scrollInertia:800,
                contentTouchScroll:30,
                callbacks:{whileScrolling:function(){}}
            });

            //detail-bxslider
            var slider = $( '.bxslider' ).each(function () {
                var that = $(this);
                var slider = that.bxSlider({
                    infiniteLoop: true,
                    mode: 'fade',
                    controls: false,
                    auto: true,
                    autoHover: true,
                    autoDelay: 3000
                });

                that.parents('.detail-bxslider').find('.bx-prev').hammer().bind("tap", function() {
                    console.log('prev');
                    slider.goToPrevSlide();
                });

                that.parents('.detail-bxslider').find('.bx-next').hammer().bind("tap", function() {
                    console.log('next');
                    slider.goToNextSlide();
                });

            });

            /* Determine whether it is pc   */
            if ( index.window_width > 500 ) {
                setTimeout(function(){
                    start_drag_banner();
                    hover_detail();
                },300);
            } else {
                $(".detail-description-touch").remove();
            }

            /* Drag banner img */
            function start_drag_banner(){
                var img = $('.Drag-banner-img');
                var banner_width = img.width();

                var Drag_btn = $('.Drag-btn');
                var rect_x = banner_width/2;

                img.css( 'clip' , "rect( 0 "+ rect_x +"px "+ img.height() +"px 0 )" );
                Drag_btn.css( 'left', ''+ (rect_x - Drag_btn.width()/2+1 ) +'px' );

                $('.Drag-btn').hammer().bind( 'tap pan',function(eve){
                    var drag_X = eve.gesture.srcEvent.clientX;
                    if(drag_X > banner_width * 0.1 && drag_X < banner_width * 0.9 ){
                        img.css('clip',"rect( 0 "+ ( drag_X ) +"px "+ img.height() +"px 0 )");
                        Drag_btn.css('left',''+ ( drag_X - Drag_btn.width() / 2 )+'px');
                    }
                });

            }

            $(window).resize(function(){
                /* Determine whether it is pc  */
                if ( index.window_width < 500 ) {
                    $(".detail-description-touch").remove();
                }

                start_drag_banner();
            });

            $('.detail-wrapper-nav').hammer().bind( 'tap', function() {
                $('.header,.main-views').removeClass('active');
            });


            /* hover_detail_banner */
            function hover_detail() {
                var dom_Time;
                var dom = $('.detail-description-touch-img');
                var dom_width = dom.width();
                var max_offset = dom_width - index.window_width;
                var translate3d_x = index.getTransForm('.detail-description-touch-img');

                $('.touch-span').hover(function(){
                    var direction = $(this).attr('data-direction');
                    if ( direction=='right' ) {
                        if(translate3d_x <= 0) {
                            dom_Time = setInterval(function(){
                                translate3d_x = translate3d_x - 2;
                                dom.css("webkitTransform","translate3d("+ translate3d_x + "px,0,0)");
                                if(-translate3d_x >= max_offset){
                                    clearInterval(dom_Time);
                                }
                            },10 );
                        }
                    }
                    if ( direction=='left' ) {
                        if( translate3d_x < 0 ) {
                            dom_Time = setInterval(function(){
                                translate3d_x = translate3d_x + 2;
                                dom.css("webkitTransform","translate3d("+ translate3d_x + "px,0,0)");
                                if(translate3d_x >= 0){
                                    clearInterval(dom_Time);
                                }
                            },10);
                        }
                    }

                },function(){
                    clearInterval( dom_Time );
                })

            };

            var togglePage = {}
            togglePage.Url = function( $location ) {
                if ( $location.search().index ) {
                    index.toggle_detail_wrapper.setIndex($location.search().index)
                } else {
                    $location.search( "index" , "1" );
                    index.toggle_detail_wrapper.setIndex(1);
                }
            };

            togglePage.Page = function() {
                setTimeout(function(){
                    location.hash = "#/caseDetail?index="+ index.toggle_detail_wrapper.index +"";
                },800)
            };

            togglePage.Url( $location );

            /* toggle for detail-wrapper */
            $('.detail-down').hammer().bind("tap",function(){
                index.toggle_detail_wrapper.next();
                togglePage.Page()
                $('#detail-wrapper').addClass('active');
            });

            $('.detail-up').hammer().bind("tap",function(){
                index.toggle_detail_wrapper.up();
                $('#detail-wrapper').addClass('active');
                togglePage.Page()
            });

            $('.detail-wrapper-nav').hammer().bind('tap',function(){
                index.heardVideo.play();//导航视频播放
                $('.detail-project-views').removeClass('active');
                $('.header').removeClass('active');
            });

            $('.detail-description-five li').hammer().bind('tap', function() {
                $(".detail-project-views").fadeOut("400");
                var that = $(this);
                setTimeout(function() {
                    $(".detail-project-views").fadeIn("400");
                    index.toggle_detail_wrapper.setIndex(that.attr('data-index'));
                    togglePage.Page();
                }, 400 )
            });

        }


    }])

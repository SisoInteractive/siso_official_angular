/**
 * Created by hongjianqing on 15/9/14.
 */
"use strict";

angular.module('mostRecent', [
    'project.model'
])

    .config(['$stateProvider',function( $stateProvider ) {
        $stateProvider
            .state('siso.mostRecent', {
                url: '/mostRecent',
                views: {
                    'main@': {
                        controller: 'MostRecentController as MostRecentCtrl',
                        templateUrl: 'mostRecent/mostRecent.tmpl.html'
                    }
                }
            })
    }])

    .controller('MostRecentController', ['$scope','$http','$state','Project','Entry',function ($scope, $http, $state, Project, Entry ) {
        var MostRecentCtrl = this;
        var initNub = 0;
        MostRecentCtrl.caseList = [];
        $scope.$on('$viewContentLoaded',function(){
            Entry.get('case').then(
                function (res) {
                    var data = res.data.result;
                    var dataOdd = [];
                    var dataEven= [];

                    for( var i = 0; i<data.length; i++ ) {
                        if( i%2 == 0 ){
                            dataOdd.push(data[i]);
                        }else{
                            dataEven.push(data[i]);
                        }
                    }

                    MostRecentCtrl.caseList = [dataEven,dataOdd];

                }, function (res) {
                    console.error(res);
                    init();
            });

            $scope.$on('onRepeatLast', function(scope, element, attrs){
                /* caseRList data processing */
                initNub++
                if ( initNub==1 ) {
                    var mostRecentLi = $('.mostRecent-body .left .item:eq(0)');
                    var mostRecentTmpl = $("<li class='item half show' id='RecruitmentBox'>"
                                        +"<div class='item-img'><img  width='100%'></div>"
                                        +"<div class='item-img' style='background: #ffcc00'>&nbsp;</div>"
                                        +"<div class='bg'></div>"
                                            +"<ul>"
                                                +"<li class='item-hd'>招聘信息</li>"
                                                +"<li class='item-bd'>H5前端web移动开发</li>"
                                                +"<li class='item-ft'>公司项目70%为移动端H5开发,30%PC端页面，如有github, 请附带进简历, 我们会去阅读你的代码。</li>"
                                            +"</ul>"
                                        +"</li>")
                    mostRecentTmpl.insertAfter(mostRecentLi);
                }

                init();
            });

            $('.m-mostRecent').addClass('active');
            $('.detail-bg').addClass('active');

        });

        function init(){
            /* jquery scroll for mostRecent */
            $("#mostRecent-wrapper").mCustomScrollbar({
                autoHideScrollbar: false,
                theme: "inset",
                scrollEasing: "easeOut",
                scrollInertia: 800,
                callbacks:{
                    whileScrolling:function(){
                        //console.log(this.mcs.topPct);
                    }
                }
            });

            /*Control mostRecent-body --> li height*/
            function mostRecent_item(){
                var mostRecent_li = $(".item-box .item");
                mostRecent_li.each(function( item, self ) {
                    var mostRecent_li_width_value = $(self).width();
                    $(self).css('height',mostRecent_li_width_value+"px");
                });
            }
            mostRecent_item();

            $(window).resize(function () {
                index.window_width = $(window).width();
                index.window_height = $(window).height();
                mostRecent_item();
            });

            $('.mostRecent-nav').hammer().bind( 'tap', function() {
                index.heardVideo.play();//导航视频播放

                $('.header,.main-views').removeClass('active');
            });

            // component toggle
            $('.item-go').hammer().bind( "tap", function() {
                $('.detail-project-views').addClass('active');

                $('.detail-bg').addClass('active');

                var dataIndex = $(this).attr('data-index');
                setTimeout(function(){
                    $state.go('siso.caseDetail', {index:dataIndex});
                },1200);
            });

            //招聘module toggle
            $("#RecruitmentBox").hammer().bind( "tap", function() {
                $(".main-views").fadeOut("300");
                setTimeout(function(){
                    $(".main-views").fadeIn();
                    $state.go('siso.careers');
                },300);

            });

        }

    }]);
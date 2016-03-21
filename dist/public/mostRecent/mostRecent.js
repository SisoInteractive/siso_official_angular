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

    .controller('MostRecentController', ['$scope','$http','$state','Project',function ($scope, $http, $state, Project ) {

        var MostRecentCtrl = this;
        MostRecentCtrl.leftCase = [];
        MostRecentCtrl.rightCase = [];
        $scope.caseRList = []
        $scope.$on('$viewContentLoaded',function(){
            Project.getProjectList().then(function (result) {
                $scope.caseRList = result;
            });
            $scope.$on('onRepeatLast', function(scope, element, attrs){
                /* caseRList data processing */
                //
                init();
            });
            $('.m-mostRecent').addClass('active');
            $('.detail-bg').addClass('active');
        });



        function init(){
            /* jquery scroll for mostRecent */
            $("#mostRecent-wrapper").mCustomScrollbar({
                autoHideScrollbar:false,
                theme:"inset",
                scrollEasing:"easeOut",
                scrollInertia:800,
                callbacks:{
                    whileScrolling:function(){
                        //console.log(this.mcs.topPct);
                    }
                }
            });

            /*Control mostRecent-body --> li height*/
            function mostRecent_item(){
                var mostRecent_li = $(".item-box .item");
                mostRecent_li.each(function(item,self){
                    var mostRecent_li_width_value = $(self).width();
                    $(self).css('height',mostRecent_li_width_value+"px");
                });
            }
            mostRecent_item();

            $(window).resize(function(){
                index.window_width = $(window).width();
                index.window_height = $(window).height();
                mostRecent_item();
            });

            $('.mostRecent-nav').hammer().bind('tap',function(){
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

    }])
/**
 * Created by hongjianqing on 15/9/16.
 */
"use strict";

angular.module('about', [])

.config(['$stateProvider' , function ( $stateProvider ){

        $stateProvider
            .state('siso.about',{
                url:'/about',
                views:{
                    'main@': {
                        controller: 'AboutController as AboutCtrl',
                        templateUrl: 'about/about.tmpl.html'
                    }
                }
            })

}])

.controller('AboutController',['$scope', function($scope){

        $scope.$on('$viewContentLoaded', init);

        function init(){
            console.log( 'join about' );
            $('.m-about').addClass('active');

            if ( index.window_width > 500 ) {
                // 百度地图API功能
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(121.468548,31.247761);
                map.centerAndZoom(point,16);
                //创建地址解析器实例
                var myGeo = new BMap.Geocoder();
                //将地址解析结果显示在地图上,并调整地图视野
                myGeo.getPoint( "上海市闸北区光复路581号", function(point) {
                    if ( point ) {
                        map.centerAndZoom(point, 16);
                        map.addOverlay(new BMap.Marker(point));

                        var marker = new BMap.Marker(point);  // 创建标注
                        map.addOverlay(marker);              // 将标注添加到地图中
                        map.setMapStyle({style:'grayscale'});

                        var label = new BMap.Label(" ",{offset:new BMap.Size(-20,-20)});
                        marker.setLabel(label);
                    }else{
                        alert("您选择地址没有解析到结果!");
                    }
                }, "上海市闸北区光复路");
            }


            $('.about-nav').hammer().bind( 'tap', function() {
                $('.header,.main-views').removeClass('active');
            });


        }
        

    }])

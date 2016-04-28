/**
 * Created by hongjianqing on 15/9/9.
 */
"use strict";

angular.module('siso', [
    'ui.router',
    'home',
    'mostRecent',
    'caseDetail',
    'company',
    'news',
    'careers',
    'about',
    'server'
])
    .directive('onLastRepeat', function() {
        return function(scope, element, attrs) {
            if (scope.$last) setTimeout(function(){
                scope.$emit('onRepeatLast', element, attrs);
            }, 1);
        };
    })

    .config([ '$stateProvider', '$urlRouterProvider', '$httpProvider', function( $stateProvider , $urlRouterProvider, $httpProvider ) {
        $stateProvider
            .state('siso', {
                url:'',
                abstract:true
            });
        $urlRouterProvider.otherwise('/home');
    }])

    .controller( 'MainController' , ['$scope', function($scope) {
        var MainCtrl = this;
        $scope.URLS = URLS;
    }])

    .filter('to_trusted',['$sce',function($sce){
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);
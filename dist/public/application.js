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

    .config([ '$stateProvider', '$urlRouterProvider', function( $stateProvider , $urlRouterProvider ) {
        $stateProvider
            .state('siso', {
                url:'',
                abstract:true
            });
        $urlRouterProvider.otherwise('/home');

    }])

    .controller( 'MainController' , [function(  ) {
        var MainCtrl = this;
    }])

    .filter('to_trusted',['$sce',function($sce){
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }])
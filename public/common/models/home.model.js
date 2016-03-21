/**
 * Created by hongjianqing on 15/9/23.
 */
angular.module('home.model', [])

    .service('Home',['$http', '$q', function($http, $q){
        var model = this;
        var URLS = {
            GET_LIST: 'data/home.json',
            GET_DETAIL: ''
        };
        var homelist;
        function extract( result ) {
            return result.data;
        };

        function cacheList( result ){
            homelist = extract(result);
            localStorage.setItem("homelist", JSON.stringify(homelist));//写入缓存
            return homelist;
        };

        model.getHomeList = function(){
            return (homelist) ? $q.when( homelist ) : $http.get(URLS.GET_LIST).then( cacheList );;
            function getCL(){
                if(localStorage.getItem('homelist')){
                    return $q.when( JSON.parse(localStorage.getItem('homelist')))
                }else{
                    return $http.get(URLS.GET_LIST).then( cacheList );
                }
            }
        }
    }]);

angular.module('project.model', [])

.service('Project',['$http', '$q', function($http, $q){
        var model = this;
        var URLS = {
            GET_LIST: 'data/mostRecent.json',
            GET_DETAIL: ''
        };
        var projectList;
        function extract( result ) {
            return result.data;
        };

        function cacheList( result ){
            projectList = extract(result);
            localStorage.setItem("projectList", JSON.stringify(projectList));
            return projectList;
        };

        model.getProjectList = function(){
            return ( projectList ) ? $q.when( projectList ) : $http.get(URLS.GET_LIST).then( cacheList );
            //没有判断当前的数据是否不一样，所以暂时不用
            function getCL(){
                if(localStorage.getItem('projectList')){
                    return $q.when( JSON.parse(localStorage.getItem('projectList')))
                }else{
                    return $http.get(URLS.GET_LIST).then( cacheList );
                }
            }
        }
    }]);

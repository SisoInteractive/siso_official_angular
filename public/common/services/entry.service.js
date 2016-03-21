angular.module('entry.service', [

])

    .factory('Entry', ['$http', '$q', function ($http, $q) {
        var URLS = {
            FETCH: 'http://localhost:4000/api/v1/',
            CONFIG: {
                headers: {
                    'Authorization': 'Basic ' + window.btoa('sammok:a123456..')
                }
            }
        };
        var entries = {};

        function getEntry (column) {
            var deferred = $q.defer();

            if (entries[column]) {
                deferred.resolve(entries[column]);
            } else {
                $http.get(URLS.FETCH + column, URLS.CONFIG).then(function (entries) {
                    entries[column] = entries;
                    deferred.resolve(entries);
                });
            }

            return deferred.promise;
        }

        return {
            get: getEntry
        }
    }]);


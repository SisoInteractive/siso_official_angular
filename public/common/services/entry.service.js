angular.module('entry.service', [

])

    .factory('Entry', ['$http', '$q', function ($http, $q) {
        var entries = {};

        function getEntry (column) {
            var deferred = $q.defer();

            if (entries[column]) {
                deferred.resolve(entries[column]);
            } else {
                $http.get((URLS.BASE + URLS.api.FETCH + column), URLS.api.CONFIG).then(function (entries) {
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


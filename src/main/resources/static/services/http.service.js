// SERVICES
foundITApp.service('httpService', function ($http, StorageService) {
    var self = {
        baseUrl: 'http://localhost:8080/',
        /**
         *
         * @param path
         * @param queryParams
         * @returns {*}
         */
        getData: function (path, queryParams) {
            var url = self.baseUrl + path + self.__buildQueryStr(queryParams);
            var headers = {};
            var token = StorageService.getAuthToken();
            if (token) {
                headers['x-auth-token'] = token;
            }
            console.log('httpService::getData::url', url);
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        },

        /**
         *
         * @param path
         * @param payload
         * @returns {*}
         */
        postData: function (path, payload) {
            var url = self.baseUrl + path;
            var headers = {};
            var token = StorageService.getAuthToken();
            if (token) {
                headers['x-auth-token'] = token;
            }
            console.log('httpService::postData::url', url);
            return $http({
                method: 'POST',
                headers: headers,
                url: url,
                data: payload
            });
        },

        /**
         *
         * @param path
         * @param payload
         * @returns {*}
         */
        putData: function (path, payload) {
            var url = self.baseUrl + path;
            var headers = {};
            var token = StorageService.getAuthToken();
            if (token) {
                headers['x-auth-token'] = token;
            }
            console.log('httpService::postData::url', url);
            return $http({
                method: 'PUT',
                headers: headers,
                url: url,
                data: payload
            });
        },

        deleteData: function (path) {
            var url = self.baseUrl + path;
            var headers = {};
            var token = StorageService.getAuthToken();
            if (token) {
                headers['x-auth-token'] = token;
            }
            console.log('httpService::deleteData::url', url);
            return $http({
                method: 'DELETE',
                headers: headers,
                url: url
            });
        },

        // {name: 'pp', job: 'sds'} => ?name=pp&job=sds
        __buildQueryStr: function (queryParams) {
            var qs = '';
            if (queryParams) {
                var index = 0;
                for (var query in queryParams) {
                    if (index === 0) {
                        qs += '?' + query + '=' + queryParams[query];
                    } else {
                        qs += '&';
                        qs += query + '=';
                        qs += queryParams[query];
                    }
                    ++index;
                }
            }
            return qs;
        }
    };
    return self;
});
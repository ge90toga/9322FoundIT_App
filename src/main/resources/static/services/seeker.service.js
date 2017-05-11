// SERVICES
foundITApp.service('seekerService', function ($q, httpService) {
    var self = {
        getJobList: function () {
            var d = $q.defer();
            httpService.getData('api/jobs').then(function success(response) {
                console.log('seekerService getData response', response);
                d.resolve(response.data);
            }, function error(err) {
                console.log('seekerService::getData Error', err);
                d.reject(err);
            });
            return d.promise;
        },

        searchJobs: function (title) {
            var d = $q.defer();
            httpService.getData('api/jobs?title=' + title).then(function success(response) {
                console.log('seekerService getData response', response);
                d.resolve(response.data);
            }, function error(err) {
                console.log('seekerService::getData Error', err);
                d.reject(err);
            });
            return d.promise;
        },

        applyJob: function (application) {
            var d = $q.defer();
            httpService.postData('api/apply', application).then(function success(response) {
                console.log('seekerService apply response', response);
                d.resolve(response.data);
            }, function error(err) {
                console.log('seekerService::apply error', err);
                d.reject(err);
            });
            return d.promise;
        }

    };
    return self;
});
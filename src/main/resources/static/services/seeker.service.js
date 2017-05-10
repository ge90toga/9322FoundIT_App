// SERVICES
foundITApp.service('seekerService', function ($q, httpService) {
    var self = {
        getJobList: function () {
            var d = $q.defer();
            httpService.getData('api/jobs').then(function success(response) {
                console.log('managerService getData response', response);
                d.resolve(response.data);
            }, function error(err) {
                console.log('managerService::getData Error', err);
                d.reject(err);
            });
            return d.promise;
        },

        searchJobs: function (title) {
            var d = $q.defer();
            httpService.getData('api/jobs?title=' + title).then(function success(response) {
                console.log('managerService getData response', response);
                d.resolve(response.data);
            }, function error(err) {
                console.log('managerService::getData Error', err);
                d.reject(err);
            });
            return d.promise;
        }

    };
    return self;
});
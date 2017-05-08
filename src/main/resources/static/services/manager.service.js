// SERVICES
foundITApp.service('managerService', function ($q,httpService) {
    var self = {
        getJobList: function () {
            var d = $q.defer();
            httpService.getData('mock/job.list.json').then(function success(response) {
                console.log('managerService getData response',response);
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
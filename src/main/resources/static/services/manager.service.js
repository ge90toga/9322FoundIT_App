// SERVICES
foundITApp.service('managerService', function ($q, httpService) {
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

        getReviewers: function () {
            var d = $q.defer();
            httpService.getData('api/admin/reviewers').then(function success(response) {
                console.log('managerService getReviewers response', response);
                d.resolve(response.data);
            }, function error(err) {
                console.log('managerService::getReviewers Error', err);
                d.reject(err);
            });
            return d.promise;
        },

        createJob: function (job) {
            var d = $q.defer();
            httpService.postData('api/jobs', job).then(function success(response) {
                console.log('managerService createJob response', response);
                d.resolve(response.data);
            }, function error(err) {
                console.log('managerService::createJob error', err);
                d.reject(err);
            });
            return d.promise;
        },

        upDateJob: function (job) {
            var d = $q.defer();
            httpService.putData('api/jobs', job).then(function success(response) {
                console.log('managerService createJob response', response);
                d.resolve(response.data);
            }, function error(err) {
                console.log('managerService::upDateJob error', err);
                d.reject(err);
            });
            return d.promise;
        },

        deleteJob: function (jobId) {
            var d = $q.defer();
            httpService.deleteData('api/jobs/' + jobId).then(function success() {
                d.resolve();
            }, function error(err) {
                console.log('managerService::deleteJob error', err);
                d.reject(err);
            });
            return d.promise;
        }

    };
    return self;
});
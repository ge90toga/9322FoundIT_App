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
        },

        checkMyApplication: function () {
            var d = $q.defer();
            httpService.getData('api/apply/my').then(function success(response) {
                console.log('seekerService checkMyApplication response', response);
                var appInfos = response.data;
                // if (appInfos && appInfos > 0) {
                //     self.getJobsByIds(appInfos).then(function (jobInfos) {
                //         console.log('job infos', jobInfos);
                //     }, function (err) {
                //         d.reject(err);
                //     })
                // } else {
                //     d.resolve([]);
                // }
                d.resolve(appInfos);
            }, function error(err) {
                console.log('seekerService:: error checkMyApplication', err);
                d.reject(err);
            });
            return d.promise;
        },

        upDateApplication: function (application) {
            var d = $q.defer();
            httpService.putData('api/apply', application).then(function success(response) {
                console.log('seekerService apply update response', response);
                d.resolve(response.data);
            }, function error(err) {
                console.log('seekerService::apply update error', err);
                d.reject(err);
            });
            return d.promise;
        },

        getJobsByIds: function (app) {
            var getJobPromises = [];
            angular.forEach(jobIds, function (app) {
                var getSingleJob = httpService.getData('api/jobs/' + app.jobID);
                getJobPromises.push(getSingleJob);
            });
            return $q.all(getJobPromises);
        }
    };
    return self;
});
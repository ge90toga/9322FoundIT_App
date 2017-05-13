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
        },

        getJobApplyCombo: function (jobID) {
            var d = $q.defer();
            console.log('get getJobApplyCombo jid', jobID);
            // api/apply/combo todo: replace back to api
            httpService.getData('mock/invite.json').then(function success(response) {
                console.log('managerService getJobApplyCombo response data', response.data);
                console.log(response.data);
                var approvedJobs = [];
                response.data.forEach(function (item) {
                    //console.log(item.applicationStatus);
                    if (item.applicationStatus === 'APPROVED' && jobID == item.jobID) {
                        approvedJobs.push(item);
                    }
                });
                console.log('approved jobs', approvedJobs);
                // self.__hello();
                var finaInvite = null;
                approvedJobs.forEach(function (approvedJob) {
                    if (!finaInvite) {
                        finaInvite = {
                            jobID: approvedJob.jobID,
                            jobTitle: approvedJob.jobTitle,
                            applicants: [approvedJob.applicant],
                            applicationList: [approvedJob.applicationID]
                        };
                    } else {
                        finaInvite.applicants.push(approvedJob.applicant);
                        finaInvite.applicationList.push(approvedJob.applicationID);
                    }
                });
                console.log('final list', finaInvite);
                if (finaInvite) {
                    d.resolve(finaInvite);
                } else {
                    d.resolve({});
                }
            }, function error(err) {
                console.log('managerService::getJobApplyCombo Error', err);
                d.reject(err);
            });
            return d.promise;
        },

        __hello: function () {
            console.log('hello');
        }

    };
    return self;
});
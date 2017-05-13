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

        getJobApplyCombo: function () {
            var d = $q.defer();
            // api/apply/combo todo: replace back to api
            httpService.getData('api/apply/combo').then(function success(response) {
                console.log('managerService getJobApplyCombo response data', response.data);
                console.log(response.data);
                var approvedApps = [];
                response.data.forEach(function (item) {
                    //console.log(item.applicationStatus);
                    if (item.jobStatus === 'REVIEW_PROCESSING' &&
                        item.applicationStatus === 'APPROVED') {
                        approvedApps.push(item);
                    }
                });
                console.log('approved apps', approvedApps);
                // self.__hello();
                var finalInviteList = [];
                approvedApps.forEach(function (approvedJob) {
                    var findInvite = self.__findInviteItem(finalInviteList, approvedJob.jobID);
                    if (!findInvite) {
                        finalInviteList.push(
                            {
                                jobID: approvedJob.jobID,
                                jobTitle: approvedJob.jobTitle,
                                applicants: [approvedJob.applicant],
                                applicationList: [approvedJob.applicationID]
                            }
                        )
                    } else {
                        findInvite.applicants.push(approvedJob.applicant);
                        findInvite.applicationList.push(approvedJob.applicationID);
                    }
                });
                console.log('parsed invite list:', finalInviteList);
                d.resolve(finalInviteList);
            }, function error(err) {
                console.log('managerService::getJobApplyCombo Error', err);
                d.reject(err);
            });
            return d.promise;
        },

        __findInviteItem: function (myFinalList, jobID) {
            for (var myFinalItem of myFinalList) {
                if (myFinalItem.jobID === jobID) {
                    return myFinalItem;
                }
            }
            return null;
        },

        createPoll: function (poll) {
            var d = $q.defer();
            httpService.postData('api/admin/poll', poll).then(function success(response) {
                console.log('reviewerService poll response', response);
                d.resolve(response.data);
            }, function error(err) {
                console.log('reviewerService::poll error', err);
                d.reject(err);
            });
            return d.promise;
        }
    };
    return self;
});
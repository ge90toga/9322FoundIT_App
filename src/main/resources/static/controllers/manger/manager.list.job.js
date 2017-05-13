foundITApp.controller('JobListCtrl', ['$scope', 'managerService',
    'toaster', 'authService', function ($scope, managerService, toaster, authService) {
        $scope.init = function () {
            console.log('JobListCtrl::init');
            $scope.data = {
                openJobs: [],
                inReviewJobs: [],
                reviewCompleteJobs: [],
                closedJobs: [],
                enableEditList: []
            };
            $scope.getJobList();
        };

        $scope.editItem = function (index) {
            console.log("edit index called ", index);
            $scope.data.enableEditList[index] = true;
        };

        $scope.stopEdit = function (index) {
            console.log("stop edit index" + index);
            $scope.data.enableEditList[index] = false;
        };

        $scope.updateOpenJob = function (index) {
            $scope.stopEdit(index);
            console.log('the job to update is', JSON.stringify($scope.data.openJobs[index], null, 2));
            managerService.upDateJob($scope.data.openJobs[index]).then(function success(res) {
                console.log('updated job', res);
                toaster.pop('success', 'Job Updated!', '');
                $scope.getJobList(); // refresh page by reload job list
            }, function error(err) {
                toaster.pop('error', 'Job Update Error:', err);
                console.log('updated job', err);
            })
        };

        $scope.deleteOpenJob = function (index) {
            $scope.stopEdit(index);
            console.log('the job id delete is', $scope.data.openJobs[index].id);
            managerService.deleteJob($scope.data.openJobs[index].id).then(function success() {
                console.log('deleted job');
                toaster.pop('success', 'Job Deleted!', '');
                $scope.getJobList();
            }, function error(err) {
                console.log('delete job err', err);
            });

        };

        // classify jobs based on state
        $scope.classifyJobs = function (jobList) {
            $scope.data.openJobs = [];
            $scope.data.inReviewJobs = [];
            $scope.data.reviewCompleteJobs = [];
            $scope.data.closedJobs = [];
            jobList.forEach(function (job) {
                switch (job.status){
                    case 'OPEN':
                        $scope.data.openJobs.push(job);
                        break;
                    case 'REVIEW_PROCESSING':
                        $scope.data.inReviewJobs.push(job);
                        break;
                    case 'REVIEW_COMPLETED':
                        $scope.data.reviewCompleteJobs.push(job);
                    case 'INVITATION_SEND':
                        $scope.data.closedJobs.push(job);
                }
            });
        };

        $scope.getJobList = function () {
            managerService.getJobList().then(function success(jobs) {
                console.log('JobListCtrl\'s jobs', jobs);
                $scope.classifyJobs(jobs);
            }, function error(err) {
                console.log('got error', err);
            });
        };

        $scope.init();
    }]);

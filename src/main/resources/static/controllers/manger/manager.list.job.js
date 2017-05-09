foundITApp.controller('JobListCtrl', ['$scope', 'managerService', function ($scope, managerService) {
    $scope.init = function () {
        $scope.data = {
            jobTypes: ['Full Time', 'Casual', 'Part Time'],
            jobStates: ['open', 'in_review'],
            jobInReviewStates: ['in_review'],
            openJobs: [],
            inReviewJobs: [],
            reviewCompleteJobs: [],
            enableEditList: []
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
        };

        $scope.deleteOpenJob = function (index) {
            $scope.stopEdit(index);
            console.log('the job id delete is',$scope.data.openJobs[index].jobid);
        };

        // classify jobs based on state
        $scope.classifyJobs = function (jobList) {
            $scope.data.openJobs = _.pickBy(jobList, {state: 'open'});
            $scope.data.inReviewJobs = _.pickBy(jobList, {state: 'in_review'});
            $scope.data.reviewCompleteJobs = _.pickBy(jobList, {state: 'review_complete'});
        };

        $scope.getJobList = function () {
            managerService.getJobList().then(function success(jobs) {
                console.log('JobListCtrl\'s jobs', jobs);
                $scope.classifyJobs(jobs);
            }, function error(err) {
                console.log('got error', err);
            });
        };
        $scope.getJobList();
    };
    console.log('JobListCtrl::init');
    $scope.init();
}]);

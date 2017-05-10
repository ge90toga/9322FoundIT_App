foundITApp.controller('seekerSearchCtrl', function ($scope, seekerService, toaster) {
    $scope.init = function () {
        console.log('seeker search ctrl');
        $scope.data = {
            keyWord: '',
            jobList: [],
            cv: '',
        };
        $scope.masterCopy = angular.copy($scope.data);
    };

    $scope.search = function () {
        if ($scope.data.keyWord) {
            console.log('searching keyword', $scope.data.keyWord);
            seekerService.searchJobs($scope.data.keyWord).then(function success(jobList) {
                console.log('search jobList', jobList);
                $scope.data.jobList = _.pickBy(jobList, {status: 'OPEN'});
                console.log('filtered jobList', $scope.data.jobList);
            }, function error(err) {
                console.log('search error', err);
            })
        }
    };

    $scope.applyJob = function (index) {
        var data = {
            jobID: $scope.data.jobList[index].id,
            cv: $scope.data.cv
        };
        console.log('job apply data:', data);

    };

    $scope.init();
});
foundITApp.controller('seekerSearchCtrl', function ($scope, seekerService, toaster, $location,$timeout) {
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
                $scope.data.jobList = [];
                jobList.forEach(function (job) { // filter only OPENING JOB
                    if(job.status === 'OPEN'){
                        $scope.data.jobList.push(job);
                    }
                });
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
        seekerService.applyJob(data).then(function success() {
            toaster.pop('success', 'Success!', 'Your application has been submitted');
            $timeout(function () {
                $location.path('/seeker/applist');
            }, 1000);
        }, function error(err) {
            toaster.pop('error', 'seeker apply error', err);
            console.log('seeker apply err', err);
        })
    };

    $scope.init();
});
foundITApp.controller('CreateJobCtrl', ['$scope', 'userService', 'authService', 'managerService', '$location',
    function ($scope, userService, authService, managerService, $location) {
        $scope.init = function () {
            $scope.data = {
                form: {
                    title: '',
                    type: '',
                    company: '',
                    description: '',
                    status: 'OPEN',
                    reviewers: [],
                },
                r1_idx: 0,
                r2_idx: 0,
                reviewerList: [],
                reviewerEmailList: [],
                jobTypes: ['Full Time', 'Casual', 'PartTime']
            };
            // set job types
            $scope.data.form.type = $scope.data.jobTypes[0];
            $scope.dataMasterCopy = angular.copy($scope.data);
            $scope.getReviewers(); // get reviewer list beforehand
        };

        $scope.submit = function () {
            console.log('CreateJobCtrl::submit!', $scope.data.form);
            $scope.data.form.reviewers.push($scope.data.reviewerList[$scope.data.r1_idx]);
            $scope.data.form.reviewers.push($scope.data.reviewerList[$scope.data.r2_idx]);
            console.log('job to create', JSON.stringify($scope.data.form, null, 2));
            $scope.refresh();
        };

        $scope.logout = function () {
            console.log('log out is called');
            authService.logout();
        };

        $scope.getReviewers = function () {
            console.log('get getReviewers');
            managerService.getReviewers().then(function success(rlist) {
                console.log('reviewer list', rlist);
                $scope.data.reviewerList = rlist;
                if ($scope.data.reviewerList.length >= 2) {
                    $scope.data.reviewerEmailList = _.map($scope.data.reviewerList, 'email');
                }
            }, function err(err) {
                console.log(err);
            })
        };

        $scope.refresh = function () {
            $scope.data = angular.copy($scope.dataMasterCopy);
            $scope.data.form.type = $scope.data.jobTypes[0];
            $scope.getReviewers();
        };

        console.log('CreatJobCtrl::init');
        $scope.init();
    }]);

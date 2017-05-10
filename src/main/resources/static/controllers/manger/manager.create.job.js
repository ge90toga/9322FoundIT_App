foundITApp.controller('CreateJobCtrl', ['$scope', 'authService', 'managerService', '$location', 'toaster',
    function ($scope, authService, managerService, $location, toaster) {
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
            managerService.createJob($scope.data.form).then(function success(res) {
                console.log('create job success!', res);
                toaster.pop('success', 'Job Created!', '');
            }, function err(err) {
                toaster.pop('error', 'Job Create failure!', err);
                console.log('Job Create failure', err);
            });

            $scope.refresh();
        };

        $scope.getReviewers = function () {
            console.log('get getReviewers');
            managerService.getReviewers().then(function success(rlist) {
                for (var reviewer of rlist) {
                    delete reviewer.id;
                    delete reviewer.role;
                    reviewer.username = reviewer.email;
                    delete reviewer.email;
                }
                console.log('reviewer list', rlist);
                $scope.data.reviewerList = rlist;
                if ($scope.data.reviewerList.length >= 2) {
                    $scope.data.reviewerEmailList = _.map($scope.data.reviewerList, 'username');
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

foundITApp.controller('CreateJobCtrl', ['$scope', 'userService', 'authService', 'managerService',
    function ($scope, userService, authService, managerService) {
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
                reviewerList: [],

                jobTypes: ['Full Time', 'Casual', 'PartTime']
            };
            $scope.data.form.type = $scope.data.jobTypes[0];
            $scope.getReviewers();
        };

        $scope.submit = function () {
            console.log('CreateJobCtrl::submit!', $scope.data.form);
        };

        $scope.logout = function () {
            console.log('log out is called');
            authService.logout();
        };

        $scope.options = [
            {id:1, name:'Starbuck'},
            {id:2, name:'Appolo'},
            {id:3, name:'Saul Tigh'},
            {id:4, name:'Adama'}
        ]

        $scope.getReviewers = function () {
            console.log('get getReviewers');
            managerService.getReviewers().then(function success(rlist) {
                console.log('reviewer list', rlist);
                $scope.data.reviewerList = rlist;
                if ($scope.data.reviewerList >= 2) {

                }
            }, function err(err) {
                console.log(err);
            })
        };

        console.log('CreatJobCtrl::init');
        $scope.init();
    }]);

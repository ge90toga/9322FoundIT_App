foundITApp.controller('loginController', ['$scope', '$location',
    function ($scope, $location) {
        $scope.init = function () {
            $scope.data = {
                form: {
                    username: '',
                    pwd: '',
                    type: ''
                },
                loginTypes: ['Job Seeker', 'Manager', 'Reviewer']
            };
            $scope.data.form.type = $scope.data.loginTypes[0];

            $scope.submit = function () {
                console.log('loginController::submit! data:', $scope.data.form);

                var x = [1,3,5,7];
                // console.log(_.includes(x,3));
                if ($scope.data.form.type === 'Manager') {
                    $location.path('/manager/jobs/create');
                }
                if ($scope.data.form.type === 'Reviewer') {
                    $location.path('/manager/jobs/create');
                }
                if ($scope.data.form.type === 'Job Seeker') {
                    $location.path('/manager/jobs/create');
                }
            };
        };
        console.log('loginController::init');
        $scope.init();
    }]);

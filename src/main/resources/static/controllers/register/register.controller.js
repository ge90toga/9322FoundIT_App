foundITApp.controller('registerController', function ($scope, $location) {
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
            if($scope.data.form.type === 'Manager'){
                $location.path('/manager/jobs/create');
            }

            if($scope.data.form.type === 'Reviewer'){
                $location.path('/manager/jobs/create');
            }

            if($scope.data.form.type === 'Job Seeker'){
                $location.path('/manager/jobs/create');
            }
        };

    };
    console.log('register::init');
    $scope.init();
});

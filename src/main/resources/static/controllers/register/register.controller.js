foundITApp.controller('registerController', function ($scope, $location, authService, toaster, $timeout, _) {
    $scope.init = function () {
        authService.logout();
        $scope.data = {
            form: {
                name: '',
                password: '',
                role: '',
                type: '',
                email: ''
            },
            loginTypes: ['Job Seeker', 'Manager', 'Reviewer'],
            roleMap: {
                'Job Seeker': 'ROLE_USER',
                'Manager': 'ROLE_ADMIN',
                'Reviewer': 'ROLE_REVIEWER'
            }
        };
        $scope.data.form.type = $scope.data.loginTypes[0];

        $scope.submit = function () {
            $scope.data.form.role = $scope.data.roleMap[$scope.data.form.type];
            var payload = _.pick($scope.data.form, ['name', 'password', 'role', 'email']);
            console.log('registerController::submit! payload:', payload);
            authService.signUp(payload).then(function success() {
                console.log('sign up success');
                toaster.pop('success', 'Successful', 'Y' +
                    'ou can login now!');
                $timeout(function () {
                    $location.path('/');
                    $location.replace();
                }, 1000);

            }, function error(err) {
                console.log('fail sign up', err);
                toaster.pop('error', 'Sign up error', err);
            });
        };

    };
    console.log('register::init');
    $scope.init();
});

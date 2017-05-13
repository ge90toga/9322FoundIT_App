foundITApp.controller('loginController', ['$scope', '$location', 'toaster', 'authService', '$timeout', '_',
    function ($scope, $location, toaster, authService, $timeout, _) {
        $scope.init = function () {
            $scope.data = {
                form: {
                    email: '',
                    password: '',
                    type: ''

                },
                loginTypes: ['Job Seeker', 'Manager', 'Reviewer'],
                roleMap: {
                    'Job Seeker': 'ROLE_USER',
                    'Manager': 'ROLE_ADMIN',
                    'Reviewer': 'ROLE_REVIEWER'
                }
            };
            // deal with selector
            $scope.data.form.type = $scope.data.loginTypes[0];

            $scope.submit = function () {
                // the real part
                console.log('loginController::submit! data:', JSON.stringify($scope.data.form, null, 2));
                var role = $scope.data.roleMap[$scope.data.form.type];
                var payload = _.pick($scope.data.form, ['email', 'password']);
                payload.role = role;
                console.log('login with payload', payload);
                authService.loginIn(payload).then(function succ() {
                    // login successful!
                    toaster.pop('success', 'Login Success!', '');
                    $timeout(function () {
                        $scope.enterNext();
                    }, 1000);
                }, function err(err) {
                    // unsuccessful login
                    console.log('login error', err);
                    if (err.status === 401 || err.status === 403) {
                        toaster.pop('error', 'Login Failure!', 'Username and password mismatch!');
                    } else {
                        toaster.pop('error', 'Login Failure!', 'Other Error!');
                    }
                });

                // the short cut todo: remove after dev
                // $scope.enterNext();
            };

            $scope.enterNext = function () {
                if ($scope.data.form.type === 'Manager') {
                    $location.path('/manager/jobs/create');
                }
                if ($scope.data.form.type === 'Reviewer') {
                    $location.path('/reviewer/review');
                }
                if ($scope.data.form.type === 'Job Seeker') {
                    $location.path('/seeker/search');
                }
            };

        };
        console.log('loginController::init');
        $scope.init();
    }]);

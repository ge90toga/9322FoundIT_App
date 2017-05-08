foundITApp.controller('loginController', ['$scope', '$location', 'toaster', 'authService',
    function ($scope, $location, toaster, authService) {
        $scope.init = function () {
            $scope.data = {
                form: {
                    email: '',
                    password: '',
                    type: ''

                },
                loginTypes: ['Job Seeker', 'Manager', 'Reviewer']
            };
            // deal with selector
            $scope.data.form.type = $scope.data.loginTypes[0];

            $scope.submit = function () {
                console.log('loginController::submit! data:', JSON.stringify($scope.data.form, null, 2));
                var payload = _.pick($scope.data.form, ['email', 'password']);
                authService.loginIn(payload).then(function succ() {

                }, function err() {

                })
            };

            $scope.enterNext = function () {
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

            // $scope.pop = function(){
            //     toaster.pop('success', "title", "text");
            //     toaster.pop('error', "title", "text");
            // };


        };
        console.log('loginController::init');
        $scope.init();
    }]);

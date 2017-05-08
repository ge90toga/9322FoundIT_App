foundITApp.controller('CreateJobCtrl', ['$scope', 'userService', function ($scope, userService) {
    $scope.init = function () {
        $scope.data = {
            form: {
                jobTitle: '',
                companyName: '',
                salary: '',
                type: '',
                description: ''
            },
            jobTypes: ['Full Time', 'Casual', 'PartTime']
        };
        $scope.data.form.type = $scope.data.jobTypes[0];

        $scope.submit = function () {
            console.log('CreateJobCtrl::submit!', $scope.data.form);
        };

    };
    console.log('CreatJobCtrl::init');
    $scope.init();
}]);

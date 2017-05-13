foundITApp.controller('seekerAppListCtrl', function ($scope, seekerService, toaster, $timeout, _) {
    $scope.init = function () {
        console.log('seekerAppListCtrl init');
        $scope.data = {};
        $scope.refresh();
    };

    $scope.getMyAppList = function () {
        seekerService.checkMyApplication().then(function success(myappList) {
            $scope.data.myAppList = myappList;
            console.log('my app list is', $scope.data.myAppList);
        }, function error(err) {
            console.log('my app list error', err);
        })
    };

    $scope.refresh = function () {
        var initialData = {
            myAppList: []
        };
        $scope.data = angular.copy(initialData);
        $scope.getMyAppList();
    };

    $scope.upDateApplication = function (idx) {
        var jobUpdate = _.pick($scope.data.myAppList[idx], ['id', 'jobID', 'userID', 'email', 'cv', 'status']);
        console.log('jobUpdate', JSON.stringify(jobUpdate, null, 2));
        seekerService.upDateApplication(jobUpdate).then(function success() {
            console.log('update application success');
            toaster.pop('success', 'Update Success', '');
            $scope.refresh();
        }, function error(err) {
            toaster.pop('error', 'Update Error', '');
            console.log('update application error', err);
        })
    };

    $scope.init();
});
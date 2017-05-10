foundITApp.controller('reviewerCtrl', function ($scope, toaster, reviewerService) {
    $scope.init = function () {
        console.log('reviewerCtrl ctrl');
        $scope.data = {
            toReviewList: [],
            reviewedList: []
        };
        $scope.getReviews();
    };

    $scope.getReviews = function () {
        console.log('get Reviews');
        reviewerService.getMyReviewCombos().then(function succ(comboList) {
            console.log('r-combo', comboList);
            $scope.data.toReviewList = _.pickBy(comboList, function (item) {
                return (!item.content) ? true : false;
            });
            $scope.data.reviewedList = _.pickBy(comboList, function (item) {
                return (item.content) ? true : false;
            });
            console.log('toReviewList', $scope.data.toReviewList);
            console.log('toReviewList', $scope.data.reviewedList);

        }, function err(error) {
            console.log('combo error:', error);
        });
    };

    $scope.createReview = function (idx) {
        var reviewToPost = _.pick($scope.data.toReviewList[idx],
            ['applicantID', 'content', 'jobID', 'result']);
        console.log('reviewToPost::', reviewToPost);
        // reviewerService

    };
    $scope.init();
});
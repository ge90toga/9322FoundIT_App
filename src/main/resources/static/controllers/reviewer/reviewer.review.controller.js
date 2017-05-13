foundITApp.controller('reviewerCtrl', function ($scope, toaster, reviewerService, _) {
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
            $scope.classifyReviews(comboList);
            console.log('toReviewList', $scope.data.toReviewList);
            console.log('reviewedList', $scope.data.reviewedList);
        }, function err(error) {
            console.log('combo error:', error);
        });
    };

    $scope.createReview = function (idx) {
        console.log('to review list', $scope.data.toReviewList[idx]);
        var reviewToPost = _.pick($scope.data.toReviewList[idx],
            ['applicationID', 'content', 'jobID', 'result']);
        console.log('reviewToPost::', JSON.stringify(reviewToPost, null, 2));
        reviewerService.createReview(reviewToPost).then(function succ() {
            console.log('review posted!');
            toaster.pop('success', 'Review Posted', '');
            $scope.getReviews();
        }, function error() {
            console.log('review post error!', error);
            toaster.pop('error', 'Review Post Error', '');
        });
    };

    $scope.upDateReview = function (idx) {
        console.log('update review::');
        var reviewToUpdate = _.pick($scope.data.reviewedList[idx], [
            'reviewID', 'jobID', 'applicationID', 'reviewerID', 'reviewerName', 'content', 'result'
        ]);
        reviewToUpdate.id = reviewToUpdate.reviewID;
        delete reviewToUpdate.reviewID;
        console.log(JSON.stringify(reviewToUpdate, null, 2));
        reviewerService.upDateReview(reviewToUpdate).then(function success() {
            console.log('upDateReview done');
            toaster.pop('success', 'Review Updated', '');
            $scope.getReviews();
        }, function error(err) {
            toaster.pop('error', 'Update Review Error', '');
            console.log('upDateReview done', err);
        });
    };

    $scope.classifyReviews = function (reviews) {
        $scope.data.reviewedList = [];
        $scope.data.toReviewList = [];
        reviews.forEach(function (review) {
            if (review.content) {
                $scope.data.reviewedList.push(review);
            } else {
                $scope.data.toReviewList.push(review);
            }
        });
    };

    $scope.init();
});
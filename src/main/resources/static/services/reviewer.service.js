// SERVICES
foundITApp.service('reviewerService', function ($q, httpService) {
    var self = {
        getMyReviewCombos: function () {
            var d = $q.defer();
            httpService.getData('api/admin/review/combo').then(function success(response) {
                console.log('reviewerService getMyReviewCombos response', response);
                d.resolve(response.data);
            }, function error(err) {
                console.log('reviewerService::getMyReviewCombos Error', err);
                d.reject(err);
            });
            return d.promise;
        },

        createReview : function (review) {
            var d = $q.defer();
            httpService.postData('api/admin/review', review).then(function success(response) {
                console.log('reviewerService postReview response', response);
                d.resolve(response.data);
            }, function error(err) {
                console.log('reviewerService::postReview error', err);
                d.reject(err);
            });
            return d.promise;
        },

        upDateReview: function (review) {
            var d = $q.defer();
            httpService.putData('api/admin/review', review).then(function success(response) {
                console.log('reviewerService postReview response', response);
                d.resolve(response.data);
            }, function error(err) {
                console.log('reviewerService::postReview error', err);
                d.reject(err);
            });
            return d.promise;
        }
    };
    return self;
});
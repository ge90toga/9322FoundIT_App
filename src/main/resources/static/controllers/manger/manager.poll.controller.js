foundITApp.controller('managerPollCtrl', ['$scope', 'managerService',
    'toaster', '$routeParams', function ($scope, managerService, toaster, $routeParams) {
        $scope.init = function () {
            console.log(' $routeParams.jobID;', $routeParams.jobID);
            $scope.data = {
                voteOptions: [{value: ''}],
                interviewToVote: {},
            };
            $scope.getApplyJobCombo();

        };

        $scope.addOption = function () {
            var last = $scope.data.voteOptions.length - 1;
            console.log('last', last);
            if ($scope.data.voteOptions[last].value && last < 4) {
                $scope.data.voteOptions.push({value: ''}); // add empty option if last option is ok
                console.log('vote options', $scope.data.voteOptions);
            }
        };

        $scope.sendInvitation = function () {
            console.log('vote options before processing', $scope.data.voteOptions);
            var options = [];
            for (var vote of $scope.data.voteOptions) {
                options.push(vote.value);
            }
            var postData = angular.copy($scope.data.interviewToVote);
            postData.pollTitle = postData.jobTitle;
            postData.participants = postData.applicants;
            postData.options = options;
            delete postData.jobTitle;
            delete postData.applicants;
            console.log('postVoteData', JSON.stringify(postData, null, 2));
        };

        $scope.getApplyJobCombo = function () {
            console.log('jobId', $routeParams.jobID);
            managerService.getJobApplyCombo($routeParams.jobID).then(function success(jobInvite) {
                console.log('interview to vote', jobInvite);
                $scope.data.interviewToVote = jobInvite;
            }, function error(err) {
                console.log('getApplyJobCombo error', err);
            });
        };
        $scope.init();
    }]);

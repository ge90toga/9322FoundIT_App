foundITApp.controller('managerPollCtrl', ['$scope', 'managerService',
    'toaster', '$location', function ($scope, managerService, toaster, $location) {
        $scope.init = function () {
            $scope.data = {
                jobInviteList: [],
                // voteOptions: [{value: ''}],
                interviewToVote: {},
            };
            $scope.getApplyJobCombo();

        };

        $scope.addOption = function (idx) {
            var last = $scope.data.jobInviteList[idx].voteOptions.length - 1;
            console.log('last is', last);
            if ($scope.data.jobInviteList[idx].voteOptions[last].value && last < 4) {
                $scope.data.jobInviteList[idx].voteOptions.push({value: ''}); // add empty option if last option is ok
            }
        };

        $scope.sendInvitation = function (idx) {
            console.log('invitation::before processing', $scope.data.jobInviteList[idx]);
            var options = [];
            for (var vote of $scope.data.jobInviteList[idx].voteOptions) {
                options.push(vote.value);
            }
            var postData = angular.copy($scope.data.jobInviteList[idx]);
            postData.title = postData.jobTitle;
            postData.applicantIDs = postData.applicants;
            postData.pollOptions = options;
            postData.applicationIDs = postData.applicationList;

            delete postData.jobTitle;
            delete postData.applicants;
            delete postData.voteOptions;
            delete  postData.applicationList;
            console.log('postVoteData', JSON.stringify(postData, null, 2));

            managerService.createPoll(postData).then(function (res) {
                console.log('poll creation response', res);
                $scope.data.jobInviteList[idx].pollUrl = res;
                toaster.pop('success', 'Poll created', '');
            }, function (err) {
                console.log('poll error in creation');
                toaster.pop('error', 'Poll creation error', '');
            })
        };

        $scope.injectOptionList = function () {
            $scope.data.jobInviteList.forEach(function (jobInvite) {
                jobInvite.voteOptions = [{value: ''}];
            });
        };

        $scope.getApplyJobCombo = function () {
            managerService.getJobApplyCombo().then(function success(jobInviteList) {
                $scope.data.jobInviteList = jobInviteList;
                $scope.injectOptionList();
                console.log('jobInviteList In poll ctrl', $scope.data.jobInviteList);

            }, function error(err) {
                console.log('getApplyJobCombo error', err);
            });
        };
        $scope.init();
    }]);

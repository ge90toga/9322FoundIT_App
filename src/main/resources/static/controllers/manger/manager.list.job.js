foundITApp.controller('JobListCtrl', ['$scope', function ($scope) {
    $scope.init = function () {
        $scope.data = {
            jobTypes: ['Full Time', 'Casual', 'Part Time'],
            jobStates: ['open', 'in_review'],
            jobInReviewStates: ['in_review'],
            openJobs: [],
            inReviewJobs: [],
            reviewCompleteJobs: []
        };

        $scope.jobList = [
            {
                jobid: '9i3kds',
                title: 'Nodejs Developer',
                company: 'The company',
                salary: '3000$',
                type: 'Full Time',
                description: 'The Javascript in need.',
                state: 'open'
            },
            {
                jobid: 'rwre2',
                title: 'Javascript Developer',
                company: 'The company',
                salary: '2000$',
                type: 'Part Time',
                description: 'The Javascript in need.',
                state: 'open'
            },
            {
                jobid: 'fgdfw3',
                title: 'Java Developer',
                company: 'The company 2',
                salary: '500$',
                type: 'Full Time',
                description: 'The Java in need.',
                state: 'in_review'
            },
            {
                jobid: 'fgsrt5',
                title: 'Python Developer',
                company: 'The company 2',
                salary: '600$',
                type: 'Part Time',
                description: 'The Java in need.',
                state: 'review_complete'
            }
        ];

        console.log(JSON.stringify($scope.jobList,null,2));


        //console.log($scope.jobList);

        $scope.classifyJobs = function () {
            $scope.data.openJobs = _.pickBy($scope.jobList, {state: 'open'});
            $scope.data.inReviewJobs = _.pickBy($scope.jobList, {state: 'in_review'});
            $scope.data.reviewCompleteJobs = _.pickBy($scope.jobList, {state: 'review_complete'});
        };

        $scope.classifyJobs();
        // console.log($scope.data.openJobs);
        // console.log($scope.data.inReviewJobs);
        // console.log($scope.data.reviewCompleteJobs);

    };
    console.log('JobListCtrl::init');
    $scope.init();
}]);

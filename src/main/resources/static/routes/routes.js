// ROUTES
foundITApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'pages/login/login.html',
            controller: 'loginController'
        })

        .when('/reviewer/review', {
            templateUrl: 'pages/reviewer/reviewer.html',
            cache: false,
            controller: 'reviewerCtrl'
        })

        .when('/seeker/search', {
            templateUrl: 'pages/seeker/seeker.html',
            cache: false,
            controller: 'seekerSearchCtrl'
        })

        .when('/seeker/applist', {
            templateUrl: 'pages/seeker/seeker.application.html',
            cache: false,
            controller: 'seekerAppListCtrl'
        })

        .when('/seeker/joblist', {
            templateUrl: 'pages/seeker/seeker.joblist.html',
            cache: false,
            controller: 'seekerListCtrl'
        })

        .when('/seeker/vote', {
            templateUrl: 'pages/seeker/seeker.vote.html',
            cache: false
        })

        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller: 'registerController'
        })

        .when('/manager/jobs/create', {
            templateUrl: 'pages/manager/manager.jobs.create.html',
            controller: 'CreateJobCtrl',
            cache: false
        })

        .when('/manager/jobs/list', {
            templateUrl: 'pages/manager/manager.jobs.list.html',
            controller: 'JobListCtrl',
            cache: false
        })

        .when('/manager/reviews/', {
            templateUrl: 'pages/manager/manager.reviews.html',
            cache: false
        })

        .when('/manager/polls/', {
            templateUrl: 'pages/manager/manager.polls.html',
            cache: false,
            controller: 'managerPollCtrl'
        });

});
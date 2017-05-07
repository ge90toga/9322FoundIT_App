// ROUTES
foundITApp.config(function ($routeProvider) {
    $routeProvider

        // .when('/', {
        //     templateUrl: 'pages/home.htm',
        //     controller: 'homeController'
        // })

        .when('/', {
            templateUrl: 'pages/login/login.html',
            controller: 'loginController'
        })


        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller: 'registerController'
        })

        .when('/forecast', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        })

        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        })

        .when('/manager/jobs/create', {
            templateUrl: 'pages/manager/manager.jobs.create.html',
            controller: 'CreateJobCtrl',
            cache: false
        })

        .when('/manager/reviews/', {
            templateUrl: 'pages/manager/manager.reviews.html'
        })

        .when('/manager/polls/', {
            templateUrl: 'pages/manager/manager.polls.html'
        });

});
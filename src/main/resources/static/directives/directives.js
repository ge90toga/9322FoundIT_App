// DIRECTIVES
foundITApp.directive("weatherReport", function() {
   return {
       restrict: 'E',
       templateUrl: 'directives/weatherReport.html',
       replace: true,
       scope: {
           weatherDay: "=",
           convertToStandard: "&",
           convertToDate: "&",
           dateFormat: "@"
       }
   }
});

foundITApp.directive("adminHeader", function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/admin.header.html',
        replace: true,
        scope: {
            logout:"&"
        }
    }
});

foundITApp.directive("reviewerHeader", function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/reviewer.header.html',
        replace: true,
        scope: {
            weatherDay: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@"
        }
    }
});

foundITApp.directive("seekerHeader", function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/seeker.header.html',
        replace: true,
        scope: {
            weatherDay: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@"
        }
    }
});

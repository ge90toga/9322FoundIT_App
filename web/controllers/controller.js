// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', '$location', function ($scope, cityService,$location ) {

    $scope.city = cityService.city;

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });

    $scope.submit = function () {
        $location.path('/forecast');
    }

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {

    $scope.city = cityService.city;

    $scope.days = $routeParams.days || '2';

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=176a6a603fb163e74f4a8db4764b6a0a", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});

    $scope.unit = 'centigrade';

    $scope.convertToFahrenheit = function (degK) {
        if ($scope.unit === 'centigrade') {
            return Math.round(degK - 273);
        }
        return Math.round((1.8 * (degK - 273)) + 32);
    };

    $scope.convertToDate = function (dt) {
        return new Date(dt * 1000);
    };

}]);
// SERVICES
foundITApp.service('authService', function ($q, httpService, StorageService, $location) {
    var self = {
        signUp: function (data) {
            console.log('authService::signUp called!');
            var d = $q.defer();
            httpService.postData('api/register', data).then(function success(response) {
                console.log('signUp response', response);
                d.resolve();
            }, function error(err) {
                console.log('signUp error', err);
                d.reject(err);
            });
            return d.promise;
        },

        loginIn: function (data) {
            console.log('authService::login called!');
            var d = $q.defer();
            httpService.postData('api/login', data).then(function success(res) {
                var authToken = res.headers()['x-auth-token'];
                if (authToken) { // store auth token
                    console.log('storerge', authToken);
                    StorageService.storeAuthToken(authToken);
                    console.log('storerge get', StorageService.getAuthToken());
                }
                d.resolve();
            }, function error(err) {
                console.log('login error', err);
                d.reject(err);
            });
            return d.promise;
        },

        logout: function () {
            console.log('authService::logout called!');
            StorageService.clear(); // clear
            console.log('token is ', StorageService.getAuthToken());
            //$location.path('/');
        }
    };
    return self;
});
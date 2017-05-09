foundITApp.service ('StorageService', function ($localStorage) {
    $localStorage = $localStorage.$default({
        authToken : ''
    });

    var _storeAuthToken = function (authToken) {
        $localStorage.authToken = authToken;
    };

    var _getAuthToken = function () {
        return $localStorage.authToken
    };

    var _clear = function () {
        $localStorage.$reset();
    };

    return {
        getAuthToken: _getAuthToken,
        storeAuthToken: _storeAuthToken,
        clear: _clear
    };
});

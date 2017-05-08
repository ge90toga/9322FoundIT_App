// SERVICES
foundITApp.service('userService', function() {
    var self = {
        data:{
            loginType: ''
        },

        setJobSeekerLogin: function () {
            self.data.loginType = FoundApp_JOB_SEEKER;
        },

        setManagerLogin: function () {
            self.data.loginType = FoundApp_MANAGER;
        },

        setReviewerLogin: function () {
            self.data.loginType = FoundApp_REVIEWER;
        },

        logOut: function () {
            self.data.loginType = '';
        }

    }
});
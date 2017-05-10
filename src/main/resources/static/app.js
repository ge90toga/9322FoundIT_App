'use strict';
var foundITApp = angular.module('foundITApp',
    [
        'ngRoute',
        'ngResource',
        'toaster',
        'ngStorage'
    ]
);


// CONTANT

var FoundApp_JOB_SEEKER = 'JOB_SEEKER';
var FoundApp_MANAGER= 'MANAGER';
var FoundApp_REVIEWER = 'REVIEWER';
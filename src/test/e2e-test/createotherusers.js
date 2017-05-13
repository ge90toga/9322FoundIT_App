'use strict';

let users = {
    r1: { //register reviewer1
        "email": "reviewer_1@gmail.com",
        "password": "12345678",
        "name": "Reviewer 1",
        "role": "ROLE_REVIEWER"
    },
    r2: { //register reviewer2
        "email": "reviewer_2@gmail.com",
        "password": "12345678",
        "name": "Reviewer 2",
        "role": "ROLE_REVIEWER"
    },
    r3: { //register reviewer3
        "email": "reviewer_3@gmail.com",
        "password": "12345678",
        "name": "Reviewer 3",
        "role": "ROLE_REVIEWER"
    },
    ad1: { //admin1
        "email": "admin_1@gmail.com",
        "password": "12345678",
        "name": "ADMIN 1",
        "role": "ROLE_ADMIN"
    },
    u1: { //user1
        "email": "user_1@gmail.com",
        "password": "12345678",
        "name": "User1",
        "role": "ROLE_USER"
    },
    u2: { //user2
        "email": "user_2@gmail.com",
        "password": "12345678",
        "name": "User2",
        "role": "ROLE_USER"
    },
    u3: { //user3
        "email": "user_3@gmail.com",
        "password": "12345678",
        "name": "User3",
        "role": "ROLE_USER"
    },
    u4: { //user4
        "email": "user_4@gmail.com",
        "password": "12345678",
        "name": "User4",
        "role": "ROLE_USER"
    },
    u5: { //user5
        "email": "user_5@gmail.com",
        "password": "12345678",
        "name": "User5",
        "role": "ROLE_USER"
    },
    u6: { //user6
        "email": "user_6@gmail.com",
        "password": "12345678",
        "name": "User6",
        "role": "ROLE_USER"
    }
};

let request = require('sync-request');
let baseUrl = 'http://localhost:8080';
let apiRegister = '/api/register';
let apiJobs = '/api/jobs';
let apiLogin = '/api/login';
let applyUrl = '/api/apply';
let reviewComboUrl = '/api/admin/review/combo';
let res;
let login;
let token;
let commonHeader;

(function registerUsers () {

    request('POST', baseUrl + apiRegister, {
        json: users.r2
    });
    console.log('done r2');

    request('POST', baseUrl + apiRegister, {
        json: users.r3
    });
    console.log('done r3');

    request('POST', baseUrl + apiRegister, {
        json: users.u2
    });
    console.log('done u2');

    request('POST', baseUrl + apiRegister, {
        json: users.u3
    });
    console.log('done u3');

    request('POST', baseUrl + apiRegister, {
        json: users.u4
    });
    console.log('done u4');

    request('POST', baseUrl + apiRegister, {
        json: users.u5
    });

    console.log('done u5');
    request('POST', baseUrl + apiRegister, {
        json: users.u6
    });
    console.log('done u6');
})();




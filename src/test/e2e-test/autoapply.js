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

// u1 u2 u3 apply for job1 u4 u5 u6 apply for job2
(function user2ApplyJb1 () {
    console.log('user2ApplyJb1()');
    login = request('POST', baseUrl + apiLogin, {
        json: {
            email: users.u2.email,
            password: users.u2.password
        }
    });
    token = login.headers['x-auth-token'];
    // console.log(token);
    commonHeader = {
        'x-auth-token': token,
        'content-type': 'application/json'
    };
    // u1 apply job1
    res = request('POST', baseUrl + applyUrl, {
        headers: commonHeader,
        json: {
            "cv": "I am user 2 apply job1",
            "jobID": 1
        }
    });
    console.log(res.getBody('utf-8'));
})();

(function user3ApplyJb1 () {
    console.log('user3ApplyJb1()');
    login = request('POST', baseUrl + apiLogin, {
        json: {
            email: users.u3.email,
            password: users.u3.password
        }
    });
    token = login.headers['x-auth-token'];
    // console.log(token);
    commonHeader = {
        'x-auth-token': token,
        'content-type': 'application/json'
    };
    // u1 apply job1
    res = request('POST', baseUrl + applyUrl, {
        headers: commonHeader,
        json: {
            "cv": "I am user 3 apply job1",
            "jobID": 1
        }
    });
    console.log(res.getBody('utf-8'));
})();


(function user4ApplyJb2 () {
    console.log('user4ApplyJb2()');
    login = request('POST', baseUrl + apiLogin, {
        json: {
            email: users.u4.email,
            password: users.u4.password
        }
    });
    token = login.headers['x-auth-token'];
    // console.log(token);
    commonHeader = {
        'x-auth-token': token,
        'content-type': 'application/json'
    };
    // u1 apply job1
    res = request('POST', baseUrl + applyUrl, {
        headers: commonHeader,
        json: {
            "cv": "I am user 4 apply job2",
            "jobID": 2
        }
    });
    console.log(res.getBody('utf-8'));
})();

(function user5ApplyJb2 () {
    console.log('user5ApplyJb2()');
    login = request('POST', baseUrl + apiLogin, {
        json: {
            email: users.u5.email,
            password: users.u5.password
        }
    });
    token = login.headers['x-auth-token'];
    // console.log(token);
    commonHeader = {
        'x-auth-token': token,
        'content-type': 'application/json'
    };
    // u1 apply job1
    res = request('POST', baseUrl + applyUrl, {
        headers: commonHeader,
        json: {
            "cv": "I am user 5 apply job2",
            "jobID": 2
        }
    });
    console.log(res.getBody('utf-8'));
})();

(function user6ApplyJb2 () {
    console.log('user6ApplyJb2()');
    login = request('POST', baseUrl + apiLogin, {
        json: {
            email: users.u6.email,
            password: users.u6.password
        }
    });
    token = login.headers['x-auth-token'];
    // console.log(token);
    commonHeader = {
        'x-auth-token': token,
        'content-type': 'application/json'
    };
    // u1 apply job1
    res = request('POST', baseUrl + applyUrl, {
        headers: commonHeader,
        json: {
            "cv": "I am user 6 apply job2",
            "jobID": 2
        }
    });
    console.log(res.getBody('utf-8'));
})();
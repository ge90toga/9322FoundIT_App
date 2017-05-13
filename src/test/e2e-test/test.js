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

let job1 = { // assign to r1 & r2
    "title": "JOB1 Dev",
    "type": "Full Time",
    "company": "Google",
    "description": "Google job whated you to be!",
    "status": "OPEN",
    "reviewers": [
        {
            "username": users.r1.email,
            "name": users.r1.name
        },
        {
            "username": users.r2.email,
            "name": users.r2.name
        }
    ]
};

let job2 = { // assign to r1 & r3
    "title": "JOB2 Dev",
    "type": "Full Time",
    "company": "Google2",
    "description": "Google2 want you to be!",
    "status": "OPEN",
    "reviewers": [
        {
            "username": users.r1.email,
            "name": users.r1.name
        },
        {
            "username": users.r3.email,
            "name": users.r3.name
        }
    ]
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
        json: users.ad1
    });
    console.log('done ad1');

    request('POST', baseUrl + apiRegister, {
        json: users.r1
    });
    console.log('done r2');

    request('POST', baseUrl + apiRegister, {
        json: users.r2
    });
    console.log('done r2');

    request('POST', baseUrl + apiRegister, {
        json: users.r3
    });
    console.log('done r3');

    request('POST', baseUrl + apiRegister, {
        json: users.u1
    });
    console.log('done u1');

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


(function postJobs () {
    login = request('POST', baseUrl + apiLogin, {
        json: {
            email: users.ad1.email,
            password: users.ad1.password
        }
    });
    token = login.headers['x-auth-token'];
    // console.log(token);
    commonHeader = {
        'x-auth-token': token,
        'content-type': 'application/json'
    };

    res = request('POST', baseUrl + apiJobs, {
        headers: commonHeader,
        json: job1
    });

    console.log('jb1 response', res.getBody('utf-8'));

    res = request('POST', baseUrl + apiJobs, {
        headers: commonHeader,
        json: job2
    });
    console.log('jb2 response', res.getBody('utf-8'));
})();

// u1 u2 u3 apply for job1 u4 u5 u6 apply for job2
(function user1ApplyJb1 () {
    // u1 login
    console.log('user1ApplyJb1()');
    login = request('POST', baseUrl + apiLogin, {
        json: {
            email: users.u1.email,
            password: users.u1.password
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
            "cv": "I am user 1 apply job1",
            "jobID": 1
        }
    });
    console.log(res.getBody('utf-8'));
})();

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

// (function reviewer1ListReviews () {
//     console.log('reviewer1ListReviews()');
//     login = request('POST', baseUrl + apiLogin, {
//         json: {
//             email: users.r1.email,
//             password: users.r1.password
//         }
//     });
//     token = login.headers['x-auth-token'];
//     // console.log(token);
//     commonHeader = {
//         'x-auth-token': token,
//         'content-type': 'application/json'
//     };
//     // u1 apply job1
//     res = request('GET', baseUrl + reviewComboUrl, {
//         headers: commonHeader
//     });
//     console.log(JSON.stringify(JSON.parse(res.getBody('utf-8')),null,2));
// })();
//
//
// (function reviewer2ListReviews () {
//     console.log('reviewer1ListReviews()');
//     login = request('POST', baseUrl + apiLogin, {
//         json: {
//             email: users.r2.email,
//             password: users.r2.password
//         }
//     });
//     token = login.headers['x-auth-token'];
//     // console.log(token);
//     commonHeader = {
//         'x-auth-token': token,
//         'content-type': 'application/json'
//     };
//     // u1 apply job1
//     res = request('GET', baseUrl + reviewComboUrl, {
//         headers: commonHeader
//     });
//     console.log(JSON.stringify(JSON.parse(res.getBody('utf-8')),null,2));
// })();






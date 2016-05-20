'use strict';

App.factory('UserService', ['$http', '$q', function ($http, $q) {

        self.headers = {};
        self.headers["Content-Type"] = 'application/json';
        self.stompClient = null;

        return {
            getUser: function (user) {
                return $http.post('/talkingshop/login/user', JSON.stringify(user))
                        .then(
                                function (response) {
                                    return response.data;
                                },
                                function (errResponse) {
                                    console.error('Error while getting user');
                                    return $q.reject(errResponse);
                                }
                        );
            },
            logout: function (user) {
                return $http.put('/talkingshop/login/user', JSON.stringify(user))
                        .then(
                                function (response) {
                                    return response.data;
                                },
                                function (errResponse) {
                                    console.error('Error while logout');
                                    return $q.reject(errResponse);
                                }
                        );
            }
        };

    }]);



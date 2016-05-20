'use strict';

App.controller('UserController', ['$scope', 'UserService',
    function ($scope, UserService) {
        var self = this;
        self.user = {name: null, online: false};

        self.login = function () {
            UserService.getUser(self.user)
                    .then(
                            function (d) {
                                self.user = d;
                                console.log('Getted user - ' + self.user);
                                if (self.user !== '' && self.user !== null && self.user.name !== null && self.user.name !== '') {
                                    console.log('Redirecting');
                                    localStorage.setItem('user', JSON.stringify(self.user));
                                    window.location.href = '/talkingshop/chat';
                                }
                            },
                            function (errResponse) {
                                console.error('Error while getting username');
                            }
                    );
        };

    }]);
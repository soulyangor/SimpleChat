'use strict';

App.factory('ChatService', ['$http', '$q', function ($http, $q) {

        self.headers = {};
        self.headers["Content-Type"] = 'application/json';
        self.stompClient = null;

        return {
            fetchAllMessages: function () {
                return $http.get('/talkingshop/messages')
                        .then(
                                function (response) {
                                    return response.data;
                                },
                                function (errResponse) {
                                    console.error('Error while fetching messages');
                                    return $q.reject(errResponse);
                                }
                        );
            },
            createMessage: function (message) {
                return $http.post('/talkingshop/messages/item',
                        JSON.stringify(message))
                        .then(
                                function (response) {
                                    return response.data;
                                },
                                function (errResponse) {
                                    console.error('Error while creating message');
                                    return $q.reject(errResponse);
                                }
                        );
            },
            deleteMessage: function (message) {
                return $http({method: 'DELETE',
                    url: '/talkingshop/messages/item/',
                    data: JSON.stringify(message),
                    headers: self.headers})
                        .then(
                                function (response) {
                                    return response.data;
                                },
                                function (errResponse) {
                                    console.error('Error while deleting message');
                                    return $q.reject(errResponse);
                                }
                        );
            },
            connect: function (messageHandler) {
                var socket = new SockJS('/talkingshop/chat');
                self.stompClient = Stomp.over(socket);
                self.stompClient.connect({}, function (frame) {
                    console.log('Connected: ' + frame);
                    stompClient.subscribe('/talkingshop/messages', function (message) {
                        messageHandler(JSON.parse(message.body));
                    });
                });
            },
            disconnect: function () {
                if (self.stompClient != null) {
                    self.stompClient.disconnect();
                }
                console.log("Disconnected");
            },
            sendMessage: function (message) {
                var user = localStorage.getItem('user');
                if (user !== null) {
                    user = JSON.parse(user);
                }
                stompClient.send("/app/chat", {}, JSON.stringify(message));
            }

        };

    }]);



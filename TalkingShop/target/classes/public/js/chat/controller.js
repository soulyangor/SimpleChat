'use strict';

App.controller('ChatController', ['$scope', 'ChatService', 'UserService',
    function ($scope, ChatService, UserService) {
        var self = this;
        self.user = {name: null};
        self.message = {id: null, date: null, user: null, content: ""};
        self.messages = [];

        self.st = 0;

        self.orderProp = 'date';

        self.currentPage = 0;
        self.pageSize = 20;
        self.pageCount = 0;

        self.pagePanel = {
            prev: false,
            next: true,
            prevLabel: false,
            nextLabel: true,
            prevN: false,
            nextN: true,
            first: false,
            last: true
        };

        self.defPagePanelAttribute = function (num) {
            self.pagePanel = {
                prev: false,
                next: true,
                prevLabel: false,
                nextLabel: true,
                prevN: false,
                nextN: true,
                first: false,
                last: true
            };
            if (num == 1) {
                self.pagePanel.prev = false;
                self.pagePanel.first = true;
            }
            if (num > 1) {
                self.pagePanel.prev = true;
                self.pagePanel.first = true;
            }
            if (num > 2) {
                self.pagePanel.prevLabel = true;
            }
            if (num >= 5) {
                self.pagePanel.prevN = true;
            }
            var size = Math.ceil(self.messages.length / self.pageSize);
            if ((num + 5) >= size) {
                self.pagePanel.nextN = false;
            }
            if ((num + 3) >= size) {
                self.pagePanel.nextLabel = false;
            }
            if (num >= (size - 2)) {
                self.pagePanel.next = false;
            }
            if (num == (size - 1)) {
                self.pagePanel.last = false;
            }
        };

        self.firstPage = function () {
            self.currentPage = 0;
            self.defPagePanelAttribute(self.currentPage);
        };

        self.lastPage = function () {
            self.currentPage = Math.ceil(self.messages.length / self.pageSize) - 1;
            self.defPagePanelAttribute(self.currentPage);
        };

        self.nextPage = function (count) {
            if ((self.messages.length - 1) >= (self.currentPage + count)) {
                self.currentPage += count;
            }
            self.defPagePanelAttribute(self.currentPage);
        };

        self.prevPage = function (count) {
            if (self.currentPage >= count) {
                self.currentPage -= count;
            }
            self.defPagePanelAttribute(self.currentPage);
        };

        self.getNumberAsArray = function (num) {
            return new Array(num);
        };

        self.numberOfPages = function () {
            self.pageCount = Math.ceil(self.messages.length / self.pageSize);
            self.defPagePanelAttribute(self.currentPage);
            return self.pageCount;
        };

        self.getStoreUser = function () {
            var stUser = localStorage.getItem('user');
            console.log('current user - ' + stUser);
            if (stUser !== null) {
                self.user = JSON.parse(stUser);
            }
        };

        self.fetchAllMessages = function () {
            ChatService.fetchAllMessages()
                    .then(
                            function (d) {
                                var messages = d;
                                if (self.messages.length > 0) {
                                    for (var i = 0; i < self.messages.length; i++) {
                                        if (self.messages[i].id === null) {
                                            messages.splice(i, 0, self.messages[i]);
                                        }
                                    }
                                }
                                self.messages = messages;
                                self.numberOfPages();
                            },
                            function (errResponse) {
                                console.error('Error while fetching Messages');
                            }
                    );
        };

        self.receiveMessage = function (message) {
            console.log('received message id - ' + message.id);
            if (message.id !== null) {
                for (var i = 0; i < self.messages.length; i++) {
                    if (self.messages[i].id === message.id) {
                        self.messages[i].id = null;
                        console.log('nulled');
                        break;
                    }
                }
            }
            self.fetchAllMessages();
            self.lastPage();
        };

        self.connect = function () {
            ChatService.connect(self.receiveMessage);
            self.isConnected = true;
        };

        self.getStoreUser();
        self.connect();
        self.fetchAllMessages();
        self.firstPage();

        self.disconnect = function () {
            ChatService.disconnect();
            self.isConnected = false;
        };

        self.sendMessage = function () {
            self.message.user = self.user;
            ChatService.createMessage(self.message);
            ChatService.sendMessage(self.message);
            self.message = {id: null, date: null, user: null, content: ""};
        };

        self.deleteMessage = function (message) {
            ChatService.deleteMessage(message)
                    .then(
                            console.log('deleted message with id' + message.id),
                            function (errResponse) {
                                console.error('Error while deleting message.');
                            }
                    );
            ChatService.sendMessage(message);
        };

        self.exit = function () {
            UserService.logout(self.user);
            localStorage.setItem('user', null);
            window.location.href = '/talkingshop';
        };

        self.dateFormat = function (date) {
            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                timezone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            var d = new Date(date);
            return d.toLocaleString("ru", options);
        };

        self.showButton = function (message) {
            return message.user.name === self.user.name && message.id !== null;
        };

    }]);

App.filter('startFrom', function () {
    return function (input, start) {
        return input.slice(start);
    };
});
'use strict';

messengerApp.controller('MessengerCtrl', function ($scope, $cookies, socket) {

    socket.on('add.message', function (data) {
        $scope.messages.push(data);
    });

    $scope.messages = [];
    $scope.sendMessage = function () {

        socket.emit('send.message', {
            user: $cookies.get('user.name'),
            message: $scope.message
        });

        $scope.messages.push({
             user: $cookies.get('user.name'),
             message: $scope.message
        });

        $scope.message = '';
    };

});

'use strict';

messengerApp.controller('ChatCtrl', function ($scope, $cookies, socket) {

    $scope.room = '';
    $scope.message = '';
    $scope.messages = [];

    $scope.sendMessage = function () {

        socket.emit('message.send', {
            user: $cookies.get('user.name'),
            message: $scope.message,
            room: $scope.room
        });

        $scope.messages.push({
            user: $cookies.get('user.name'),
            message: $scope.message
        });

        $scope.message = '';
    };

    socket.on('message.send', function (data) {
        $scope.messages.push(data);
    });

    socket.on('client.join', function (user) {
        var now = new Date(),
            expires = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

        $scope.user = user;
        $scope.room = user.socketId;

        console.log(user);

        for (var key in $scope.user) {
            $cookies.put('user.' + key, $scope.user[key], {expires: expires});
        }
    });

    socket.emit('client.join', {
        user: {
            name: $cookies.get('user.name'),
            email: $cookies.get('user.email')
        }
    });
});

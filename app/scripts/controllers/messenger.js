'use strict';

messengerApp.controller('MessengerCtrl', function ($scope, $cookies, socket) {

    $scope.room = '';
    $scope.message = '';
    $scope.messages = [];

    $scope.getClient = function (event) {
        $scope.room = event.target.dataset.room;
        $scope.messages = [];
        socket.emit('room.join', {
            room: $scope.room
        });
    };

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

    socket.emit('clients.all');

    socket.on('clients.all', function (clients) {
        $scope.clients = clients;
    });

    socket.on('room.join', function (client) {
        $scope.clients.push(client);
    });

    socket.on('client.disconnect', function (user) {
        for (var index in $scope.clients) {
             if (user.socketId == $scope.clients[index].socketId) {
                 $scope.clients.splice(index, 1);
             }
        }
    });

    socket.emit('operator.join', {
        user: {
            name: $cookies.get('user.name'),
            email: $cookies.get('user.email')
        }
    });

    socket.on('operator.join', function (user) {
        var now = new Date(),
            expires = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

        $scope.user = user;

        for (var key in $scope.user) {
            $cookies.put('user.' + key, $scope.user[key], {expires: expires});
        }
    });


});

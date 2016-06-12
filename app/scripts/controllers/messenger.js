'use strict';

messengerApp.controller('MessengerCtrl', function ($scope, $cookies, socket) {

    $scope.room = '';
    $scope.user = {};
    $scope.dialog = [];

    socket.emit('operator.join', {
        user: {
            name: $cookies.get('user.name'),
            email: $cookies.get('user.email')
        }
    });

    socket.on('operator.data', function (user) {
        var now = new Date(),
            expires = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

        $scope.user = user;
        $scope.room = user.socketId;

        for (var key in $scope.user) {
            $cookies.put('user.' + key, $scope.user[key], {expires: expires});
        }
    });
});

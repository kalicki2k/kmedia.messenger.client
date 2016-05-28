'use strict';

messengerApp.controller('MainCtrl', function ($scope, $cookies, $location, socket) {

    socket.on('user.join', function (data) {
        console.log(data);
        //$scope.messages.push({
        //    user: $cookies.get('user.name'),
        //    message: 'join...'
        //});
    });

    $scope.submitForm = function () {
        var now = new Date(),
            expires = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

        for (var key in $scope.user) {
            $cookies.put('user.' + key, $scope.user[key], {expires: expires});
        }

        socket.emit('user.init', {
            user: $scope.user
        });

        $location.path('/messenger');
    };
});

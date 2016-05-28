'use strict';

messengerApp.controller('MessengerCtrl', function ($scope, $cookies, socket) {

    socket.on('add.message', function (message) {
        $scope.messages.push(message);
    });
    
    $scope.messages = [];
    $scope.sendMessage = function () {

        socket.emit('send.message', {
            message: $scope.message
        });

        // add the message to our model locally
        $scope.messages.push({
        //     user: $cookies.get('user.name'),
             message: $scope.message
        });

        // clear message box
        //$scope.message = '';
    };

});

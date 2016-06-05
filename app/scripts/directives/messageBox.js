messengerApp.directive('messageBox', function () {

    return {
        scope: {
            user: '=',
            room: '='
        },
        templateUrl: 'templates/messageBox.html',
        restrict: 'E',
        controller: function ($scope, $cookies, socket) {
            $scope.message = '';
            $scope.messages = [];

            $scope.sendMessage = function () {

                socket.emit('message.sent', {
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

            socket.on('message.received', function (massage) {
                console.log('message.received: ', massage);
                $scope.messages.push(massage);
            });
        }
    }
});
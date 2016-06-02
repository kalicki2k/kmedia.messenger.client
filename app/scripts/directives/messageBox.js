messengerApp.directive('messageBox', function () {

    return {
        templateUrl: 'templates/messageBox.html',
        restrict: 'E',
        controller: function ($scope, $cookies, socket) {
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
        }
    }
});
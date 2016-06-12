messengerApp.directive('messageBox', function () {

    return {
        scope: {
            user: '=',
            room: '=',
            dialog: '='
        },
        templateUrl: 'templates/messageBox.html',
        restrict: 'E',
        controller: function ($scope, socket) {
            $scope.message = '';

            $scope.sendMessage = function () {

                socket.emit('message.sent', {
                    user: $scope.user,
                    message: $scope.message,
                    room: $scope.room
                });

                $scope.dialog.push({
                    user: $scope.user,
                    message: $scope.message
                });

                $scope.message = '';
            };

            socket.on('message.received', function (massage) {
                $scope.dialog.push(massage);
            });
        }
    }
});
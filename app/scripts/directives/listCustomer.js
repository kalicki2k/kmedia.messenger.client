messengerApp.directive('listCustomer', function () {

    return {
        scope: {
            room: '='
        },
        templateUrl: 'templates/listCustomer.html',
        restrict: 'E',
        controller: function ($scope, socket) {
            $scope.customers = [];

            $scope.joinRoom = function (event) {
                $scope.room = event.target.dataset.room;
                socket.emit('room.operator.join', {
                    room: $scope.room
                });
            };

            socket.on('customer.leave', function (user) {
                for (var index in $scope.customers) {
                    if (user.socketId == $scope.customers[index].socketId) {
                        $scope.customers.splice(index, 1);
                    }
                }
            });

            socket.on('room.all.customer', function (customers) {
                $scope.customers = customers;
            });

            socket.on('room.customer.join', function (customer) {
                $scope.customers.push(customer);
            });
        }
    }
});
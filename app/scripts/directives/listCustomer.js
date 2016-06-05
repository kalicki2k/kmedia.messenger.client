messengerApp.directive('listCustomer', function () {

    return {
        // scope: {
        //     user: '=',
        //     room: '='
        // },
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

            socket.on('room.all.customer', function (customers) {
                $scope.customers = customers;
            });

            socket.on('room.customer.join', function (customer) {
                $scope.customers.push(customer);
            });
        }
    }
});
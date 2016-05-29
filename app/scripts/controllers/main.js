'use strict';

messengerApp.controller('MainCtrl', function ($scope, $cookies, $location, socket) {

    $scope.submitForm = function () {
        var now = new Date(),
            expires = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

        for (var key in $scope.user) {
            $cookies.put('user.' + key, $scope.user[key], {expires: expires});
        }

        $location.path('/messenger');
    };
});

'use strict';

var messengerApp = angular.module('MessengerApp', [
    'ngCookies',
    'ngRoute'
]);

messengerApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/messenger.html',
            controller: 'MessengerCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

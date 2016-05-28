'use strict';

messengerApp.factory('socket', function ($rootScope) {
    var socket = io.connect('http://localhost:3000');

    // return {
    //     on: function (event, callback) {
    //         socket.on(event, callback);
    //     },
    //     emit: function (event, data) {
    //         socket.emit(event, data);
    //     }
    // };

    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});
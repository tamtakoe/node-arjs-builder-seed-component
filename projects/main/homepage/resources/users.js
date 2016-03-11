define([

    'app'

], function(app) {
    'use strict';

    app.factory('Users', function(apiResource) {
        return apiResource('users/:login', { login: '@login' }, {
            query: { url: 'users', method: 'GET', isArray: true, cache: true },
            get: { method: 'GET', cache: true }
        });
    });
});
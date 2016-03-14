define([

    'app'

], function(app) {
    'use strict';

    app.component('user', {
        templateUrl: '/main/homepage/components/user/template.html',
        bindings: { $resolve: '<' },
        controller: 'User'
    });

    app.controller('User', function() {
        this.user = this.$resolve.user;
    });
});
define([

    'app'

], function(app) {
    'use strict';

    app.component('list', {
        templateUrl: '/main/homepage/components/list/template.html',
        bindings: { $resolve: '<' },
        controller: 'List'
    });

    app.controller('List', function() {
        this.users = this.$resolve.usersList;
    });
});
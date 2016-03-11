define([

    'app'

], function(app) {
    'use strict';

    app.component('notFound', {
        templateUrl: '/main/not-found/template.html',
        controller: notFound
    });

    function notFound() {
        this.title = 'notFound';
    }
});
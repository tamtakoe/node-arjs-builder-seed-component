define([

    'app'

], function(app) {
    'use strict';

    app.component('navbar', {
        templateUrl: '/main/common/components/navbar/template.html',
        controller: 'Navbar'
    });

    app.controller('Navbar', function() {
        this.links = [{
            name: 'Home',
            state: 'list'
        }, {
            name: 'Contacts',
            state: 'contacts'
        }];
    });
});
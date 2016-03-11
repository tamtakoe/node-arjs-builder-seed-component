define([

    'app'

], function(app) {
    'use strict';

    app.component('contacts', {
        templateUrl: '/main/contacts/template.html',
        controller: Contacts
    });

    function Contacts() {
        this.title = 'Contacts';
    }
});
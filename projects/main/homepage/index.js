define([

    'app',

    'main/homepage/components/list/index',
    'main/homepage/components/user/index',
    'main/homepage/components/header/index',

    'main/homepage/resources/users'

], function(app) {
    'use strict';

    app.config(function($stateProvider) {
        $stateProvider
            .state('list', {
                parent: 'homepage',
                url: '/',
                component: 'list',
                resolve: {
                    usersList: ['Users', function(Users) {
                        return Users.query().$promise;
                    }]
                }
            })
            .state('user', {
                parent: 'homepage',
                url: '/:login',
                component: 'user',
                resolve: {
                    user: ['Users', '$stateParams', function(Users, $stateParams) {
                        return Users.get({login: $stateParams.login}).$promise;
                    }]
                }
            })
    });

    app.component('homepage', {
        templateUrl: '/main/homepage/template.html'
    });
});
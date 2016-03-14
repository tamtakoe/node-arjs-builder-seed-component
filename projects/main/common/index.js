define([

    'app',

    'main/common/components/flashMessage/index',
    'main/common/components/meta/index',
    'main/common/components/navbar/index',

    'main/common/services/router',
    'main/common/services/api/resource',
    'main/common/services/api/interceptor',
    'main/common/services/api/transformResponse',
    'main/common/services/config'

], function(app) {
    'use strict';

    app.run(function($state, $rootScope, flashMessage) {
        //FIXME: $state is needed because ui-router bug https://github.com/angular-ui/ui-router/issues/2574

        $rootScope.$on('$stateChangeError' ,function(event, toState, toParams, fromState, fromParams, error) {
            flashMessage.error(error.statusText, {description: error.message, pin: true});
        })
    });

    //disable strip trailing slashes
    app.config(function($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    });

    app.config(function(config, $locationProvider, $urlRouterProvider, $stateProvider, routerProvider, $urlMatcherFactoryProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        $urlMatcherFactoryProvider.strictMode(false); //ignore trailing slash
        $stateProvider.decorator('views', routerProvider.viewsDecorator);

        angular.forEach(config.redirects, function(value, key) {
            $urlRouterProvider.when(key, value);
        });

        $urlRouterProvider.otherwise('/not-found');
    });

    app.config(function($stateProvider) {
        $stateProvider
            .state('contacts', {
                url: '/contacts',
                component: 'contacts'
            })
            .state('notFound', {
                url: '/not-found',
                component: 'notFound'
            })
            //Must to be on bottom because uses id: filler
            .state('homepage', {
                url: '',
                abstract: true,
                component: 'homepage'
            });
    });

    app.component('app', {
        templateUrl: '/main/common/template.html'
    });
});
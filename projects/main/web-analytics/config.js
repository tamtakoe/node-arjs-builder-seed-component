define([

    'app',

    'main/web-analytics/directives/track/directive',

    'main/web-analytics/services/web-analytics'

], function(app) {

    app.run(function($rootScope, $q, $location, webAnalytics) {
        //TODO: if (phantom) return;

        $rootScope.$on('$locationChangeSuccess', function(event, toUrl, fromUrl) {
            webAnalytics.hit(toUrl, fromUrl);
        });
    });
});
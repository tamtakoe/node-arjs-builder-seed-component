define([

    'app'

], function(app) {
    'use strict';

    app.provider('router', function() {
        function expandViews(state, parent) {
            var views = parent(state);
            var componentName = state.self.component;

            function mapValues(src, fn) {
                var dst = {};

                for (var key in src) {
                    if (src.hasOwnProperty(key)) {
                        dst[key] = fn(src[key]);
                    }
                }

                return dst;
            }

            function camelToSnake(str){
                return str.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
            }

            function extendView(name) {
                //Views format
                //views: {
                //    body: {
                //        templateUrl: '/main/common/views/body/template.html',
                //        controllerUrl: 'common/body/controller',
                //        controller: 'CommonBody'
                //    }
                //}
                if (typeof name === 'string') {
                    var snakeName = camelToSnake(name);
                    var deps = ['$scope'].concat(Object.keys(state.resolve));

                    var controller = deps.concat(function($scope) {
                        var i, resolve = {};

                        for (i = 1; i < arguments.length; i++) {
                            resolve[deps[i]] = arguments[i];
                        }
                        $scope.$resolve = resolve;
                    });
                    name = {
                        //You can use resolved result add bindings: { $resolve: '<' } in component settings,
                        template: '<' + snakeName + ' $resolve="$resolve"></' + snakeName + '>',
                        controller: controller
                    };
                }
                return name;
            }

            if (componentName) {
                views = mapValues(views, function() {
                    return extendView(componentName);
                });
            } else {
                views = mapValues(views, extendView);
            }

            return views;
        }

        //TODO: remove because $urlMatcherFactoryProvider.strictMode(false) is used;
        function removeTrailingSlash($injector, $location) {
            return $location.url().replace(/\/+$|\/(?=\?)/, ''); //remove trailing slash
        }
        removeTrailingSlash.$inject = ['$injector', '$location'];

        return {
            removeTrailingSlash: removeTrailingSlash,
            viewsDecorator: expandViews,
            $get: angular.noop
        };
    });
});
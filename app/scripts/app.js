'use strict';

/**
 * @ngdoc overview
 * @name dnd4eToJsonApp
 * @description
 * # dnd4eToJsonApp
 *
 * Main module of the application.
 */
angular
  .module('dnd4eToJsonApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',


    'ui.bootstrap',
    'ui.router',
    'ui.event',
    'dibari.angular-ellipsis',

    'config'
])
.config(function ($routeProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main',
            resolve: {
                characterImport: function ($http){
                    return $http.get('/basic fighter.json')
                        .then(function (success){
                            return success.data
                        }, function (error){
                            console.log(error)
                        });
                }
            }
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html',
        });

    $urlRouterProvider.otherwise('/');

});
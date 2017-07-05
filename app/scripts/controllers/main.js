'use strict';

/**
 * @ngdoc function
 * @name dnd4eToJsonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dnd4eToJsonApp
 */
angular.module('dnd4eToJsonApp')
.controller('MainCtrl', function ($scope, $timeout, characterImport, characterParserFactory, characterService) {

    characterParserFactory.characterSheetDisection(characterImport.D20Character.CharacterSheet);

    $scope.stats = characterService.StatBlock;
    $scope.details = characterService.Details;

    $timeout(function(){
        console.log('characterService', characterService);
    }, 5000);

});

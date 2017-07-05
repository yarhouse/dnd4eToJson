'use strict';

/**
 * @ngdoc service
 * @name dnd4eToJsonApp.characterParserFactory
 * @description
 * # characterParserFactory
 * Factory in the dnd4eToJsonApp.
 */
angular.module('dnd4eToJsonApp')
.factory('characterParserFactory', function ($log, characterService, STAT_FULL_2_ABRV) {


    function simplifiedStats(abilityScoresObject){
        angular.forEach(abilityScoresObject, function(value, key) {
            if (STAT_FULL_2_ABRV[key]) {
                this[STAT_FULL_2_ABRV[key]] = value['@score'];
            }
        }, characterService.AbilityScores);
    }

    function statBlockBreakdown(statBlock){
        angular.forEach(statBlock.Stat, function(obj, ind, array) {
            if (angular.isArray(obj.alias)) {
                this[obj.alias[0]['@name']] = obj['@value'];
            } else {
                this[obj.alias['@name']] = obj['@value'];
            }
        }, characterService.StatBlock);
    }


    return {
        characterSheetDisection: function (characterSheet) {
            console.log('characterSheet', characterSheet);
            statBlockBreakdown(characterSheet.StatBlock);
            characterService.Details = characterSheet.Details;
        }
    };
});

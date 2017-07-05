'use strict';

/**
 * @ngdoc service
 * @name dnd4eToJsonApp.characterService
 * @description
 * # characterService
 * Service in the dnd4eToJsonApp.
 */
angular.module('dnd4eToJsonApp')
.service('characterService', function () {

    this.AbilityScores = {
        Str: 8,
        Con: 8,
        Dex: 8,
        Int: 8,
        Wis: 8,
        Cha: 8
    };

    this.StatBlock = { };



    // AngularJS will instantiate a singleton by calling "new" on this function
});

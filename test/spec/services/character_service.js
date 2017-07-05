'use strict';

describe('Service: characterService', function () {

  // load the service's module
  beforeEach(module('dnd4eToJsonApp'));

  // instantiate service
  var characterService;
  beforeEach(inject(function (_characterService_) {
    characterService = _characterService_;
  }));

  it('should do something', function () {
    expect(!!characterService).toBe(true);
  });

});

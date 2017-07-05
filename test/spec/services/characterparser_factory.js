'use strict';

describe('Service: characterParserFactory', function () {

  // load the service's module
  beforeEach(module('dnd4eToJsonApp'));

  // instantiate service
  var characterParserFactory;
  beforeEach(inject(function (_characterParserFactory_) {
    characterParserFactory = _characterParserFactory_;
  }));

  it('should do something', function () {
    expect(!!characterParserFactory).toBe(true);
  });

});

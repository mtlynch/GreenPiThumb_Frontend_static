'use strict';

describe('greenPiThumbApp controller', function() {
  var mockScope = {};
  var controller;

  beforeEach(angular.mock.module('greenPiThumbApp'));

  beforeEach(angular.mock.inject(function($controller, $rootScope) {
    mockScope = $rootScope.$new();
    controller = $controller('DashboardCtrl', {
      $scope: mockScope
    });
  }));

  it('Creates variable', function() {
    expect(mockScope.currentImage).toEqual(0);
  });

  it('Increments image index', function() {
    mockScope.nextImage();
    expect(mockScope.currentImage).toEqual(1);
  });
});

'use strict';

var model = {};

var greenPiThumbApp = angular.module('greenPiThumbApp', [
  'greenPiThumbApp.directives',
  'greenPiThumbApp.version'
  ]);

angular.module('d3', []);
angular.module('greenPiThumbApp.directives', ['d3']);

greenPiThumbApp.run(function($http) {
  $http.get('/temperatureHistory.json').success(function(temperatureHistory) {
    model.latestTemperature =
      temperatureHistory[temperatureHistory.length - 1].temperature;
    model.temperature = temperatureHistory;
  });
  $http.get('/humidityHistory.json').success(function(humidityHistory) {
    model.humidity = humidityHistory;
    model.latestHumidity =
      humidityHistory[humidityHistory.length - 1].humidity;
  });
  $http.get('/lightHistory.json').success(function(lightHistory) {
    model.lightLevel = lightHistory;
    model.latestLightLevel =
      lightHistory[lightHistory.length - 1].light;
  });
  $http.get('/soilMoistureHistory.json').success(function(moistureHistory) {
    model.soilMoisture = moistureHistory;
    model.latestSoilMoisture =
      moistureHistory[moistureHistory.length - 1].soil_moisture;
  });
  $http.get('/images.json').success(function(images) {
    model.images = [];
    images.forEach(function(image) {
      model.images.push({
        'timestamp': image.timestamp,
        'filename': 'images/' + image.filename
      });
    });
    model.images.sort(function(a, b) {
      if (a.timestamp < b.timestamp) {
        return -1;
      }
      if (a.timestamp > b.timestamp) {
        return 1;
      }
      return 0;
    });
    model.currentImage = model.images.length - 1;
  });
});

greenPiThumbApp.controller('DashboardCtrl', function($scope) {
  $scope.dashboard = model;

  $scope.previousImage = function() {
    $scope.dashboard.currentImage -= 1;
    if ($scope.dashboard.currentImage < 0) {
      $scope.dashboard.currentImage = $scope.dashboard.images.length - 1;
    }
  };

  $scope.nextImage = function() {
    $scope.dashboard.currentImage = ($scope.dashboard.currentImage + 1) % $scope.dashboard.images.length;
  };
});

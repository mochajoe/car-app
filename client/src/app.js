var app = angular.module('app', ['ngRoute'])
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/src/views/login.html',
    controller: 'loginCtrl'
  })
  .when('/login', {
    templateUrl: '/src/views/login.html',
    controller: 'loginCtrl'
  })
  .when('/searchBar', {
    templateUrl: '/src/views/searchBar.html',
    controller: 'searchBarCtrl'
  })

  $locationProvider.html5Mode(true)
})
.controller("searchBarCtrl", function($scope) {

    $scope.makes = window.carData.makes
    $scope.searchMake = (make) => {
      $scope.currentMake=make;
    }

    $scope.searchMake = (make) => {
      $scope.make = $('#make').val()
      $scope.index=$('#make')[0].selectedIndex
      $scope.models = $scope.makes[$scope.index].models

      $scope.filteredModels = {}
      $scope.modelsAndYears = {}
        for (var i = 0; i<$scope.models.length; i++) {
          var item = $scope.models[i]
          var first=item.name.split(' ')[0]
          var years = item.years.map(function(item) {
            return item.year.toString();
          })
          if (!$scope.filteredModels[first]) {
            $scope.filteredModels[first] = [item.name]
          } else {
            $scope.filteredModels[first].push(item.name)
          }

          $scope.modelsAndYears[item.name] = years
        }

      $scope.filteredModelsArr = Object.keys($scope.filteredModels)

    }

    $scope.modelClick = (model) => {
      $scope.showAllModels= false;
    }

    $scope.searchYear = (year) => {
      $scope.make = $('#make').val();
      $scope.index=$('#make')[0].selectedIndex
      $scope.year = $('#year').val()
      if ($scope.year === "Show All Years") {
        $scope.searchMake()
      }else {
      $scope.models = $scope.makes[$scope.index].models
      $scope.modelsProducedInSelectedYear = []
      var keys = Object.keys($scope.modelsAndYears)
      for(var i = 0; i<keys.length; i++) {
        var models = $scope.modelsAndYears[keys[i]]
        if(models.includes($scope.year)) {
          $scope.modelsProducedInSelectedYear.push(keys[i])
        }
      }

      $scope.filteredModels = {}
      for (var i = 0; i<$scope.modelsProducedInSelectedYear.length; i++) {
          var item = $scope.modelsProducedInSelectedYear[i]
          var first=item.split(' ')[0]
          if (!$scope.filteredModels[first]) {
            $scope.filteredModels[first] = [item]
          } else {
            $scope.filteredModels[first].push(item)
          }
        }
      $scope.filteredModelsArr = Object.keys($scope.filteredModels)
      if ($scope.filteredModelsArr.length===0) {
        $scope.filteredModelsArr=["No Results Found"]
      }
      }
    }

    $scope.clickDetails = (model) => {

      // $scope.getStyleId(model, function(data){

      // })

      $scope.model = model;
      $scope.make = $('#make').val();
      $scope.yearsAvailable = $scope.modelsAndYears[model].join(' ');
      $scope.bodyType = window.sampleStyleData.styles[0].submodel.body;
      $scope.transmission = window.sampleEquipmentData.equipment[34].transmissionType;
      $scope.mpg = window.sampleEquipmentData.equipment[22].attributes[3].value + '/' + window.sampleEquipmentData.equipment[22].attributes[4].value;
      $scope.fuelCapacity = window.sampleEquipmentData.equipment[22].attributes[5].value;
      $scope.driveType = window.sampleEquipmentData.equipment[24].attributes[0].value;
      $scope.cylinder = window.sampleEquipmentData.equipment[33].cylinder;
      $scope.size = window.sampleEquipmentData.equipment[33].size;
      $scope.displacement = window.sampleEquipmentData.equipment[33].displacement;
      $scope.gasType = window.sampleEquipmentData.equipment[33].fuelType;
      $scope.engineCode = window.sampleEquipmentData.equipment[33].code;

      $scope.seating = window.sampleEquipmentData.equipment[17].attributes.reduce(function(a,b) {
          if (typeof a !== "number") {
            a = parseInt(a.value)
          }
          if (typeof b !== "number") {
            b= parseInt(b.value)
          }
          return a + b
      });

      console.log(window.sampleEquipmentData.equipment[34])

      //console.log($scope.transmission)
    }

    $scope.getStyleId = (callback) => {
      $.ajax({
        url: '',
        success: function(data) {
          callback(data)
        }
      })
    }


})





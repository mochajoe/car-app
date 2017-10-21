app.controller("searchBarCtrl", function($scope, $http, $window) {
  $scope.currentUserFavorites = [];
  $scope.newDivTemplate = "src/views/carDetails.html"
  $scope.makes = window.carData.makes
  $scope.searchMake = (make) => {
    $scope.currentMake = make;
  }

  $scope.searchMake = (make) => {
    $scope.make = $('#make').val()
    $scope.index = $('#make')[0].selectedIndex
    $scope.models = $scope.makes[$scope.index].models

    $scope.filteredModels = {}
    $scope.modelsAndYears = {}
    for (var i = 0; i < $scope.models.length; i++) {
      var item = $scope.models[i]
      var first = item.name.split(' ')[0]
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
    $scope.showAllModels = false;
  }

  $scope.searchYear = (year) => {
    $scope.make = $('#make').val();
    $scope.index = $('#make')[0].selectedIndex
    $scope.year = $('#year').val()
    if ($scope.year === "Show All Years") {
      $scope.searchMake()
    } else {
      $scope.models = $scope.makes[$scope.index].models
      $scope.modelsProducedInSelectedYear = []
      var keys = Object.keys($scope.modelsAndYears)
      for (var i = 0; i < keys.length; i++) {
        var models = $scope.modelsAndYears[keys[i]]
        if (models.includes($scope.year)) {
          $scope.modelsProducedInSelectedYear.push(keys[i])
        }
      }

      $scope.filteredModels = {}
      for (var i = 0; i < $scope.modelsProducedInSelectedYear.length; i++) {
        var item = $scope.modelsProducedInSelectedYear[i]
        var first = item.split(' ')[0]
        if (!$scope.filteredModels[first]) {
          $scope.filteredModels[first] = [item]
        } else {
          $scope.filteredModels[first].push(item)
        }
      }
      $scope.filteredModelsArr = Object.keys($scope.filteredModels)
      if ($scope.filteredModelsArr.length === 0) {
        $scope.filteredModelsArr = ["No Results Found"]
      }
    }
  }

  $scope.passModelToDetail = (model) => {
    // alert("Please wait while we grab the details")
    $scope.carDetailModel = model
    $scope.clickDetails(model)
    alert("Searching car details")
  }

  $scope.clickDetails = (model) => {
    var model = $scope.carDetailModel
    var api_keys = ["2k98pna4hq6mcrwte39t2gcg", "73nq99k66vq774ycfte8fthk", "bptp3rjw8nhgtn8bzweudqg9", "vwp9323cjna6pjxg5jqtc3qc"]
    $scope.getStyle(model, function(data) {
      $scope.styleId = data.styles[0].id;
      $scope.style = data;
    })

    $scope.getEquipmentData($scope.styleId, function(data) {
      $scope.equipmentData = data;

    })

    $scope.getPhoto($scope.styleId, function(data) {
      $scope.modelImages = [];
      data.photos.forEach(function(item) {
        if (item.category === "EXTERIOR") {
          item.sources.forEach(function(source) {
            if (source.size.width === 500) {
              $scope.modelImages.push("https://media.ed.edmunds-media.com" + source.link.href)
            }
          })
        }
      })
      console.log($scope.modelImages)
    })

    $scope.getMSRP($scope.styleId, function(data) {
      $scope.MSRP = data.pricingAttributeGroup.attributes.MSRP.value
    })

    $scope.model = model;
    $scope.make = $('#make').val();
    $scope.yearsAvailable = $scope.modelsAndYears[model].join(' | ');
    $scope.bodyType = $scope.style.styles[0].submodel.body;

    $scope.equipmentData.equipment.forEach(function(equipment) {
      if (equipment.name === "Seating Configuration") {
        $scope.seating = equipment.attributes.reduce(function(a, b) {
          if (typeof a !== "number") {
            a = parseInt(a.value)
          }
          if (typeof b !== "number") {
            b = parseInt(b.value)
          }
          return a + b
        });
      }

      if (equipment.equipmentType === "TRANSMISSION") {
        $scope.transmission = equipment.transmissionType;
      }

      if (equipment.name === "Specifications") {
        var city = "";
        var highway = "";
        var combined = "";
        equipment.attributes[3].value + '/' + equipment.attributes[4].value;

        equipment.attributes.forEach(function(item) {
          if (item.name === "Epa City Mpg") {
            city = item.value + " City";
          }
          if (item.name === "Epa Highway Mpg") {
            highway = item.value + " Highway";
          }
          if (item.name === "Epa Combined Mpg") {
            combined = item.value + " Combined"
          }
          if (item.name === "Fuel Capacity") {
            $scope.fuelCapacity = item.value
          }
        })
        $scope.mpg = city + "/" + highway + "/" + combined;
      }

      if (equipment.name === "Drive Type") {
        equipment.attributes.forEach(function(item) {
          if (item.name === "Driven Wheels") {
            $scope.driveType = item.value;
          }
        });
      }

      if (equipment.equipmentType === "ENGINE") {
        $scope.cylinder = equipment.cylinder ? equipment.cylinder : null;
        $scope.size = equipment.size ? equipment.size : null;
        $scope.displacement = equipment.displacement ? equipment.displacement : null;
        $scope.gasType = equipment.fuelType ? equipment.fuelType : null;
        $scope.engineCode = (equipment.code && !$scope.engineCode) ? equipment.code : null;
      }

    })

    //console.log($scope.transmission)
  }

  $scope.getStyle = (model, callback) => {
    //bptp3rjw8nhgtn8bzweudqg9
    //2k98pna4hq6mcrwte39t2gcg

    var make = $('#make').val();
    var yearsArr = $scope.modelsAndYears[model];
    var year = yearsArr[yearsArr.length - 1];
    var url = "https://api.edmunds.com/api/vehicle/v2/" + make + "/" + model + "/" + year + "/styles?fmt=json&api_key=";

    // callback(window.sampleStyleData)// comment this out after enabling ajax call

    $.ajax({
      url: url + "2k98pna4hq6mcrwte39t2gcg",
      success: function(data) {
        callback(data)
      },
      error: function() {

      },
      async: false
    })
  }

  $scope.getEquipmentData = (styleId, callback) => {
    var url = "https://api.edmunds.com/api/vehicle/v2/styles/" + styleId + "/equipment?fmt=json&api_key=";

    // callback(window.sampleEquipmentData)  // comment this out to run ajax call

    $.ajax({
      url: url + "73nq99k66vq774ycfte8fthk",
      success: function(data) {
        callback(data)
      },
      error: function() {

      },
      async: false
    })
  }

  $scope.getPhoto = (styleId, callback) => {
    var url = "https://api.edmunds.com/api/media/v2/styles/" + styleId + "/photos?api_key="
    // callback(window.samplePhotos)
    $.ajax({
      url: url + "bptp3rjw8nhgtn8bzweudqg9",
      success: function(data) {
        callback(data)
      },
      error: function() {

      },
      async: false
    })
  }

  $scope.getMSRP = (styleId, callback) => {
    var url = "https://api.edmunds.com/v1/api/configurator/default?zip=90019&styleid=" + styleId + "&fmt=json&api_key=";
    // callback(window.modelConfig)
    $.ajax({
      url: url + "pe5kbjpqpw5zmeu6y7ddrwtj",
      success: function(data) {
        callback(data)
      },
      error: function() {

      },
      async: false
    })
  }


  $scope.addToFavorite = function(user, make, model, year, id) {
    var carObj = { user, make, model, year };
    console.log(carObj);
    $window.alert('you have added a car to your favorites')
    $http.post('/favoriteCar', carObj).then((request) => {
      console.log(request);
    })
  }

  // $scope.addToFavoriteId = function(user,id) {
  //   var usrObj = {user,id}
  //   console.log(usrObj);
  //   $http.post('/favoriteCar', usrObj).then((request) => {
  //       console.log(request);
  //     })
  // }


})
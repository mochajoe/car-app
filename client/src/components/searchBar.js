// angular.module('app')
// .component('searchBar', {
//   templateUrl: './src/views/searchBar.html',
//   bindings: {
//     makes: '<',
//     showSearchBar:'<'
//   },
//   controller: function() {

//     this.searchMake = (make) => {
//       this.make = $('#make').val()
//       this.index=$('#make')[0].selectedIndex
//       this.models = this.makes[this.index].models

//       this.filteredModels = {}
//       this.modelsAndYears = {}
//         for (var i = 0; i<this.models.length; i++) {
//           var item = this.models[i]
//           var first=item.name.split(' ')[0]
//           var years = item.years.map(function(item) {
//             return item.year.toString();
//           })
//           if (!this.filteredModels[first]) {
//             this.filteredModels[first] = [item.name]
//           } else {
//             this.filteredModels[first].push(item.name)
//           }

//           this.modelsAndYears[item.name] = years
//         }

//       this.filteredModelsArr = Object.keys(this.filteredModels)

//     }

//     this.modelClick = (model) => {
//       this.showAllModels= true;
//     }

//     this.searchYear = (year) => {
//       this.make = $('#make').val();
//       this.index=$('#make')[0].selectedIndex
//       this.year = $('#year').val()
//       if (this.year === "Show All Years") {
//         this.searchMake()
//       } else {
//       this.models = this.makes[this.index].models
//       this.modelsProducedInSelectedYear = []
//       var keys = Object.keys(this.modelsAndYears)
//       for(var i = 0; i<keys.length; i++) {
//         var models = this.modelsAndYears[keys[i]]
//         if(models.includes(this.year)) {
//           this.modelsProducedInSelectedYear.push(keys[i])
//         }
//       }
//       this.filteredModels = {}
//       for (var i = 0; i<this.modelsProducedInSelectedYear.length; i++) {
//           var item = this.modelsProducedInSelectedYear[i]
//           var first=item.split(' ')[0]
//           if (!this.filteredModels[first]) {
//             this.filteredModels[first] = [item]
//           } else {
//             this.filteredModels[first].push(item)
//           }
//         }
//       this.filteredModelsArr = Object.keys(this.filteredModels)
//       }

//     }

//   }


// });
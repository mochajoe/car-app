angular.module('app')
.component('searchBar', {
  templateUrl: './src/views/searchBar.html',
  bindings: {
    makes: '<'
  },
  controller: function() {

    this.searchMake = (make) => {
      this.make = $('#make').val()
      this.index=$('#make')[0].selectedIndex
      this.models = this.makes[this.index].models


      this.filteredModels = {}

      for (var i = 0; i<this.models.length; i++) {
        var item = this.models
        var first=item[i].name.split(' ')[0]
        if (!this.filteredModels[first]) {
          this.filteredModels[first] = [item[i].name]
        } else {
          this.filteredModels[first].push(item[i].name)
        }
      }
      console.log(this.filteredModels)
      this.filteredModelsArr = Object.keys(this.filteredModels)
    }

    this.modelClick = (model) => {
      this.showAllModels= true;
    }

  }
});
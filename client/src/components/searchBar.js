angular.module('app')
.component('searchBar', {
  templateUrl: './src/views/searchBar.html',
  bindings: {
    makes: '<'
  },
  controller: function() {

    this.searchMake = (make) =>{
      this.make = $('#make').val()
      this.index=$('#make')[0].selectedIndex
      this.models = this.makes[this.index].models
      console.log(this.models)
    }

  }
});
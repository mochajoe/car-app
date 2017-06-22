angular.module('app')
.component('searchBar', {
  templateUrl: './src/views/searchBar.html',
  bindings: {
    makes: '<',
    onChange: '<'
  },
  controller: function() {
    console.log(this);
  }
});
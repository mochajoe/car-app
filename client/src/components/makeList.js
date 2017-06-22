angular.module('app')
.component('makeList', {
  templateUrl: './src/views/makeList.html',
  bindings: {
    make: '<'
  },
  controller: function() {
    console.log(this)
  }
})
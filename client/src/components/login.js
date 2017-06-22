angular.module('app')
.component('login', {
  templateUrl: './src/views/login.html',
  bindings: {
    showSearchBar: '<'
  },

  controller: function() {
    this.makes = window.carData.makes
    this.searchMake = (make) => {
      this.currentMake=make;
    }
    this.clickLogin = () => {
      console.log(this)
    }
    console.log(this)
  }
})
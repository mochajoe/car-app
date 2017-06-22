angular.module('app', [])
.component('app', {
  templateUrl: './src/views/app.html',

  controller: function() {
    this.showSearchBar=false;
    this.showLogin=true;


    this.makes = window.carData.makes
    this.searchMake = (make) => {
      this.currentMake=make;
    }


    this.clickLogin = () => {
      this.showSearchBar=true;
      this.showLogin=false;
    }

    this.logOut= () => {
      this.showSearchBar=false;
      this.showLogin=true;
    }

  }
})
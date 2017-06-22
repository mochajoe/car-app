angular.module('app', [])
.component('app', {
  templateUrl: './src/views/app.html',

  controller: function() {
    this.makes = window.carData.makes
    this.searchMake = (make) => {
      this.currentMake=make;
    }

    this.currentMake=this.makes[0]


  }
})
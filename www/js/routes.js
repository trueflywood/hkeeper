angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.page4', {
    url: '/shops',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page4.html',
        controller: 'page4Ctrl'
      }
    }
  })

  .state('menu.page14', {
    url: '/page14',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page14.html',
        controller: 'page14Ctrl'
      }
    }
  })

  .state('menu.page5', {
    url: '/payments',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page5.html',
        controller: 'page5Ctrl'
      }
    }
  })

  .state('menu.page6', {
    url: '/Feedback',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page6.html',
        controller: 'page6Ctrl'
      }
    }
  })

  .state('menu.page7', {
    url: '/about',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page7.html',
        controller: 'page7Ctrl'
      }
    }
  })

  .state('menu.page8', {
    url: '/scan',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page8.html',
        controller: 'page8Ctrl'
      }
    }
  })

  .state('menu.page10', {
    url: '/check',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page10.html',
        controller: 'page10Ctrl'
      }
    }
  })

  .state('menu.page11', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page11.html',
        controller: 'page11Ctrl'
      }
    }
  })

  .state('menu.page13', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page13.html',
        controller: 'page13Ctrl'
      }
    }
  })

  .state('menu.page12', {
    url: '/page12',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page12.html',
        controller: 'page12Ctrl'
      }
    }
  })

  .state('menu.page9', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page9.html',
        controller: 'page9Ctrl'
      }
    }
  })

  .state('menu.page15', {
    url: '/map',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page15.html',
        controller: 'page15Ctrl'
      }
    }
  })

  .state('menu.page17', {
    url: '/page17',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page17.html',
        controller: 'page17Ctrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page1')

  

});
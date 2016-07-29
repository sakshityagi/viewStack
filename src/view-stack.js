/* view-stack - v1.0.0 - May,2016 */

var app;

app = angular.module('view-stack', []);

app.directive("viewSwitcher", ["ViewStack", "$rootScope", '$compile',
  function (ViewStack, $rootScope, $compile) {
    return {
      restrict: 'AE',
      link: function (scope, elem, attrs) {
        var views = 0;
        manageDisplay();
        $rootScope.$on('VIEW_CHANGED', function (e, type, view) {
          if (type === 'PUSH') {
            var newScope = $rootScope.$new();
            newScope.currentLayout = "templates/" + view.template + ".html";

            var _newView = '<div  id="' + view.template + '" ><div class="slide content" ng-if="currentLayout" ng-include="currentLayout"></div></div>';
            if (view.params && view.params.controller) {
              _newView = '<div id="' + view.template + '" ><div class="slide content" ng-if="currentLayout" ng-include="currentLayout" ng-controller="' + view.params.controller + '" ></div></div>';
            }
            var parTpl = $compile(_newView)(newScope);
            $(elem).append(parTpl);
            views++;

          } else if (type === 'POP') {
            var _elToRemove = $(elem).find('#' + view.template),
              _child = _elToRemove.children("div").eq(0);

            _child.addClass("ng-leave ng-leave-active");
            _child.one("webkitTransitionEnd transitionend oTransitionEnd", function (e) {
              _elToRemove.remove();
              views--;
            });

            //$(elem).find('#' + view.template).remove();
          }
          else if (type === 'POPALL') {
            console.log(view);
            angular.forEach(view, function (value, key) {
              $(elem).find('#' + value.template).remove();
            });
            views = 0;
          }
          manageDisplay();
        });

        function manageDisplay() {
          if (views) {
            $(elem).removeClass("ng-hide");
          } else {
            $(elem).addClass("ng-hide");
          }
        }

      }
    };
  }]);

app.factory('ViewStack', ['$rootScope', function ($rootScope) {
  var views = [];
  var viewMap = {};
  return {
    push: function (view) {
      if (viewMap[view.template]) {
        this.pop();
      }
      else {
        viewMap[view.template] = 1;
        views.push(view);
        $rootScope.$broadcast('VIEW_CHANGED', 'PUSH', view);
      }
      return view;
    },
    pop: function () {
      var view = views.pop();
      delete viewMap[view.template];
      $rootScope.$broadcast('VIEW_CHANGED', 'POP', view);
      return view;
    },
    hasViews: function () {
      return !!views.length;
    },
    getCurrentView: function () {
      return views.length && views[views.length - 1] || {};
    },
    popAllViews: function () {
      $rootScope.$broadcast('VIEW_CHANGED', 'POPALL', views);
      views = [];
      viewMap = {};
    }
  };
}]);
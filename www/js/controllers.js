// controller
var zhdCtrl = angular.module('zhihudailycontroller', []);

zhdCtrl.controller('MainCtrl', function ($scope, storyService, $ionicSlideBoxDelegate) {
    console.log("controller");
    $scope.loadmore = function () {
        console.log("loadmore");
        storyService.loadmore().then(function (res) {
            if (null === $scope.storycontainer || typeof $scope.storycontainer == "undefined") {
                $scope.storycontainer = [];
            }
            if (res.date != null) {
                if (res.top_stories != null) {
                    $scope.tpstorylist = res.top_stories;
                    $ionicSlideBoxDelegate.update();
                }
                $scope.storycontainer.push(res);
            } else {
                $scope.noMoreItemsAvailable = true;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    console.log(storyService);

});
zhdCtrl.controller('NavCtrl', function ($scope, themeService) {
    themeService.getThemelist().then(function (res) {
        $scope.themelist = res;
    });
});

zhdCtrl.controller('StoryCtrl', function ($scope, storyService, $sce, $stateParams) {
    var id = $stateParams.id;
    $scope.story = {};
    if (!id) {
        return;
    } else {
        storyService.getstory(id).then(function (res) {
            $scope.story = res;
            //$scope.story.body = $sce.trustAsHtml(res.body);
            if (!res.theme) {
                document.getElementById('storycontent').innerHTML = res.body;
                var storyhead = {};
                storyhead.title = res.title;
                storyhead.image = res.image;
                storyhead.image_source = res.image_source;
                var html = template('storyhead', storyhead);
                var div = document.createElement('div');
                div.setAttribute('class', 'img-wrap');
                div.innerHTML = html;
                document.getElementsByClassName('headline')[0].appendChild(div);
            } else {
                document.getElementById('storycontent').innerHTML = res.body;
            }

        });
    }
});

zhdCtrl.controller('ThemeCtrl', function ($scope, themeService, $stateParams) {
  var id = $stateParams.id;
  $scope.theme={};
  if(!id){
    return;
  }else{
    themeService.getThemedetail(id).then(function(res) {
      $scope.theme = res;
    });
  }
});
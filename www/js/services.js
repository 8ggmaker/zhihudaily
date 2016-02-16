var zhdService = angular.module('dataservice', []);

zhdService.factory('storyService', ['$q', '$http', function ($q, $http) {
    // ZHIHU DAILY REST API URL
    var resturls = {
        'LATEST_STORY_URL': 'http://news-at.zhihu.com/api/4/news/latest',
        'STORY_CONTENT_URL': 'http://news-at.zhihu.com/api/4/news',
        'HISTORY_STORY_URL': 'http://news.at.zhihu.com/api/4/news/before',
    };

    var currentId = null;
    var storyContainer = {};
    var storyContentContainer = {};

    var getfromUrl = function (url) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http.get(url).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return promise;
    };

    return {
        all: function () {
            return storyContainer;
        },
        loadmore: function () {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (null === currentId) {
                getfromUrl(resturls.LATEST_STORY_URL).then(function (res) {
                    var data = res;
                    var id = data.date;
                    storyContainer[id] = data;
                    currentId = id;
                    deferred.resolve(storyContainer[id]);
                }, function (error) {
                        deferred.reject(error);
                    });
            } else {
                var url = resturls.HISTORY_STORY_URL + "/" + currentId;
                getfromUrl(url).then(function (res) {
                    var data = res;
                    var id = data.date;
                    storyContainer[id] = data;
                    currentId = id;
                    deferred.resolve(storyContainer[id]);
                }, function (error) {
                        deferred.reject(error);
                    });
            }
            return promise;
        },
        getstory: function (id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            if (!id) {
                deferred.reject("id is null");
            } else {
                if (!storyContentContainer[id]) {
                    var url = resturls.STORY_CONTENT_URL + '/' + id;
                    getfromUrl(url).then(function (res) {
                        //var fileref = document.createElement("link")
                        //fileref.setAttribute("rel", "stylesheet")
                        //fileref.setAttribute("type", "text/css")
                        //fileref.setAttribute("href", res.css[0]);
                        //document.getElementsByTagName("head")[0].appendChild(fileref)
                        storyContentContainer[id] = res;
                        deferred.resolve(res);

                    }, function (error) {
                            deferred.reject(error);
                        })
                } else {
                    deferred.resolve(storyContentContainer[id]);
                }
            }

            return promise;
        }
    };
}]);
zhdService.factory('themeService', function ($q, $http) {

    var resturl = {
        THEME_URL: 'http://news-at.zhihu.com/api/4/themes',
        THEME_DETAIL_URL: 'http://news-at.zhihu.com/api/4/theme'
    };
    var themelist = [];

    var getThemelist = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        if (themelist.length > 0) {
            deferred.resolve(themelist);
        } else {
            $http.get(resturl.THEME_URL).success(function (response) {
                var data = response.others;
                themelist = data;
                deferred.resolve(themelist);
            }).error(function (error) {
                deferred.reject(error);
            });
        }

        return promise;
    };

    var getThemedetail = function (id) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var url = resturl.THEME_DETAIL_URL+'/'+id;
        $http.get(url).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });

        return promise;
    };

    return {
        getThemelist: getThemelist,
        getThemedetail:getThemedetail
    }
})

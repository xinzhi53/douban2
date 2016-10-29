/**
 * Created by Alice on 16/10/23.
 */

(function () {
    var listModule = angular.module('doubanApp.listModule',['doubanApp.service']);
    listModule.controller('ListCtrl',['$scope','$http','JsonpService','$routeParams','$route','$rootScope',function ($scope,$http,JsonpService,$routeParams,$route,$rootScope) {

        //$scope.subjects = [{title:'七月与安生',rating:'7.8'},{title:'七月与安生',rating:'7.8'},{title:'七月与安生',rating:'7.8'},{title:'七月与安生',rating:'7.8'}];
        $scope.subjects = [];

        //给根作用域设置当前的分类信息,控制左侧三个分类按钮的选中
        // index.html中的数据不属于ListController的 $scope 管理,所有只能加到$rootScope上
        $rootScope.category = $routeParams.category;


        //计算分页
        var count = 10; //每页显示的数据
        /*
         start:0   count:10    1 page
         start:10   count:10    2
         start:20   count:10    3

         start = (page-1)*10
         */
        //获取当前的页码
        //console.log($routeParams.page);
        var currentPage = parseInt($routeParams.page || 1);
        $scope.currentPage = currentPage;
        //计算开始的位置
        var start = (currentPage-1)*count;


        ///v2/movie/in_theaters    /v2/movie/coming_soon   /v2/movie/top250
        JsonpService.jsonp('https://api.douban.com/v2/movie/'+$routeParams.category,{count:count,start:start},function (data) {

            $scope.subjects = data.subjects;


            //总得条数
            $scope.total = data.total;

            //共有多少
            $scope.totalPage = Math.ceil($scope.total / count);

            //告诉 angular 刷新界面上的数据
            //可以指定刷新特定的数据
            $scope.$apply();
            //$apply()不写的话刷新全局

            //console.log(data);

            //分页  改变是路由
            $scope.hundlePage = function (page) {
                if(page < 1 || page > $scope.totalPage) {
                    return;
                }
                $route.updateParams({page:page});
            }

            
        })

    }]);
    
})();
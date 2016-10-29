/**
 * Created by Alice on 16/10/24.
 */


(function () {
    var serviceModule = angular.module('doubanApp.service',[]);
    
    serviceModule.service('JsonpService',['$window',function ($window) {
        
        this.jsonp = function (url,params,fn) {
            //params  {count:12 , start:1}
            //https://api.douban.com/v2/movie/in_theaters?count=112&

            var queryString = '?';
            //1.拼接参数
            for(key in params) {
                //'?count=12&start='1'&callback=my_jsonp123456'
                queryString += key + '=' + params[key] + '&';
            }

            //2.生成函数名称
            //my_jsonp123456(json)
            var funname = 'my_jsonp' + new Date().getTime();
            queryString += 'callback' + '=' + funname;

            //3.挂载函数
            $window[funname] = function (data) {
                //alert(123);
                //成功之后调用的方法
                fn(data);
            }


            //4.添加 script 标签,加载数据
            var script = $window.document.createElement('script');
            script.src = url + queryString;
            $window.document.body.appendChild(script);
        }
        
    }]);

})();
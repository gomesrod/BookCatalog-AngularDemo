/**
 * App initialization
 */
(function () {
    angular.module("app", ["ngRoute"]);
    angular.module("app").controller('CatalogController', BookCatalogController.Controller);

    angular.module("app").filter('bookFilter', BookCatalogController.BookFilter);

    angular.module('app').value('server_url', 'http://127.0.0.1:8124');

    angular.module('app').factory('WebService', BookCatalogController.WebService);

    angular.module('app')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    redirectTo: "/books"
                })
                .when('/books', {
                    templateUrl: "template_list.html"
                })
                .when('/books/:bookId', {
                    templateUrl: "template_detail.html"
                })
                .otherwise({
                    templateUrl: "template_404.html"
                });
        });
})();
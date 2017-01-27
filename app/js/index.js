/**
 * App initialization
 */
(function () {
    angular.module("app", []);
    angular.module("app").controller('CatalogController', BookCatalogController.Controller);

    angular.module('app').value('url', 'http://127.0.0.1:8124');

    angular.module('app').factory('WebService', BookCatalogController.WebService);
})();
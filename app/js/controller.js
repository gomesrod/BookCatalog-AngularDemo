BookCatalogController = {
    /**
     * CatalogController
     */
    Controller: function($scope, WebService){
        WebService.listAll($scope);

        $scope.isListMode = true;

        $scope.showDetail = function(bookId) {
            WebService.findById($scope, bookId);
        };

        $scope.showList = function() {
           WebService.listAll($scope);
        };
    },

    /**
     * Provides a utility object to handle the calls to the Book Catalog webservice
     */
    WebService: function($http, url) {
        return {
            listAll: function($scope) {
                $http.get(url + "/books")
                    .success(function(data, status, headers, config){
                        $scope.books = data;
                        $scope.isListMode = true;
                    })
                    .error(function(data, status, headers, config) {
                        if (status == -1) {
                            $scope.errMessage = "Service Unavailable!";
                        } else {
                            $scope.errMessage = status + " " + data;
                        }                        
                    });
            },
            findById: function($scope, id) {
                $http.get(url + "/books/" + id)
                    .success(function(data, status, headers, config){
                        $scope.bookDetail = data;
                        $scope.isListMode = false;
                    })
                    .error(function(data, status, headers, config) {                       
                        if (status == -1) {
                            $scope.errMessage = "Service Unavailable!";
                        } else {
                            $scope.errMessage = status + " " + data;
                            alert($scope.errMessage);
                        }                        
                    });
            }
        };
    }
}

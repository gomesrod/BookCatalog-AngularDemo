BookCatalogController = {
    /**
     * CatalogController
     */
    Controller: function($scope, $location, $rootScope, $routeParams, WebService){
        console.log("BookCatalogController -- location: " + $location.absUrl())

        WebService.listAll($scope);

        $scope.isListMode = true;

        $rootScope.$on('$routeChangeSuccess', function(angularEvent,current,previous) {
            if (current.originalPath == "/books") {
                WebService.listAll($scope);
            } else if (current.originalPath == "/books/:bookId") {
                WebService.findById($scope, $routeParams.bookId);
            }

            // Clear the error message from previous requests
            $scope.errMessage = "";
        });

        // A custom search function for use with the filter
        // It compares all the properties to the search field, except for the
        // image base64 contents
        $scope.evaluateFilter = function(book, index, array) {
            console.log("FILTERIN " + $scope);
            console.log("FILTERING " + $scope.filterText);
            console.log("FILTERINB " + $scope.books);
            console.log(book.title + "    " + book.title.toUpperCase().indexOf($scope.filterText));
            return (!$scope.filterText) || 
                (book.title.toUpperCase().indexOf($scope.filterText) >= 0) || 
                (book.author.toUpperCase().indexOf($scope.filterText) >= 0) || 
                (book.genre.toUpperCase().indexOf($scope.filterText) >= 0) ;
        }
    },

    /**
     * Provides a utility object to handle the calls to the Book Catalog webservice
     */
    WebService: function($http, server_url) {
        return {
            listAll: function($scope) {
                $http.get(server_url + "/books")
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
                $http.get(server_url + "/books/" + id)
                    .success(function(data, status, headers, config){
                        $scope.bookDetail = data;
                        $scope.isListMode = false;
                    })
                    .error(function(data, status, headers, config) {                       
                        if (status == -1) {
                            $scope.errMessage = "Service Unavailable!";
                        } else {
                            $scope.errMessage = status + " " + data;
                        }                        
                    });
            }
        };
    }
}

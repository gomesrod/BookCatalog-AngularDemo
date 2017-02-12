BookCatalogController = {
    /**
     * List and Detail View controller
     */
    Controller: function($scope, $location, $rootScope, $routeParams, WebService){
        console.log("BookCatalogController -- location: " + $location.absUrl())

        WebService.listAll($scope);

        $rootScope.$on('$routeChangeSuccess', function(angularEvent,current,previous) {
            if (current.originalPath == "/books") {
                WebService.listAll()
                    .then(function(data){
                        $scope.books = data;
                    }, function(error){
                        $scope.errMessage = error;
                    });

            } else if (current.originalPath == "/books/:bookId") {
                WebService.findById($routeParams.bookId)
                    .then(function(data){
                        $scope.bookDetail = data;
                    }, function(error){
                        $scope.errMessage = error;
                    });;
            }

            // Clear the error message from previous requests
            $scope.errMessage = "";
        });
    },

    /**
     * List and Detail View controller
     */
    FormController: function($scope, WebService){
        $scope.openForm = function() {
            alert("laal");
        }
    },

    BookFilter: function() {
        return function(bookList, filterText) {
            if (!filterText) {
                return bookList;
            }

            filterText = filterText.toUpperCase();
            var filtered = [];

            bookList.forEach(function(book) {
                console.log(book.title);
                if ((book.title.toUpperCase().indexOf(filterText) >= 0) || 
                        (book.author.toUpperCase().indexOf(filterText) >= 0) || 
                        (book.genre.toUpperCase().indexOf(filterText) >= 0)) {
                    filtered.push(book);
                }
            });

            return filtered;
        }
    },

    /**
     * Provides a utility object to handle the calls to the Book Catalog webservice
     */
    WebService: function($http, $q, server_url) {
        webserviceObj = {
            listAll: function() {
                return webserviceObj._doGet(server_url + "/books");                
            },
            findById: function(id) {
                return webserviceObj._doGet(server_url + "/books/" + id);
            },

            _doGet: function(url) {
                return $http.get(url)
                    .then(function(response){
                        return response.data;
                    }, function(response){
                        console.log("Error on request to [" + url + "] : " + response.status);
                        if (response.status == -1) {
                            return $q.reject("Service Unavailable!");
                        } else {
                            return $q.reject(response.status + " " + response.data);
                        }
                });
            }
        };
        return webserviceObj;
    }
}

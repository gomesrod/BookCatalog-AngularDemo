/**
 * This is a simple server intended to support the Angular BookCatalog demo.
 * 
 * It is planned to require a minimal amount of setup. For this reason, no 
 * library is used, and we don't provide a serious persistence system.
 * 
 * All that is needed to run the server is Node.js itself.
 * 
 * $ node server.js
 */
var http = require("http");
var url = require("url");
var repository = require("./repository")

/**
 * Receives a request and performs basic routing by URL
 */
function handleRequest (request, response) {
    var pathname = url.parse(request.url).pathname;
    var method = request.method;
    console.log("Request [" + method + "] for " + pathname + " received.");
    
    response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8125");

    if (method == "GET" && (pathname == "/books" || pathname == "/books/")) {
        listAll(request, response);
    } else if (method == "GET" && (pathname.match("/books/[0-9]+"))) {
        findById(pathname.replace("/books/", ""), request, response);
    } else {
        error404(pathname, request, response);
    }
};

function listAll(request, response) { 
    var result = repository.listAll();

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(result));

    response.end();
};

function findById(id, request, response) {
    var result = repository.findById(id);

    if (result == null) {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write("Book with id [" + id + "] not found");
    } else {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(result));
    }

    response.end();
};

function error404 (pathname, request, response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write("Resouce not found: " + pathname);

    console.log("Resource not found: " + request.url + ". Error 404 is being generated");
    
    response.end();
};

var srv = http.createServer(handleRequest);
srv.listen(8124);
console.log('Server running at http://127.0.0.1:8124/');

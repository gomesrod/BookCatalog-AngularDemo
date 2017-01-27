/**
 * Implements a persistence system to support the Demo application.
 * 
 * The implementation is as simple as possible, based on serializing objects and storing
 * on disk.
 * 
 * Only create and read operations are supported (no updates).
 */
var fs = require("fs");

var self = module.exports = {
    datafile: "./data/angulardemo_server_dummyrepository.dat",

    listAll: function() {
        console.log("Entering repository::listAll");
        var result = self._loadData();
        return result;
    },
    
    findById: function(id) {
        var items = self._loadData();

        if (id > items.length) {
            return null;
        }

        index = id - 1;
        return items[index];
    },

    create: function(book) {
         var collection = self._loadData();
         var nextId = collection.length + 1;
         book.id = nextId;

         console.log("repository.js:: inserting a new record with ID " + book.id);

         collection.push(book);
         self._writeData(collection);
    },

    _loadData: function() {
        if (fs.existsSync(self.datafile)) {
            var datafileContents = fs.readFileSync(self.datafile);
            var records = JSON.parse(datafileContents);
            return records;
        } else {
            return [];
        }        
    },

    _writeData: function(collection) {
        var datafileContents = JSON.stringify(collection);
        fs.writeFileSync(self.datafile, datafileContents);
    }
};

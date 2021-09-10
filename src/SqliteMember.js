
function defineMember() {
    let dataMemberTypeName = "apogee.SqliteQueryMember";
    apogee.defineHardcodedDataMember(dataMemberTypeName,DATA_MEMBER_FUNCTION_BODY);
}

module.exports = {defineMember};

//this is the function body for out member
//we define the content in a global function (below)
const DATA_MEMBER_FUNCTION_BODY = `
return SqliteComponentModule.createQueryPromise(formResult);
`

//==========================
// This is common code that is referenced by the modules. Here we store this
// in a global location so we can call it. 
//==========================

function getDbConnection(options) {
    //I had a problem where electron would crash if I tried to open a non existent file. This tries to fix that.
    var fs = require('fs');
    
    //load file if it exists
    if((fs.existsSync(options.dbPath))||(options.createIfMissing)) {
        let sqlite3 = require('sqlite3');
        if(options.verboseOption) {
            sqlite3 = require('sqlite3').verbose();
        }
        else {
            sqlite3 = require('sqlite3');  
        }
        
        // open the database
        if(options.cached) {
             return new sqlite3.cached.Database(options.dbPath);
        }
        else {
            return new sqlite3.Database(options.dbPath);
        }
       
    }
    else { 
        throw new Error("DB file not found: " + options.dbPath);
    }
}

function createQueryPromise(options) {

    return new Promise( (resolve,reject) => {
        //validate inputs
        let queryType = options.queryType;
        if((queryType != "run")&&(queryType != "all")&&(queryType != "get")) {
            console.error("Invalid query type: " + queryType);
            resolve(apogeeutil.INVALID_VALUE);
            return;
        }
        
        let sql = options.sql;
        if(!sql) {
            //apogeeUserAlert("SQL missing!");
            resolve(apogeeutil.INVALID_VALUE);
            return;
        }
        
        let params = options.params;
        if(!params) params = [];
        
        if(!options.dbPath) {
            //apogeeUserAlert("Database path missing!");
            resolve(apogeeutil.INVALID_VALUE);
            return;
        }
    
        // open the database
        let db = getDbConnection(options);
        
        //run statement
        switch(queryType) {
            case "run":
                db.run(sql, params, (err, rows) => {
                    try {
                        if(err) {
                            reject(err);
                        }
                        else {
                            resolve("");
                        }
                    }
                    catch(error) {
                        if(error.stack) console.error(error.stack);
                        reject(error);
                    }
                });
                break;
                
            case "all":
                db.all(sql, params, (err, rows) => {
                    try {
                        if(err) {
                            reject(err);
                        }
                        else {
                            let data = [];
                            rows.forEach((row) => {
                                let entry = {};
                                for(let columnName in row) {
                                    entry[columnName] = row[columnName];
                                }
                                data.push(row);
                            });
                            resolve(data);
                        }
                    }
                    catch(error) {
                        if(error.stack) console.error(error.stack);
                        reject(error);
                    }
                });
                break;
        
            case "get":
                db.get(sql, params, (err, row) => {
                    try {
                        if(err) {
                            reject(err);
                        }
                        else {
                            let entry = {};
                            for(let columnName in row) {
                                entry[columnName] = row[columnName];
                            }
                            resolve(entry);
                        }
                    }
                    catch(error) {
                        if(error.stack) console.error(error.stack);
                        reject(error);
                    }
                });
                break;
        }
        
        // close the database connection
        db.close();
    })
}

let SqliteComponentModule = {};
SqliteComponentModule.createQueryPromise = createQueryPromise;

__globals__.SqliteComponentModule = SqliteComponentModule;


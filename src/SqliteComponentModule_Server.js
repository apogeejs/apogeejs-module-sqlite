
const SqliteComponentModule_Server = {
    initApogeeModule:  function() { 

        //initialize the member (in the server and the app)
        let SqliteMember = require("./SqliteMember.js");
        SqliteMember.defineMember();

        //if the user interface is present, define the cell and the cell view (only in the app)
        if(__globals__.apogeeapp) {
            let SqliteQueryCell = require("./SqliteQueryComponent.js");

            //These are in lieue of the import statements
            let componentInfo = apogeeapp.componentInfo;

            //-------------------------------
            //register the button component
            //-------------------------------
            componentInfo.registerComponent(SqliteQueryCell);
        }
    }
}

module.exports = SqliteComponentModule;
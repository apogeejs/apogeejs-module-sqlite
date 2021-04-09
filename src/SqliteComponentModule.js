
const SqliteComponentModule = {
    initApogeeModule:  function() { 

        //initialize the member (in the server and the app)
        let SqliteMember = require("./SqliteMember.js");
        SqliteMember.defineMember();

        //if the user interface is present, define the cell and the cell view (only in the app)
        if((__globals__.apogeeapp)&&(__globals__apogeeview)) {
            let SqliteQueryCell = require("./SqliteQueryComponent.js");
            let SqliteQueryCellView = require("./SqliteQueryComponentView.js");

            //These are in lieue of the import statements
            let componentInfo = apogeeapp.componentInfo;
            let registerComponentView = apogeeview.registerComponentView;

            //-------------------------------
            //register the button component
            //-------------------------------
            componentInfo.registerComponent(SqliteQueryCell);

            //-------------------------------
            //register the button component view
            //-------------------------------
            registerComponentView(SqliteQueryCellView);
        }
    }
}

module.exports = SqliteComponentModule;
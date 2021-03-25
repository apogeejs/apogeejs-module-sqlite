
const SqliteComponentModule = {
    initApogeeModule:  function() { 
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

module.exports = SqliteComponentModule;
//These are in lieue of the import statements
let {Component,getFormComponentDefaultMemberJson} = apogeeapp;

const SqliteQueryCellConfig = {
    componentClass: Component,
    displayName: "SQLite Query Cell",
    defaultMemberJson: getFormComponentDefaultMemberJson("apogee.SqliteQueryMember"),
    defaultComponentJson: {
        type: "apogeeapp.SqliteQueryCell"
    }
}

module.exports = SqliteQueryCellConfig;


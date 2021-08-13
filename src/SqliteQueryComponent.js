//These are in lieue of the import statements
let {Component,getFormComponentDefaultMemberJson} = apogeeapp;

/** This is a simple custom component example. */
class SqliteQueryCell extends Component {};

SqliteQueryCell.CLASS_CONFIG = {
    displayName: "SQLite Query Cell",
    defaultMemberJson: getFormComponentDefaultMemberJson("apogee.SqliteQueryMember"),
    defaultComponentJson: {
        type: "apogeeapp.SqliteQueryCell"
    }
}

module.exports = SqliteQueryCell;


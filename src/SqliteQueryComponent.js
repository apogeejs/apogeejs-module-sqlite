//These are in lieue of the import statements
let {Component,getFormComponentDefaultMemberJson} = apogeeapp;

/** This is a simple custom component example. */
class SqliteQueryCell extends Component {};

SqliteQueryCell.displayName = "SQLite Query Cell";
SqliteQueryCell.uniqueName = "apogeeapp.SqliteQueryCell";
SqliteQueryCell.DEFAULT_MEMBER_JSON = getFormComponentDefaultMemberJson("apogee.SqliteQueryMember");

module.exports = SqliteQueryCell;


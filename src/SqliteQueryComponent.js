//These are in lieue of the import statements
let {FormInputBaseComponent} = apogeeapp;

/** This is a simple custom component example. */
class SqliteQueryCell extends FormInputBaseComponent {
    constructor(member,modelManager,instanceToCopy,keepUpdatedFixed) {
        super(member,modelManager,instanceToCopy,keepUpdatedFixed);
    }
}

FormInputBaseComponent.initializeClass(SqliteQueryCell,"SQLite Query Cell","apogeeapp.SqliteQueryCell","apogee.SqliteQueryMember");

module.exports = SqliteQueryCell;


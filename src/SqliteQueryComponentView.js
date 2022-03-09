//These are in lieue of the import statements
let {FormInputBaseComponentView,getMemberDataTextViewModeEntry,getErrorViewModeEntry} = apogeeapp;

/** This is a graphing component using ChartJS. It consists of a single data member that is set to
 * hold the generated chart data. The input is configured with a form, which gives multiple options
 * for how to set the data. */
class SqliteQueryCellView extends FormInputBaseComponentView {

    //=================================
    // Implementation Methods
    //=================================

    /** This method returns the form layout.
     * @protected. */
    getFormLayout() {
        return [
            {
                type: "horizontalLayout",
                formData: [
                    {
                        type: "textField",
                        label: "Database Path: ",
                        size: 75,
                        key: "dbPath",
                        meta: {
                            expression: "choice",
                            expressionChoiceKey: "pathType"
                        }
                    },
                    {
                        type: "radioButtonGroup",
                        entries: [["Value","value"],["Reference","simple"]],
                        value: "value",
                        key: "pathType"
                    }
                ]
            },
            {
                type: "radioButtonGroup",
                label: "Query Type: ",
                entries: [["List Result","all"],["Single Result","get"],["No Result","run"]],
                vaklue: "all",
                key: "queryType"
            },
            {
                type: "horizontalLayout",
                formData: [
                    {
                        type: "textarea",
                        label: "SQL: ",
                        rows: 3,
                        cols: 75,
                        key: "sql",
                        meta: {
                            expression: "choice",
                            expressionChoiceKey: "sqlType"
                        }
                    },
                    {
                        type: "radioButtonGroup",
                        entries: [["Value","value"],["Reference","simple"]],
                        value: "value",
                        key: "sqlType"
                    }
                ]
            },
            {
                type: "horizontalLayout",
                formData: [
                    {
                        type: "textarea",
                        label: "Parameters: ",
                        rows: 3,
                        cols: 75,
                        key: "params",
                        meta: {
                            expression: "choice",
                            expressionChoiceKey: "parameterType"
                        }
                    },
                    {
                        type: "radioButtonGroup",
                        entries: [["Value","value"],["Reference","simple"]],
                        value: "value",
                        key: "parameterType"
                    }
                ]
            },
            {
                type: "showHideLayout",
                heading: "Options",
                closed: true,
                formData: [
                    {
                        type: "checkbox",
                        label: "Use Cached Connection: ",
                        value: "fa;se",
                        key: "cached"
                    },
                    {
                        type: "radioButtonGroup",
                        label: "File Open Type: ",
                        entries: [["Read/Write","readwrite"],["Read Only","read"]],
                        value: "readwrite",
                        key: "openType"
                    },
                    {
                        type: "checkbox",
                        label: "Verbose: ",
                        value: true,
                        key: "verbose"
                    },
                    {
                        type: "checkbox",
                        label: "Create DB If Not Present: ",
                        value: "false",
                        key: "createIfMissing"
                    },
                    {
                        type: "checkbox",
                        label: "Show success/failure dialog box",
                        value: false,
                        key: "resultDialog"

                    }
                ]
            }
        ]
    }
}

//===============================
// View Config
//===============================

const SqliteQueryCellViewConfig = {
    componentType: "apogeeapp.SqliteQueryCell",
    viewClass: SqliteQueryCellView,
    viewModes: [
        getErrorViewModeEntry(),
        getMemberDataTextViewModeEntry("member.data",{name:"Result",label:"Result",isActive:true,isReadOnly:true}),
        FormInputBaseComponentView.getConfigViewModeEntry(),
    ],
    iconResPath: "/icons3/genericCellIcon.png"
}

module.exports = SqliteQueryCellViewConfig;



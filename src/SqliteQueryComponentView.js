//These are in lieue of the import statements
let {FormInputBaseComponentView,HandsonGridEditor,AceTextEditor,StandardErrorDisplay,dataDisplayHelper} = apogeeview;

/** This is a graphing component using ChartJS. It consists of a single data table that is set to
 * hold the generated chart data. The input is configured with a form, which gives multiple options
 * for how to set the data. */
class SqliteQueryCellView extends FormInputBaseComponentView {

    constructor(appViewInterface,component) {
        super(appViewInterface,component);
    };

    //=================================
    // Implementation Methods
    //=================================

    /**  This method retrieves the table edit settings for this component instance
     * @protected */
    getTableEditSettings() {
        return SqliteQueryCellView.TABLE_EDIT_SETTINGS;
    }

    /** This method should be implemented to retrieve a data display of the give type. 
     * @protected. */
    getDataDisplay(displayContainer,viewType) {
        let dataDisplaySource;
        switch(viewType) {

            case SqliteQueryCellView.VIEW_DATA:
                //figure out if we want a grid or plain json
                let formResultMember = this.getComponent().getField("member.formResult");
                let formResultData = formResultMember.getData();
                let useMapsFormat = false;
                if(formResultData) {
                    useMapsFormat = (formResultData.outputFormat == "maps");
                }

                dataDisplaySource = this._getBodyDataSource(useMapsFormat);
                if(useMapsFormat) {
                    return new AceTextEditor(displayContainer,dataDisplaySource,"ace/mode/json",AceTextEditor.OPTION_SET_DISPLAY_SOME);
                }
                else {
                    return new HandsonGridEditor(displayContainer,dataDisplaySource);
                }

            case SqliteQueryCellView.VIEW_INPUT:
                return this.getFormDataDisplay(displayContainer);

            case FormInputBaseComponentView.VIEW_INFO: 
                dataDisplaySource = dataDisplayHelper.getStandardErrorDataSource(this.getApp(),this);
                return new StandardErrorDisplay(displayContainer,dataDisplaySource);

            default:
                console.error("unrecognized view element: " + viewType);
                return null;
        }
    }

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
                    }
                ]
            }
        ]
    }

    //==========================
    // Private Methods
    //==========================

    _getBodyDataSource(useMapsFormat) {
        return {
            doUpdate: () => {
                //return value is whether or not the data display needs to be udpated
                let reloadData = this.getComponent().isMemberDataUpdated("member.data");
                //we only need to reload if the output format changes, but for now we will reload for any input change 
                let reloadDataDisplay = this.getComponent().isMemberDataUpdated("member.formData");
                return {reloadData,reloadDataDisplay};
            },
    
            getData: () => {
                //here we need to extract data from the member so we return
                //the starndard wrapped data for the non-normal case and 
                //extract the proper data for the normal case, returning
                //unwrapped data in that case.
                let allDataMember = this.getComponent().getField("member.data");
				if(allDataMember.getState() != apogeeutil.STATE_NORMAL) {
					return dataDisplayHelper.getStandardWrappedMemberData(allDataMember);
				}
				else {
					let allData = allDataMember.getData();
					if(allData != apogeeutil.INVALID_VALUE) {
                        let bodyData = allData.body;
                        if(useMapsFormat) {
                            if(!bodyData) bodyData = [];
                            //return text for text editor
                            return JSON.stringify(bodyData,null,JSON_TEXT_FORMAT_STRING);
                        }
                        else {
                            //return json for grid editor
                            if(!bodyData) bodyData = [[]];
                            return bodyData;
                        }
					}
					else {
						return apogeeutil.INVALID_VALUE
					}
				}
            }
        }
    }

    _getHeaderDataSource() {
        return {
            doUpdate: () => {
                //return value is whether or not the data display needs to be udpated
                let reloadData = this.getComponent().isMemberDataUpdated("member.data");
                //we only need to reload if the output format changes, but for now we will reload for any input change 
                let reloadDataDisplay = this.getComponent().isMemberDataUpdated("member.formData");
                return {reloadData,reloadDataDisplay};
            },
    
            getData: () => {
                //here we need to extract data from the member so we return
                //the starndard wrapped data for the non-normal case and 
                //extract the proper data for the normal case, returning
                //unwrapped data in that case.
                let allDataMember = this.getComponent().getField("member.data");
				if(allDataMember.getState() != apogeeutil.STATE_NORMAL) {
					return dataDisplayHelper.getStandardWrappedMemberData(allDataMember);
				}
				else {
					let allData = allDataMember.getData();
					if(allData != apogeeutil.INVALID_VALUE) {
                        let header = allData.header;
                        if(header) {
                            return [header]
                        }
                        else {
                            return []
                        }
					}
					else {
						return apogeeutil.INVALID_VALUE
					}
				}
            }
        }
    }

}

//======================================
// Static properties
//======================================

//===================================
// View Definitions Constants (referenced internally)
//==================================

SqliteQueryCellView.VIEW_DATA = "Result";

SqliteQueryCellView.VIEW_MODES = [
    FormInputBaseComponentView.VIEW_INFO_MODE_ENTRY,
    {name: SqliteQueryCellView.VIEW_DATA, label: "Result", isActive: true},
    FormInputBaseComponentView.INPUT_VIEW_MODE_INFO
];

SqliteQueryCellView.TABLE_EDIT_SETTINGS = {
    "viewModes": SqliteQueryCellView.VIEW_MODES
}


//===============================
// Required External Settings
//===============================

/** This is the component name with which this view is associated. */
SqliteQueryCellView.componentName = "apogeeapp.SqliteQueryCell";

/** If true, this indicates the component has a tab entry */
SqliteQueryCellView.hasTabEntry = false;
/** If true, this indicates the component has an entry appearing on the parent tab */
SqliteQueryCellView.hasChildEntry = true;

/** This is the icon url for the component. */
SqliteQueryCellView.ICON_RES_PATH = "/icons3/genericCellIcon.png";


module.exports = SqliteQueryCellView;



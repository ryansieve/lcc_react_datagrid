import React from 'react';
import ReactDOM from "react-dom";
import LCC from 'lightning-container';
import ReactDataGrid from "react-data-grid";
import {Input} from '@salesforce/design-system-react'
import {IconSettings} from '@salesforce/design-system-react'

class sfInput extends React.Component {

    constructor(props) {

        super(props);
        this.state = { value: props.value,
            type: props.column.type || 'text',
            row: props.rowData,
            fieldName: props.column.key
        };
        this.getValue = this.getValue.bind(this)
        this.handleChangeComplete = this.handleChangeComplete.bind(this)
        this.getInputNode = this.getInputNode.bind(this)
    }

    getValue() {
        let val = {}
        val[this.state.fieldName] = this.state.value
        return val;
    }

    handleChangeComplete(input){
        this.setState({ value: input.target.value });
    };

    getInputNode() {
        return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
    }

    render() {
        return (
            <IconSettings iconPath="/slds/icons">
                <Input id="base-id" placeholder="Enter value"
                       value={this.state.value}
                       type={this.state.type}
                       onChange={this.handleChangeComplete}/>
            </IconSettings>
        );
    }
}


const columns = [
    { key: "LineNumber", name: "Line Number", resizable: true},
    { key: "Product2Name", name: "Product", resizable: true },
    { key: "Quantity", name: "Quantity", resizable: true, type: 'number', editor: sfInput},
    { key: "UnitPrice", name: "Unit Price", resizable: true},
    { key: "TotalPrice", name: "Total Price", resizable: true },
];

class App extends React.Component {

    constructor(props) {
        debugger
        super(props);
        this.state = {
            filters: [],
            rows: props.rows,
            expandedRows: []
        }
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        debugger
        this.setState(state => {
            const rows = state.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
                if(updated.hasOwnProperty('Quantity')){
                    rows[i].TotalPrice = rows[i].Quantity * rows[i].UnitPrice
                }
                console.log('line state change', rows[i])
                //Send the changed row data back to the host Lightning Container Component
                //This can be modified to include related parent/child lines or other supporting information
                let msg = {
                    sObjectName: 'QuoteLineItem',
                    row: rows[i]
                }

                LCC.sendMessage(msg);
            }
            return { rows };
        });
    };

    getSubRowDetails = expandedRows => rowItem => {

        const isExpanded = expandedRows[rowItem.Id]
            ? expandedRows[rowItem.Id]
            : false;
        return {
            group: rowItem._children && rowItem._children.length > 0,
            expanded: isExpanded,
            children: rowItem._children,
            field: "LineNumber",
            treeDepth: rowItem.treeDepth || 0,
            siblingIndex: rowItem.siblingIndex,
            numberSiblings: rowItem.numberSiblings
        };
    };

    onCellExpand = args => ({ rows, expandedRows }) => {
        const rowKey = args.rowData.Id;
        const rowIndex = rows.indexOf(args.rowData);
        const subRows = args.expandArgs.children;
        if (expandedRows && !expandedRows[rowKey]) {
            expandedRows[rowKey] = true;
            this.updateSubRowDetails(subRows, args.rowData.treeDepth);
            rows.splice(rowIndex + 1, 0, ...subRows);
        } else if (expandedRows[rowKey]) {
            expandedRows[rowKey] = false;
            rows.splice(rowIndex + 1, subRows.length);
        }
        return { expandedRows, rows };
    };

    updateSubRowDetails(subRows, parentTreeDepth) {
        debugger
        const treeDepth = parentTreeDepth || 0;
        subRows.forEach((sr, i) => {
            sr.treeDepth = treeDepth + 1;
            sr.siblingIndex = i;
            sr.numberSiblings = subRows.length;
        });
    }

    render() {
        return (
            <div>
                <ReactDataGrid
                    columns={columns}
                    rowGetter={i => this.state.rows[i]}
                    rowsCount={this.state.rows.length}
                    onGridRowsUpdated={this.onGridRowsUpdated}
                    getSubRowDetails={this.getSubRowDetails(this.state.expandedRows)}
                    onCellExpand={args => this.setState(this.onCellExpand(args))}
                    enableCellSelect={true}
                />
            </div>
        );
    }
}

export default App;
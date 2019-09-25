/**
 * Created by rsieve on 2019-09-13.
 */

import {LightningElement, api} from 'lwc';

export default class RecordEditModal extends LightningElement {
    @api fields
    @api objectname
    @api recordid
    @api density = 'auto'
    @api mode = 'edit'
    @api columns
    handlecancel(event){
    debugger;
        const closeEvent = new CustomEvent('modalclose',
            {
                rowState: {
                    Quantity: '2'
                }
            });
        this.dispatchEvent(closeEvent);
    }
    handlesubmit(event){
    debugger;
        const closeEvent = new CustomEvent('modalclose',
            {
                rowState: {
                    Quantity: '2'
                }
            });
        this.dispatchEvent(closeEvent);
    }
    handlesuccess(event){
    debugger;
        const closeEvent = new CustomEvent('modalclose',
            {
                rowState: {
                    Quantity: '2'
                }
            });
        this.dispatchEvent(closeEvent);
    }
}
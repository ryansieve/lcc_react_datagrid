/**
 * Created by rsieve on 2019-09-25.
 */

import {LightningElement, api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CpqButtonBar extends NavigationMixin(LightningElement) {

    @api quote
    //todo - make choices about which buttons to show based on the quote and line details

    handleQuickSave(event){
    debugger
        console.log('quote save', this.quote.details)
    }

    handleCancel(event){
        event.preventDefault();
        event.stopPropagation();
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                recordId: this.quote.Id,
                objectApiName: 'Quote', // objectApiName is optional
                actionName: 'view'
            }
        });
    }
}
/**
 * Created by rsieve on 2019-09-12.
 */

import {LightningElement, api} from 'lwc';

export default class QuoteFieldEditor extends LightningElement {

    //todo - inherit order and editability of which fields to show in the editor
    @api fields = [
        {
            fieldName: 'QuoteNumber',
            editable: false
        },
        {
            fieldName: 'OpportunityId',
            editable: true
        },
        {
            fieldName: 'Name',
            editable: true
        },
        {
            fieldName: 'Status',
            editable: true
        }

    ]
    @api quote


    get quoteId(){
        return this.quote.id || this.quote.Id
    }

    handleChange(event){
        debugger
        const stateChangeEvent = new CustomEvent('statechange', {
                detail:{
                    fieldName: event.srcElement.fieldName,
                    sObjectName: 'Quote',
                    value: event.detail.value
                }
            });
        this.dispatchEvent(stateChangeEvent)

    }
}
/**
 * Created by rsieve on 2019-09-13.
 */

import {LightningElement, api} from 'lwc';


export default class LineEditorGrid extends LightningElement {

    @api quote
    @api quoteLineItems
    @api rowOffset = 0
    @api columns

    handleCellChange(event){
        const stateChangeEvent = new CustomEvent('cellstatechange', {
            detail:{
                rowkey: event.detail.draftValues[0].ExtId__c,
                draftValues: event.detail.draftValues[0],
                sObjectName: 'QuoteLineItem'
            }
        });
        this.dispatchEvent(stateChangeEvent)
    }
}
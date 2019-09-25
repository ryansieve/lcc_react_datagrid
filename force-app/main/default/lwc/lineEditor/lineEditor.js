/**
 * Created by rsieve on 2019-09-11.
 */

import {LightningElement, track, api, wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { uuidv4 } from 'c/uuid';
import { handleLineStateChange } from 'c/quoteLineHandler'
import { handleQuoteStateChange } from 'c/quoteHandler'
import fetchLineItems from '@salesforce/apex/LineEditorCon.fetchLineItems';
import fetchGridColumns from '@salesforce/apex/GridUtils.fetchGridColumns';


const QUOTEFIELDS = [
    'Quote.Name',
    'Quote.Status',
    'Quote.QuoteNumber',
    'Quote.GrandTotal',
    'Quote.TotalPrice',
    'Quote.Pricebook2Id',
    'Quote.CurrencyIsoCode',
    'Quote.OpportunityId',
    'Quote.ExpirationDate',
    'Quote.LineItemCount'
]


export default class LineEditor extends LightningElement {

    @api recordId
    @track quote
    @track quoteLineItems
    @track mQuoteLineItems
    @track columns

    @wire(getRecord, {recordId: '$recordId', fields: QUOTEFIELDS})
    wiredQuote({error, data}){
        //debugger
        if(data){
            console.log('quote', data)
            //todo - use lodash for the deepclone
            this.quote = JSON.parse(JSON.stringify(data))
        }else if(error){
            //todo - toast
            this.quote = undefined;
        }
    }

    async connectedCallback(){
        await this.initData()
    }

    initData(){
        return new Promise( (resolve, reject) => {
            Promise.all([
                fetchLineItems({quoteId: this.recordId}),
                fetchGridColumns({sObjectName: 'QuoteLineItem', fieldSetName: 'LineEditor'})])
                .then( res => {
                    //debugger
                    this.mQuoteLineItems = new Map()
                    for(let qli of res[0]){
                        if(!qli.ExtId__c){
                            qli.ExtId__c = uuidv4()
                        }
                        //hard-coding path mapping for POC...
                        qli.Id = '/' + qli.Id
                        qli['Product2.Name'] = qli.Product2.Name
                        qli.Product2Id = '/' + qli.Product2Id

                        this.mQuoteLineItems.set(qli.ExtId__c, qli)
                    }
                    this.quoteLineItems = Array.from(this.mQuoteLineItems.values())
                    this.columns = res[1]
                    resolve()
                })
                .catch( err => {
                    //todo - toast
                    reject()
                })
        })

    }

    handleStateChange(event){
        switch(event.detail.sObjectName){
            case 'Quote':
                handleQuoteStateChange(event, this.quote, this.mQuoteLineItems)
                break
            case 'QuoteLineItem':
                handleLineStateChange(event, this.quote, this.mQuoteLineItems)
                break
            default:
                console.log('unexpected state change...' + event.detail.sObjectName)
        }
    }
}
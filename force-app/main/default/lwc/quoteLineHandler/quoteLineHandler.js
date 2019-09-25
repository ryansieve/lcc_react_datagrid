/**
 * Created by rsieve on 2019-09-16.
 */

export function handleLineStateChange(event, quote, mQuoteLineItems){

    for(let draftValue in event.detail.draftValues){
        mQuoteLineItems.get(event.detail.rowkey)[draftValue] = event.detail.draftValues[draftValue]
        if(draftValue == 'Quantity'){
            mQuoteLineItems.get(event.detail.rowkey).Subtotal = mQuoteLineItems.get(event.detail.rowkey).Quantity * mQuoteLineItems.get(event.detail.rowkey).ListPrice
            mQuoteLineItems.get(event.detail.rowkey).TotalPrice = mQuoteLineItems.get(event.detail.rowkey).Quantity * mQuoteLineItems.get(event.detail.rowkey).ListPrice
        }
    }

    //Sum line totals on-the-fly and update Quote.TotalPrice
    let quoteTotal = 0
    for(let key of mQuoteLineItems.keys()){
        quoteTotal += mQuoteLineItems.get(key).TotalPrice
    }
    quote.fields.TotalPrice.value = quoteTotal
    quote.fields.TotalPrice.displayValue = quote.fields.CurrencyIsoCode.value + ' ' + quoteTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
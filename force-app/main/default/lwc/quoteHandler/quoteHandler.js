/**
 * Created by rsieve on 2019-09-16.
 */

export function handleQuoteStateChange(event, quote, mQuoteLineItems){
    quote.fields[event.detail.fieldName].value = event.detail.value
}
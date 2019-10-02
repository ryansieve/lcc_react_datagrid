/**
 * Created by rsieve on 2019-09-23.
 */

({

    init: function(component, event, helper){
        Promise.all([
            helper.fetchQuoteDetail(component, event, helper),
            helper.fetchQuoteLines(component, event, helper)
        ])
            .then( res => {
                component.set('v.quote', res[0]);
                component.set('v.quoteLineItems', res[1]);

                component.set('v.renderQuote', true);
                var lccDataGridReact = component.find('lccDataGridReact');
                lccDataGridReact.lineInit(res[1]);


            })
    },

    handleStateChange: function(component, event, helper){

        //EXAMPLE INVOKE SERVICE COMPONENT
        var svcs = component.find('quoteUtils');

        var sObjectName = event.getParam('sObjectName')
        if(sObjectName == 'Quote'){
            var quote = component.get('v.quote');
            quote[event.getParam('fieldName')] = event.getParam('value');
            component.set('v.quote', quote);
        }else if(sObjectName == 'QuoteLineItem'){
            //debugger
            var quoteLine = event.getParam('row')
            var quote = component.get('v.quote');
            var mQuoteLineItems = component.get('v.mQuoteLineItems');

            if(mQuoteLineItems.hasOwnProperty(quoteLine.Id)){
                var prevTotalPrice = mQuoteLineItems[quoteLine.Id].TotalPrice;
                var diff = quoteLine.TotalPrice - prevTotalPrice;
                quote.TotalPrice += diff;


                svcs.beforeCalculate(quote, Object.values(mQuoteLineItems));

                svcs.afterCalculate(quote, Object.values(mQuoteLineItems));

                component.set('v.quote', quote);
                component.set('v.mQuoteLineItems', mQuoteLineItems);
                component.set('v.quoteLineItems', Object.values(mQuoteLineItems));


            }
        }
    }
});
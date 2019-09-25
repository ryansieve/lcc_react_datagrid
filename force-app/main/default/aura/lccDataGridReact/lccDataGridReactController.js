({
    handleMessage: function (component, event, helper) {

        var message = event.getParams();
        var gridEvent = component.getEvent("gridEvent");
        gridEvent.setParams({
            sObjectName : message.payload.sObjectName,
            row: message.payload.row
        });
        gridEvent.fire();
    },

    handleError: function (component, event, helper) {
        var error = event.getParams();
        console.log('event error', error);
    },

    sendToJSApp: function (component, event, helper) {

        var message = {
            name: "General",
            rows: component.get('v.quoteLineItems')
        };
        // setTimeout(function(){ component.find("jsApp").message(message); }, 3000);

        component.find("jsApp").message(message);

    },

    initQuoteLines: function(component, event, helper){

        var params = event.getParam('arguments');
        if(params){
            var qlis = params.qlis
            var message = {
                name: "QuoteLineItems",
                rows: qlis
            };
            component.set('v.quoteLineItems', qlis);
            component.find("jsApp").message(message);
        }

    }


})
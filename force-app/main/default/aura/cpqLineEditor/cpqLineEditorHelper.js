/**
 * Created by rsieve on 2019-09-23.
 */

({
    fetchQuoteDetail: function(component, event, helper) {
        return new Promise( (resolve, reject) => {
            //debugger
            var action = component.get("c.fetchQuote");
            action.setParams({quoteId: component.get('v.recordId')});
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    // console.log('quote', JSON.stringify(response.getReturnValue()));

                    resolve(response.getReturnValue());

                } else if (state === "INCOMPLETE") {
                    // do something
                } else if (state === "ERROR") {
                    debugger
                    reject()
                }
            });
            $A.enqueueAction(action);
        })

    },
    fetchQuoteLines: function(component, event, helper) {
        return new Promise( (resolve, reject) => {
            //debugger
            var action = component.get("c.fetchLineItems");
            action.setParams({quoteId: component.get('v.recordId')});
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {


                    var lines = response.getReturnValue();
                    var roots = {};
                    var parentMap = {};
                    var lineMap = {};
                    for(var i=0, count = lines.length; i<count; i++){
                        if(lines[i].RequiredBy__c){
                            parentMap[lines[i].Id] = lines[i].RequiredBy__c;
                        }
                        lines[i].Product2Name = lines[i].Product2.Name
                        lineMap[lines[i].Id] = lines[i];
                    }

                    for(var i=0, count = lines.length; i<count; i++){
                        if(lines[i].RequiredBy__c){
                            if(lineMap[lines[i].RequiredBy__c]._children){
                                lineMap[lines[i].RequiredBy__c]._children.push(lines[i]);
                            }else{
                                lineMap[lines[i].RequiredBy__c]._children = [lines[i]];
                            }
                        }else{
                            roots[lines[i].Id] = lines[i];
                        }
                    }
                    component.set('v.mQuoteLineItems', lineMap);
                    //console.log('quoteLineItems', JSON.stringify(Object.values(roots)));
                    resolve(Object.values(roots));

                } else if (state === "INCOMPLETE") {
                    // do something
                } else if (state === "ERROR") {
                debugger
                    reject()
                }
            });
            $A.enqueueAction(action);
        })

    },
});
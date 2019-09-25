/**
 * Created by rsieve on 2019-09-19.
 */

({
    fetchLineItems: function(component, helper) {
        return new Promise( (resolve, reject) => {
            var action = component.get("c.fetchLineItems");
            action.setParams({ quoteId : "" });
            action.setCallback(this, function(response) {
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

                    resolve(Object.values(roots));
                    
                }
                else if (state === "INCOMPLETE") {
                    // do something
                }
                else if (state === "ERROR") {
                    reject(response.getError());
                }
            });
            $A.enqueueAction(action);
        })
    }
});
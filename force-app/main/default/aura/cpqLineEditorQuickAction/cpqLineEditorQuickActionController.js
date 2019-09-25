/**
 * Created by rsieve on 2019-09-24.
 */

({
    navigateToMyComponent : function(component, event, helper) {
        window.setTimeout(
            $A.getCallback(function() {
                $A.get("e.force:closeQuickAction").fire();
            }),100
        );
        var quoteRecordId = component.get("v.recordId");
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:cpqLineEditor",
            componentAttributes: {
                recordId : quoteRecordId
            }
        });
        evt.fire();
    }
});
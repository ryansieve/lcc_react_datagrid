/**
 * Created by rsieve on 2019-09-19.
 */

global with sharing class ReactDataGridCon {
    @AuraEnabled
    global static List<QuoteLineItem> fetchLineItems(string quoteId){
        Schema.DescribeSObjectResult sObjDescribe = QuoteLineItem.getSobjectType().getDescribe();
        //todo - querying all fields now - make selective...
        list<string> fields = new List<string>(sObjDescribe.fields.getMap().keySet());
        fields.add('product2.name');
        string query = 'SELECT ';
        query += string.join(fields, ',');
        query += ' FROM QuoteLineItem';
        //query += ' WHERE QuoteId = \'' + quoteId + '\'';
        query += ' ORDER BY LineNumber';
        system.debug(query);
        return (List<QuoteLineItem>)Database.query(query);
    }
}
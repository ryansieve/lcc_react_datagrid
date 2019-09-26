/**
 * Created by rsieve on 2019-09-23.
 */

public with sharing class LineEditorCon {

    @AuraEnabled(cacheable = true)
    public static Quote fetchQuote(Id quoteId){
        Schema.DescribeSObjectResult sObjDescribe = Quote.getSobjectType().getDescribe();
        //todo - querying all fields now - make selective...
        list<string> fields = new List<string>(sObjDescribe.fields.getMap().keySet());
        string query = 'SELECT ';
        query += string.join(fields, ',');
        query += ' FROM Quote';
        query += ' WHERE Id = \'' + quoteId + '\'';
        system.debug(query);
        return (Quote)Database.query(query);
    }

    @AuraEnabled(cacheable = true)
    public static List<QuoteLineItem> fetchLineItems(Id quoteId){
        Schema.DescribeSObjectResult sObjDescribe = QuoteLineItem.getSobjectType().getDescribe();
        //todo - querying all fields now - make selective...
        list<string> fields = new List<string>(sObjDescribe.fields.getMap().keySet());
        fields.add('product2.name');
        string query = 'SELECT ';
        query += string.join(fields, ',');
        query += ' FROM QuoteLineItem';
        query += ' WHERE QuoteId = \'' + quoteId + '\'';
        query += ' ORDER BY LineNumber';
        system.debug(query);
        return (List<QuoteLineItem>)Database.query(query);
    }

}
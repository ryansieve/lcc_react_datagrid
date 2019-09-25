/**
 * Created by rsieve on 2019-09-23.
 */

public with sharing class GridUtils {
    public static map<string, string> gridTypes = new map<string, string>{
            'STRING'        => 'text',
            'TEXTAREA'      => 'text',
            'DOUBLE'        => 'number',
            'INTEGER'       => 'number',
            'REFERENCE'     => 'url',
            'URL'           => 'url',
            'DATETIME'      => 'date',
            'PICKLIST'      => 'text',
            'BOOLEAN'       => 'boolean',
            'DATE'          => 'date',
            'DATETIME'      => 'datetime',
            'EMAIL'         => 'email',
            'CURRENCY'      => 'currency',
            'PHONE'         => 'phone',
            'PERCENT'       => 'number'



    };

    @AuraEnabled
    public static Object fetchGridColumns(string sObjectName, string fieldSetName){
        system.debug(sObjectName);
        system.debug(fieldSetName);


        Schema.DescribeSObjectResult sObjDescribe = Schema.getGlobalDescribe().get(sObjectName).getDescribe();
        Schema.FieldSet fieldSet = sObjDescribe.fieldSets.getMap().get(fieldSetName.toLowerCase());
        map<string, Schema.SObjectField> mFields = sObjDescribe.fields.getMap();

        system.debug(fieldset);

        List<map<string, Object>> colConfig = new List<map<string, Object>>();
        for(Schema.FieldSetMember fsm : fieldSet.fields){

            if(mFields.containsKey(fsm.getFieldPath().toLowerCase())){
                Schema.DescribeFieldResult fieldDescribe = mFields.get(fsm.getFieldPath()).getDescribe();
                if(fieldDescribe.isNameField()){
                    map<string, Object> mCol = new map<string, Object>();
                    mCol.put('label', fsm.getLabel());
                    mCol.put('fieldName', 'Id');
                    system.debug(fsm.type.name());
                    mCol.put('type', 'url');
                    map<string, Object> iAttr = new map<string, Object>();
                    iAttr.put('label', new map<string, string>{'fieldName' => fsm.getFieldPath()});
                    iAttr.put('target', '_blank');
                    mCol.put('typeAttributes', iAttr);
                    if(fieldDescribe.isUpdateable()){
                        mCol.put('editable', true);
                    }
                    colConfig.add(mCol);
                }else{
                    map<string, Object> mCol = new map<string, Object>();
                    mCol.put('label', fsm.getLabel());
                    mCol.put('fieldName', fsm.getFieldPath());
                    system.debug(fsm.type.name());
                    mCol.put('type', GridUtils.gridTypes.get(fsm.type.name()));
                    if(mCol.get('type') == 'url'){
                        map<string, Object> iAttr = new map<string, Object>();
                        //iAttr.put('label', new map<string, string>{'fieldName' => fsm.getFieldPath().replace('__c','__r.Name')});
                        if(fieldDescribe.isCustom() || fsm.getFieldPath().right(3) == '__c'){
                            iAttr.put('label', new map<string, string>{'fieldName' => fsm.getFieldPath().replace('__c', '__r') + '.Name'});
                        }else{
                            iAttr.put('label', new map<string, string>{'fieldName' => fsm.getFieldPath().left(fsm.getFieldPath().length() - 2) + '.Name'});
                        }
                        iAttr.put('target', '_blank');
                        mCol.put('typeAttributes', iAttr);
                    }
                    if(fieldDescribe.isUpdateable()){
                        mCol.put('editable', true);
                    }
                    colConfig.add(mCol);
                }
            }
            else{
                map<string, Object> mCol = new map<string, Object>();
                mCol.put('label', fsm.getLabel());
                mCol.put('fieldName', fsm.getFieldPath());
                system.debug(fsm.type.name());
                mCol.put('type', GridUtils.gridTypes.get(fsm.type.name()));
                if(mCol.get('type') == 'url'){
                    map<string, Object> iAttr = new map<string, Object>();
                    iAttr.put('label', new map<string, string>{'fieldName' => fsm.getFieldPath().replace('__c','__r.Name')});
                    iAttr.put('target', '_blank');
                    mCol.put('typeAttributes', iAttr);
                }
                colConfig.add(mCol);
            }


        }
        system.debug(JSON.serialize(colConfig));
        return colConfig;
    }
}
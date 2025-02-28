public with sharing class AccountController {
    @AuraEnabled
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, Industry, Phone, Rating 
                FROM Account 
                WHERE Rating = 'Hot' 
                LIMIT 10];
    }
}
public class ContactHandler {

    @AuraEnabled
    public static Contact updateContactDetails(Id contactId, String firstName, String lastName, String email, String phone) {
        Contact con = new Contact(Id = contactId);
        con.FirstName = firstName;
        con.LastName = lastName;
        con.Email = email;
        con.Phone = phone;
        update con;
        return con; // Return the updated Contact record
    }

    @AuraEnabled(cacheable=true) // Add caching for better performance
    public static Contact getContactDetails(Id contactId) {
        return [SELECT FirstName, LastName, Email, Phone FROM Contact WHERE Id = :contactId];
    }
}
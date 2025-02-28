public with sharing class ToDoListHandler {

    // Method to fetch tasks from Salesforce
    @AuraEnabled(cacheable=true)
    public static List<Task> getTasks() {
        return [SELECT Id, Subject FROM Task WHERE Subject != NULL ORDER BY CreatedDate DESC];
    }

    // Method to create a new task
    @AuraEnabled
    public static void createTask(String taskSubject) {
        Task newTask = new Task(Subject = taskSubject);
        insert newTask;
    }

    // Method to delete a task
    @AuraEnabled
    public static void deleteTask(Id taskId) {
        Task taskToDelete = [SELECT Id FROM Task WHERE Id = :taskId LIMIT 1];
        delete taskToDelete;
    }
}
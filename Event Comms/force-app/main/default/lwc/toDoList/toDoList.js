import { LightningElement , track,wire} from 'lwc';
import createTask from '@salesforce/apex/ToDoListHandler.createTask';
import getTasks from '@salesforce/apex/ToDoListHandler.getTasks';
import deleteTask from '@salesforce/apex/ToDoListHandler.deleteTask';
import {refreshApex} from '@salesforce/apex';

export default class ToDoListApp extends LightningElement {
    taskText = '';  //  holds the input text for the task
    @track tasks = [];
    taskList;    //  holds the list of tasks
    @wire(getTasks)
    wiredTaskList(result) {
        this.taskList = result;
        if (result.data) {
            this.tasks = result.data;
        }
        else if (result.error) {
            console.log(result.error);
        }
    }

    // Load tasks when the component is initialized
    /*connectedCallback() {
        this.loadTasks();
    }*/

    // Handle changes in the input field
    handleInputChange(event) {
        this.taskText = event.target.value;
    }

    // Add a new task to Salesforce
    handleAddTask() {
        if (this.taskText) {
            createTask({ taskSubject: this.taskText })
                .then(() => {
                   // this.loadTasks();  // Reload the tasks after adding a new task
                   console.log('task created');
                   return refreshApex(this.taskList);
                })
                .catch(error => {
                    console.error('Error adding task:', error);
                });
        }
        this.taskText = '';  // Reset the input fields
    }

    // Delete a task from Salesforce
    handleDeleteTask(event) {
        const taskId = event.target.dataset.id;  // Get the task ID from the data-id 
        deleteTask({ taskId })  // Call the Apex method to delete the task
            .then(() => {
                //this.loadTasks();  // Reload the tasks after deletion
                console.log('task deleted');
                return refreshApex(this.taskList);
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    }

    // Fetch all tasks from Salesforce
    /*loadTasks() {
        getTasks()
            .then(result => {
                this.tasks = result;  // Update the tasks array
            })
            .catch(error => {
                console.error('Error loading tasks:', error);
            });
    }*/
}
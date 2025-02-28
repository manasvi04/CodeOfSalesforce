import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name', type: 'text' },
    { label: 'Industry', fieldName: 'Industry', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];

export default class AccountDatatable extends LightningElement {
    @track accounts = [];
    @track error;
    @track isAccountsVisible = false;  // Track the visibility that account is visisble or not
    columns = COLUMNS;
    buttonLabel = 'Fetch Accounts';  // Button label 

    fetchAccounts() {
        if (this.isAccountsVisible) {
            // If accounts are already visible, hide them
            this.isAccountsVisible = false;
            this.buttonLabel = 'Fetch Accounts';  // Change button label
        } else {
            // Fetch accounts and display them
            getAccounts()
                .then(result => {
                    this.accounts = result;
                    this.error = undefined;
                    this.isAccountsVisible = true;  // Make accounts visible
                    this.buttonLabel = 'Hide Accounts';  // Change button label
                })
                .catch(error => {
                    this.error = error;
                    this.accounts = [];
                    this.isAccountsVisible = false;  // Hide accounts if there's an error
                    this.buttonLabel = 'Fetch Accounts';  // Reset button label
                });
        }
    }
}

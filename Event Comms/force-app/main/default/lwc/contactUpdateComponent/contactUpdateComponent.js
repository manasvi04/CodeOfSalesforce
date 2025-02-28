import { LightningElement, api, wire, track } from 'lwc';
import updateContactDetails from '@salesforce/apex/ContactHandler.updateContactDetails';
import getContactDetails from '@salesforce/apex/ContactHandler.getContactDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactUpdateComponent extends LightningElement {
    @api recordId; // Contact Record Id
    @track contact = {};
    @track editMode = false;
    @track tempContact = {}; // Store temporary values during edit

    @wire(getContactDetails, { contactId: '$recordId' })
    wiredContact({ error, data }) {
        if (data) {
            this.contact = data;
            // Initialize tempContact with existing values for editing
            this.tempContact = { ...data }; 
        } else if (error) {
            this.showToast('Error', error.body.message, 'error');
            console.error(error);
        }
    }

    handleEdit() {
        this.editMode = true;
    }

    handleCancel() {
        this.editMode = false;
        // Reset tempContact if cancelled
        this.tempContact = { ...this.contact };
    }


    handleInputChange(event) {
        const field = event.target.name;
        this.tempContact[field] = event.target.value;
    }

    handleSave() {
        updateContactDetails({
            contactId: this.recordId,
            firstName: this.tempContact.FirstName,
            lastName: this.tempContact.LastName,
            email: this.tempContact.Email,
            phone: this.tempContact.Phone
        })
            .then(result => {
                this.contact = result; // Update displayed contact details
                this.editMode = false;
                this.showToast('Success', 'Contact details updated successfully', 'success');
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
                console.error(error);
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}
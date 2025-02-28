import { LightningElement, track } from 'lwc';

export default class ParentComponent extends LightningElement {
    @track progressValue = 50;

    handleSliderChange(event) {
        this.progressValue = event.target.value;
    }

    handleInputChange(event) {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 0 && value <= 100) {
            this.progressValue = value;
        }
    }
}
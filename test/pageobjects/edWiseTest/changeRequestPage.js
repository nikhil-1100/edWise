import CommonPage from "./commonPage.js";


class changeRequestPage extends CommonPage{
    constructor() {
        super();
        this.$header=()=>$(`//h6[text()="Change Requests"]`);
        this.$addRequestButton=()=>$('//span[text()="Add Request"]/parent::button/..');
        this.$dropdown=(dropdown)=>$(`//span[normalize-space(text())="${dropdown}"]/../../div[@class="rz-dropdown"]`);
        this.$schools=(schools)=> $(`//span[text()="${schools}"]/parent::li`);
        this.$requestCard=(card)=>$(`//p[text()="${card}"]/../..`);
        this.$requestCardHeader=(card)=>$(`(//span[text()="${card}"])[1]`)
        this.$activeCard=(card)=>$(`//p[text()="${card}"]/../../..//div[@class="add-request-card progress-active-sections"]`)
        this.$DetailsHeader=(school)=>$(`//div[@class="rz-card rz-variant-text"]//span[text()="${school}"]`);
        this.$requestCardDropdown=(name)=>$(`(//label[normalize-space(text())="${name}"]/..//div[@class="rz-dropdown valid w-100"])[1]`)
        this.$requestcardDropDownElement=(value)=>$(`(//span[normalize-space()="${value}"]/..)[2]`)
        this.$requestCardTextBox=(name)=>$(`(//input[@name="${name}"])[1]`)
        this.$requestCardReason=()=>$(`(//textarea[@name="ReasonForChange"])[1]`)
        this.$buttonClick=(name)=>$(`(//span[normalize-space(text())="${name}"]/..)[1]`)
        this.$submitButton=()=>$(`//button[normalize-space(text())="Review and Submit"]`)
        this.$requestStatus=()=>$(`//h6[text()="Review Change Requests"]`)
        this.$submitCategory=()=>$(`//p[normalize-space(text())="Category"]`)
        this.$reasonForChangeHead=()=>$(`//span[text()="Reason for the change"]`)
        this.$changeSuccess=()=>$(`//div[text()="Successfully Submitted"]`)
        this.$crId=(card)=>$(`//span[text()="${card}"]/../../..//span[@class="request-value"]`)
        
    }

    async clickAddRequestButton() {
        await this.$addRequestButton().click();
    }
    async selectDropdown(dropdown, element,details) {
        await this.$dropdown(dropdown).click();
        await this.$schools(element).click();
        //await this.$DetailsHeader(details).waitforDisplayed({ timeout: 50000, timeoutMsg: "Header should be present" });
    }

    async requestCard(card){
        await this.$requestCard(card).click();


    }

    async selectDropDown(name,value) {
        await this.$requestCardDropdown(name).click();
        await this.$requestcardDropDownElement(value).click();
    }

    async textBox(name,value) {
        await this.$requestCardTextBox(name).click();
        await this.$requestCardTextBox(name).setValue(value);
    }

    async reasonForChange(value) {
        await this.$requestCardReason().click();
        await this.$requestCardReason().setValue(value);
    }
    
    async clickButton(name) {
        await this.$buttonClick(name).click();
    }

    async submitButton() {
        await this.$submitButton().click();
        await this.$loader().waitForDisplayed({
            timeout: 100000,
            reverse: true,
            timeoutMsg:'Loader is not displayed'
        });
        await this.$reasonForChangeHead().waitForDisplayed({ timeout: 50000, timeoutMsg: "Category should be present" });
        
    }



    
}

export default new changeRequestPage()
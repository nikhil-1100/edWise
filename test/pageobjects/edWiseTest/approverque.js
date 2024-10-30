import CommonPage from "./commonPage.js";


class ApproverQue extends CommonPage{
    constructor(){
        super();
        this.$header=()=>$(`//h6[text()="Approval Queue"]`)
        this.$assignToMeButton=(id)=>$(`//span[text()="${id}"]/../..//td//button`);
        this.$approverButton=(id)=>$(`//span[text()="${id}"]/../..//a[contains(text(),Approver)]`)
        // this.$approverButton=(id)=>$(`(//span[@title="${id}"]/following::td/span/a/span[text()="Approver1"])[1]`)
        this.$approveHeader=()=>$(`(//div[@class="rz-layout"]//h6[text()="Review Change Request"])[1]`)
        this.$commentBox=()=>$(`//textarea[@tabindex="0"][@name="comments"]`)
        this.$statusDropdown=()=>$(`//textarea[@tabindex="0"][@name="comments"]/../..//div[@class="approval-form-select"]`);
        this.$dropdownElement=(element)=>$(`//div[@class="rz-dropdown-panel rz-popup"]//span[text()="${element}"]`)
        this.$submitButton=()=>$(`//textarea[@tabindex="0"][@name="comments"]/../..//button[@type="submit"]`)
        this.$spinnrer=()=>$(`//div[@class="spinner-border spinner-border-sm"]`)
        this.$approverQueue=()=>$(`//h6[text()="Approval Queue"]`)


    }

    async clickAssign(id){
        await this.$assignToMeButton(id).waitForDisplayed({timeout: 500000, timeoutMsg: "not assigned"})
        await this.$assignToMeButton(id).click();
        await this.spinnrerWait();
    }
    async clickApprover(id){
        await this.$approverButton(id).click();
        
    }
    async addComments(comment){
        await this.$commentBox().click();
        await this.$commentBox().setValue(comment);
    }
    async selectStatus(element){
        await this.$statusDropdown().click();
        await this.$dropdownElement(element).click();

    }

    async clickSubmit(){
        await this.$submitButton().click();
    }
}
export default new ApproverQue()
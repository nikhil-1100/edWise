import CommonPage from "./commonPage.js";

class Additional extends CommonPage{
    constructor(){
        super();
        this.$changeRequestButton=()=>$(`//span[text()="Change Request"]/../..`);
        this.$changeRequestHeader=()=>$(`//h6[text()="Change Requests"]`);
        this.$$crId=()=>$$(`//tr[@class="rz-data-row  "]//td[1]//span`);
        this.$sortCrId=()=>$(`//span[text()="CR Id"]/../../..`)

        
    }
    /**
     * @name changeRequest
     * @descriptionClick on Change Request
     * 
     */
    async changeRequest(){
        await this.$changeRequestButton().click();
        // await this.$changeRequestHeader().waitforDisplayed({ timeout: 50000, timeoutMsg: "Header should be present" });
    }
    /**
     * @name storeCrId
     * @description store the crId
     * @returns crId
     */
    async storeCrId() {
        let crId = [];
        let crCount = await this.$$crId().length;
        for (let cr = 0; cr < crCount; cr++) {
            let crText = await this.$$crId()[cr].getText(); 
            crId.push(crText);
        }
        
        return crId;
    }



    async clickSortButton() {
        await this.$sortCrId().click();
    }
    
    

    
}
export default new Additional()
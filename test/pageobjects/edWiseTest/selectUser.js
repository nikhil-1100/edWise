import CommonPage from "./commonPage.js";

class SelectUser extends CommonPage {
    constructor() {
        super();
        this.$$dropdowns=()=>$$(`//div[@class="rz-p-0 rz-p-md-12"]//div[@class="rz-dropdown"]`);
        this.$dropdown=(dropdown)=>$(`//div[@class="rz-p-0 rz-p-md-12"]//label[text()="${dropdown}"]/parent::div`);
        this.$dropDownElement=(element)=>$(`//div[@class="rz-dropdown-panel rz-popup"]//span[text()="${element}"]/parent::li`);
        this.$selectButton=()=>$(`//div[@class="rz-p-0 rz-p-md-12"]//span[normalize-space()="Select"]/parent::button`);
    }

    /**
     * 
     * @param {string} dropdown 
     */
    async clickDropdown(dropdown, element) {
        await this.$dropdown(dropdown).click();
        await this.$dropDownElement(element).click();
    }
    async clickSelectButton() {
        await this.$selectButton().click();
        await this.$changeRequestHeader().waitForDisplayed({ timeout: 90000, timeoutMsg: "Spinner did not disappear in time" });
    }
    
}

export default new SelectUser();
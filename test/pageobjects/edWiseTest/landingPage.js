import CommonPage from "./commonPage.js";

class LandingPage extends CommonPage {
    constructor() {
        super();
        this.$header=()=>$(`//div[contains(@class,'normal rz-mx-auto ')]`);
        this.$configButton=()=>$(`//span[text()="Configurations"]/parent::div`);
        this.$menuElements=(element)=>$(`//span[text()="${element}"]/parent::a/parent::div`);
        this.$$dropdowns=()=>$$(`//div[@class="rz-p-0 rz-p-md-12"]//div[@class="rz-dropdown"]`)

    }

    /**
     * Click config button
     */
    async clickConfig(){
        await this.$configButton().click();
    }
/**
 * Click on the select user Button
*/
    async clickElements(element){
        await this.$menuElements(element).click();
        for(let drpodown of await this.$$dropdowns()) {
            await expect(drpodown).toBeDisplayed();
        }
    }
    

}
export default new LandingPage();
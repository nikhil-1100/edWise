export default class CommonPage{

    constructor(){
    this.$loader = () => $(`(//div[@class="lds-spinner"])[1]`);
    this.$changeRequestHeader=()=>$(`//h6[text()="Change Requests"]`) 
    }

    /**
     * Load the URL
     */
    async loadUrl(){
        await browser.maximizeWindow();
        await browser.url('https://web-edmaster-test-wtus-ui-01.azurewebsites.net/');
        await this.$loader().waitForDisplayed({
            timeout: 100000,
            reverse: true,
            timeoutMsg:'Loader is not displayed'
        });
    }

    async spinnrerWait(){
        await this.$loader().waitForDisplayed({
            timeout: 100000,
            reverse: true,
            timeoutMsg:'Loader is not displayed'
        });
    }
}
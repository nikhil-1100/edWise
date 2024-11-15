import landingPage from "../pageobjects/edWiseTest/landingPage.js";
import selectUser from "../pageobjects/edWiseTest/selectUser.js";
import additional from "../pageobjects/edWiseTest/additional.js";
import testdata from "../testData/edWiseSorting.json" ;


let crId=[];
describe('EdWise test', () => {

    it(' Load the URL successfully', async () => {
        await landingPage.loadUrl();
        expect(await landingPage.$header().isDisplayed())
            .withContext('Load landing page successfully')
            .toBeTrue();
    })
   
    it(' Click on the config button', async () => {
        await landingPage.clickConfig();
        expect(await landingPage.$menuElements("Select User").isDisplayed())
            .withContext('Click on the config button')
            .toBeTrue();
    })

    it(` Click on the select user Button `, async () => {
        await landingPage.clickElements("Select User");
        for (let dropdown of await selectUser.$$dropdowns()) {
            expect(await dropdown.isDisplayed())
                .withContext('Click on the select user Button')
                .toBeTrue();
        }
    })

    it(` Click on the First dropdown `, async () => {
        await selectUser.clickDropdown(testdata.dropdowns[0], testdata.user);
        expect(await selectUser.$dropdown(testdata.user).isDisplayed())
            .withContext('Click on the First dropdown')
            .toBeTrue();
    })

    it(` Click on the Second dropdown `, async () => {
        await selectUser.clickDropdown(testdata.dropdowns[1], testdata.role);
        expect(await selectUser.$dropdown(testdata.role).isDisplayed())
            .withContext('Click on the Second dropdown')
            .toBeTrue();
    })

    it(' Click on the Select button ', async () => {
        await selectUser.clickSelectButton();
        await selectUser.spinnrerWait();
        
    })

    it(`Click on the Change Request button `, async () => {
        await additional.changeRequest();
        await additional.spinnrerWait();
        expect(await additional.$changeRequestHeader().isDisplayed())
            .withContext('Click on the Change Request button')
            .toBeTrue();
    })

    it('store the CrId to an array', async () => {
        crId= await additional.storeCrId();
        console.log(crId);
    })

    it('Click on the Sort button ', async () => {
        await additional.clickSortButton();
        await additional.spinnrerWait();
    })

    it(`Save the sorted CrId to an array and check the order`, async () => {
        let buttonSorted= await additional.storeCrId();
        console.log(buttonSorted);
        expect(buttonSorted).toEqual(crId.sort());
    })

})
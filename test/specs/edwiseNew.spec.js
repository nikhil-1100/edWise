import landingPage from "../pageobjects/edWiseTest/landingPage.js";
import selectUser from "../pageobjects/edWiseTest/selectUser.js";
import changeRequestPage from "../pageobjects/edWiseTest/changeRequestPage.js";
import testdata from "../testData/edWiseData.json" ;
import approverQue from "../pageobjects/edWiseTest/approverque.js";
import dragAndDrop from "../pageobjects/edWiseTest/dragAndDrop.js";




    describe('EdWise test', () => {

        it(' Load the URL successfully and verify the Header is present', async () => {
            await landingPage.loadUrl();
            expect(await landingPage.$header().isDisplayed())
                .withContext('Load landing page successfully')
                .toBeTrue();
        })
       
        it(' Click on the config button and verify the Select user  button is present', async () => {
            await landingPage.clickConfig();
            expect(await landingPage.$menuElements("Select User").isDisplayed())
                .withContext('Click on the config button')
                .toBeTrue();
        })

        it(` Click on the select user Button for changing details of  and verify the dropdowns are present`, async () => {
            await landingPage.clickElements("Select User");
            for (let dropdown of await selectUser.$$dropdowns()) {
                expect(await dropdown.isDisplayed())
                    .withContext('Click on the select user Button')
                    .toBeTrue();
            }
        })

        it(` Click on the First dropdown and choose ${testdata.users[0]} for changing details of  and Verify ${testdata.users[0]} is selected`, async () => {
            await selectUser.clickDropdown(testdata.dropdowns[0], testdata.users[0]);
            expect(await selectUser.$dropdown(testdata.users[0]).isDisplayed())
                .withContext('Click on the First dropdown')
                .toBeTrue();
        })

        it(` Click on the Second dropdown and choose ${testdata.roles[0]} for changing details of and Verify ${testdata.roles[0]} is selected`, async () => {
            await selectUser.clickDropdown(testdata.dropdowns[1], testdata.roles[0]);
            expect(await selectUser.$dropdown(testdata.roles[0]).isDisplayed())
                .withContext('Click on the Second dropdown')
                .toBeTrue();
        })

        it(` Click on the Select button for changing details of  and verify the header is present`, async () => {
            await selectUser.clickSelectButton();
            expect(await changeRequestPage.$header().isDisplayed())
                .withContext('header is not displayed')
                .toBeTrue();
        })
        it('Changge the box size', async () => {
            await dragAndDrop.dragTabToWidth();
            browser.pause(20000);
        })
            


    });
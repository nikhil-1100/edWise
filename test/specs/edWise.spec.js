import landingPage from "../pageobjects/edWiseTest/landingPage.js";
import selectUser from "../pageobjects/edWiseTest/selectUser.js";
import changeRequestPage from "../pageobjects/edWiseTest/changeRequestPage.js";
import testdata from "../testData/edWiseData.json";
import approverQue from "../pageobjects/edWiseTest/approverque.js";

let crId = [0, 0, 0];
let currentCrId = 0;



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
        for (let school of testdata.schools) {

        it(` Click on the select user Button for changing details of ${school}`, async () => {
            await landingPage.clickElements("Select User");
            for (let dropdown of await selectUser.$$dropdowns()) {
                expect(await dropdown.isDisplayed())
                    .withContext('Click on the select user Button')
                    .toBeTrue();
            }
        })

        it(` Click on the First dropdown and choose ${testdata.users[0]} for changing details of ${school}`, async () => {
            await selectUser.clickDropdown(testdata.dropdowns[0], testdata.users[0]);
            expect(await selectUser.$dropdown(testdata.users[0]).isDisplayed())
                .withContext('Click on the First dropdown')
                .toBeTrue();
        })

        it(` Click on the Second dropdown and choose ${testdata.roles[0]} for changing details of ${school}`, async () => {
            await selectUser.clickDropdown(testdata.dropdowns[1], testdata.roles[0]);
            expect(await selectUser.$dropdown(testdata.roles[0]).isDisplayed())
                .withContext('Click on the Second dropdown')
                .toBeTrue();
        })

        it(' Click on the Select button for changing details of ${school}', async () => {
            await selectUser.clickSelectButton();
            expect(await changeRequestPage.$header().isDisplayed())
                .withContext('header is not displayed')
                .toBeTrue();
        })

        it(` Click on the Add Request button for changing details of ${school}`, async () => {
            await changeRequestPage.clickAddRequestButton();
            expect(await changeRequestPage.$dropdown(testdata.changeRequestDropdown[0]).isDisplayed())
                .withContext('header is not displayed')
                .toBeTrue();

        })

        it(`Click on the dropdown and select educatoin ogrgatization for changing details of ${school}`, async () => {
            await changeRequestPage.selectDropdown(testdata.changeRequestDropdown[0], school)

        })

        it(` Select the category dropdown and select ${school}`, async () => {
            await changeRequestPage.selectDropdown(testdata.changeRequestDropdown[1], testdata.educationCatagory)
            expect(await changeRequestPage.$DetailsHeader(testdata.changeRequestDropdown[0]).isDisplayed())
                .withContext('header is not displayed')
                .toBeTrue();
        })
        for (let card of testdata.cards) {
            let j = 0;
            it(`Select the ${card} Request Card of ${school}`, async () => {
                await changeRequestPage.$requestCard(card).waitForDisplayed({ timeout: 500000, timeoutMsg: "not Submitted" });
                await changeRequestPage.requestCard(card);
                expect(await changeRequestPage.$requestCardHeader(card).isDisplayed())
                    .withContext(`${card} header is not displayed`)
                    .toBeTrue();
            });

            it(`Fill the ${card} Request Card Details of ${school}`, async () => {
                const cardDetails = testdata.cardDetails.find(detail => detail.type === `change${card}`);
            
                if (cardDetails) {
                    // Process dropdowns
                    for (let i = 0; i < cardDetails.dropdownHeads.length; i++) {
                        await changeRequestPage.selectDropDown(cardDetails.dropdownHeads[i], cardDetails.dropdownValues[i]);
                    }
            
                    // Append a random number to each textBox value and process text boxes
                    const randomNum = Math.floor(Math.random() * 10); // Generate a random number (0-99)
                    for (let i = 0; i < cardDetails.textBox.length; i++) {
                        const valueWithRandomNum = `${cardDetails.textBoxValues[i]}${randomNum}`;
                        await changeRequestPage.textBox(cardDetails.textBox[i], valueWithRandomNum);
                    }
            
                    // Add reason for change with random number
                    const reasonWithRandomNum = `${cardDetails.textBoxValues[cardDetails.textBoxValues.length - 1]}${randomNum}`;
                    await changeRequestPage.reasonForChange(reasonWithRandomNum);
                }
            });
            

            it(`Click on the Save button for changing details of ${school}`, async () => {
                await changeRequestPage.$buttonClick("Save").waitForDisplayed({ timeout: 500000, timeoutMsg: "not Submitted" });
                await changeRequestPage.clickButton("Save");
                await changeRequestPage.$activeCard(card).waitForDisplayed({ timeout: 500000, timeoutMsg: "not Submitted" });
                expect(await changeRequestPage.$activeCard(card).isDisplayed())
                    .withContext(`${card} active card is not displayed`)
                    .toBeTrue();
            });
        }


        it(`Click on the review and submit button for changing details of ${school}`, async () => {
            await changeRequestPage.$submitButton().waitForDisplayed({ timeout: 500000, timeoutMsg: "not Submitted" });
            await changeRequestPage.submitButton();
            expect(await changeRequestPage.$requestStatus().isDisplayed())
                .withContext('header is not displayed')
                .toBeTrue();
        })

        it(`Click submit for approval button for changing details of ${school}`, async () => {
            // await changeRequestPage.$buttonClick("Submit for Approval").waitForDisplayed({ timeout: 500000, timeoutMsg: "not Submitted" });
            await changeRequestPage.clickButton("Submit All");
            await changeRequestPage.$changeSuccess().waitForDisplayed({ timeout: 5000000, timeoutMsg: "not Submitted" })
            expect(await changeRequestPage.$changeSuccess().isDisplayed())
                .withContext('Successfully Submitted')
                .toBeTrue();
            let number = 0;
            for (let card of testdata.cards) {
                crId[number] = await changeRequestPage.$crId(card).getText();
                number++;
                
            }
        })


        for (let i = 1; i < 4; i++) {

            it(`Click on the select user Button for approving request of ${school}`, async () => {
                // await landingPage.spinnrerWait();
                await landingPage.clickElements("Select User");
                // await selectUser.spinnrerWait();
                for (let dropdown of await selectUser.$$dropdowns()) {
                    expect(await dropdown.isDisplayed())
                        .withContext('Click on the select user Button')
                        .toBeTrue();

                }
                console.log(i);
            })

            it(`Click on the First dropdown for approving request of ${school}`, async () => {
                await selectUser.spinnrerWait();
                await selectUser.$dropdown(testdata.dropdowns[0]).waitForDisplayed({ timeout: 500000, timeoutMsg: "not Submitted" });
                await selectUser.clickDropdown(testdata.dropdowns[0], testdata.users[i]);
                expect(await selectUser.$dropdown(testdata.users[i]).isDisplayed())
                    .withContext('Click on the First dropdown')
                    .toBeTrue();
            })

            it(`Click on the Secound dropdown for approving request of ${school}`, async () => {
                await selectUser.spinnrerWait();
                await selectUser.$dropdown(testdata.dropdowns[1]).waitForDisplayed({ timeout: 500000, timeoutMsg: "not Submitted" });
                await selectUser.clickDropdown(testdata.dropdowns[1], testdata.roles[i]);
                expect(await selectUser.$dropdown(testdata.roles[i]).isDisplayed())
                    .withContext('Click on the First dropdown')
                    .toBeTrue();
            })

            it(`Click on the Select button for approving request of ${school}`, async () => {
                await selectUser.$selectButton().waitForDisplayed({ timeout: 500000, timeoutMsg: "not Submitted" });
                await selectUser.clickSelectButton();
                expect(await changeRequestPage.$header().isDisplayed())
                    .withContext('header is not displayed')
                    .toBeTrue();
                await selectUser.spinnrerWait();
            })

            it(`Click on the request queue button for approving request of ${school}`, async () => {
                await landingPage.clickElements("Approval Queue");
                expect(await approverQue.$header().isDisplayed())
                    .withContext('header is not displayed')
                    .toBeTrue();
                console.log(crId);
            })

            for (let crID = 0; crID < crId.length; crID++)
                {

                    it(`Click on the Assign to me button of ${school} of ${crID+1}st request`, async () => {
                        currentCrId=crId[crID];
                        console.log(currentCrId);
                        await approverQue.clickAssign(currentCrId);
                        await approverQue.$assignToMeButton(currentCrId).waitForDisplayed({ timeout: 5000, timeoutMsg: "Assign to me button not displayed" });
                        expect(await approverQue.$assignToMeButton(currentCrId).isDisplayed())
                            .withContext('Assign to me button is not displayed')
                            .toBeTrue();
                    });

                    it(`Click on the approver button of ${school} of ${crID+1}st request`, async () => {
                        await approverQue.clickApprover(currentCrId);
                        expect(await approverQue.$approveHeader().isDisplayed())
                            .withContext('Approve header is not displayed')
                            .toBeTrue();
                    });

                    it(`Add comments of ${school} of ${crID+1}st request`, async () => {
                        await approverQue.addComments("Approved");
                    });

                    it(`Click on the status dropdown and set it to Approved of ${school} of ${crID+1}st request`, async () => {
                        await approverQue.selectStatus("Approved");
                    });

                    it(`Click on the submit button and verify submission of ${school} of ${crID+1}st request`, async () => {
                        await approverQue.clickSubmit();
                        await approverQue.$approverQueue().waitForDisplayed({ timeout: 5000, timeoutMsg: "Submission did not complete" });
                        expect(await approverQue.$approverQueue().isDisplayed())
                            .withContext('Approval queue header is not displayed')
                            .toBeTrue();
                    });
                }

        }

    }
})

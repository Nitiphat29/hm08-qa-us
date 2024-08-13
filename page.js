module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    // Modals
    phoneNumberModal: '.modal',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    selectPlan: async function(planName) { 
        const planButton = await $ 
        (`button=${planName}`);
        await planButton.click(); 
    },
    addCreditCard: async function(cardNumber, expiryDate, cvv) {
        const cardField = await $ 
        ('#creditCard');
        await cardField.setValue(cardNumber);

        const expiryField = await $ ('#expiryDate');
        await expiryField.setValue(expiryDate);

        const cvvField = await $('#cvv');
        await cvvField.setValue(cvv);

        const submitButton = await $ ('#submitCard');
        await submitButton.click();
    },
    writeMessage: async function(message) { 
        const messageField = await $ ('#message');
        await messageField.setValue(message);
    },
    orderItem: async function(items) { 
        for (const item of items) { 
            const itemButton = await $ 
            (`button=${items}`);
            await itemButton.click();
        }
    },
    searchForCar: async function() { 
        const searchButton = await $ 
        ('.search-car');
        await searchButton.click();
    },
    waitForDriverInfo: async function() { 
        const driverInfo = await $ 
        ('.driver-info');
        await driverInfo.waitForDisplayed();
    }
};
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
    planButton: 'div=Supportive',
    messageField: '#comment',
    blanketButton: '.switch',
    blanketButtonStatus: '.switch-input',
    iceCreamPlusButton: 'div=+',
    orderButton: '.smart-button-main=Order',
    phoneNumberModal: '.modal',
    carSearchModal: 'div=Car search',
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
    selectPlan: async function() { 
        const planButton = await $(this.planButton);
        await planButton.waitForDisplayed();
        planButton.click(); 
        return planButton;
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
        const messageField = await $ (this.messageField);
        await messageField.waitForDisplayed();
        messageField.setValue(message);
    },
    orderItem: async function(items) { 
        const blanketButton = await $(this.blanketButton);
        await blanketButton.waitForDisplayed();
        await blanketButton.click();
    },
    searchForCar: async function() { 
        const orderButton = await $(this.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
    },
    waitForDriverInfo: async function() { 
        const driverInfo = await $ 
        ('.driver-info');
        await driverInfo.waitForDisplayed();
    },
    addIceCream: async function (qty) {
        const iceCreamPlusButton = await $(this.iceCreamPlusButton);
        await iceCreamPlusButton.waitForDisplayed();
        for (i = 0; i < qty; i++) {
            await iceCreamPlusButton.click();
        }
    },
};
const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    });

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    });
    
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');
    });

    it('should select the Supportive plan', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectPlan('Supportive');
        const selectedPlan = await page.selectPlan();
        await expect(selectedPlan.parentElement()).toHvaeElementClass('active');
    });

    it('should add a credit card', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addCreditCard('4111111111111111', '12/23', '123');
        const cardField = await browser.$('#creditCard');
        await expect(cardField).toHaveValue('4111111111111111');
    });

    it('should write a message for the driver', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const message = 'Please call when you arrive.';
        await page.writeMessage(message);
        await expect($(page.messageField)).toHaveValue(message);
    });

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectPlan();
        await page.orderItem();
        await expect($(page.blanketButtonStatus)).toBeChecked();
    });

    it('should order 2 ice creams', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectPlan();
        const iceCreamQty = 2;
        await page.addIceCream(iceCreamQty);
        await expect($(`div=${iceCreamQty}`)).toBeExisting();
    });

    it('should display the car search modal', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.searchForCar();
        await expect($(`${page.carSearchModal}`)).toBeExisting();
    });

    it('should display the driver info', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.waitForDriverInfo();
        const driverInfo = await browser.$('.driver-info');
        await expect(driverInfo).toBeDisplayed();
    });
})


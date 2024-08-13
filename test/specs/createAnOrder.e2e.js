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
        const addressField = await browser.$('#address');
        await expect(addressField).toHaveValue('East 2nd Street, 601', '1300 1st St');
    });

    it('should select the Supportive plan', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectPlan('Supportive');
        const selectedPlan = await browser.$('.plan.selected');
        await expect(selectedPlan).toHaveTextContaining('Supportive');
    });

    it('should fill in the phone number', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillPhoneNumber('123-456-7890');
        const phoneNumberField = await browser.$('#phoneNumber');
        await expect(phoneNumberField).toHaveValue('123-456-7890');
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
        await page.writeMessage('Please call when you arrive.');
        const messageField = await browser.$('#message');
        await expect(messageField).toHaveText('Please call when you arrive.');
    });

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.orderItems(['blanket', 'Handkerchiefs']);
        const item = await browser.$$('.item.selected');
        await expect(items).toBeElementsArrayOfSize(2);
    });

    it('should order 2 ice creams', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.orderItems(['Ice Cream']);
        const iceCreams = await browser.$$('.item.selected.ice-cream');
        await expect(iceCreams).toBeElementsArrayOfSize(2);
    });

    it('should display the car search modal', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.searchForCar();
        const modal = await browser.$('.car-search-modal');
        await modal(items).toBeDisplayed();
    });

    it('should display the driver info', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.waitForDriverInfo();
        const driverInfo = await browser.$('.driver-info');
        await expect(driverInfo).toBeDisplayed();
    });
})


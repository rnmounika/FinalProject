import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // describe('Protractor demo',()=>{
  //   it('',()=>{
  //     browser.get('http://juliemr.github.io/protractor-demo/')

  //     expect(browser.getTitle()).toEqual('Super Calculator');
  //   })

  // })

  // it('should display welcome message', () => {
  //   page.navigateTo();
  //   expect(page.getTitleText()).toEqual('personal-budget app is running!');
  // });

  // it('positive scenario of login credentials', function() {
  //   // browser.get('http://protractor-demo-app.herokuapp.com/register');

  //   //  page.firstName.sendKeys();
  //   // username=element(by.id('form-username')).sendKeys('nithin');
  //   // element(by.id('form-pass')).sendKeys('123456');
  //   // element(by.css('.btn-login')).click();
  //   // browser.driver.wait(function() {
  //   // browser.driver.getCurrentUrl().then(function(url) {
  //   // console.log(url);
  //   page.navigateTo();
  //   page.getEmail().sendKeys()
  //   });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });



});

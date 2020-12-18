import { browser, by, element } from 'protractor';

describe('Protractor Demo', () => {

  beforeEach(() => {
    //The code here will get executed before each it block is called
    browser.get('/');
  });

  it('should display the name of the application',() => {
   /*Expectations accept parameters that will be matched with the real value
   using Jasmine's matcher functions. eg. toEqual(),toContain(), toBe(), toBeTruthy() etc. */
  //  expect(element(by.css("input[formControlName=username]")).getText()).toContain('Pastebin Application');
   expect(element(by.css("p")).getText()).toContain('Mounika');
  // expect("Pastebin Application").toEqual("Pastebin Application");

  });

  it('Successfully Logged in',() => {
    //  expect(element(by.css("a")).getText()).toContain('Login');
   // expect("Pastebin Application").toEqual("Pastebin Application");
   browser.get('/login');
  //  element(by.tagName('Login')).click();
   element(by.css("input[formControlName=username]")).sendKeys('mounika_rn@gmail.com');
   element(by.css("input[formControlName=password]")).sendKeys('May_2020');
   element(by.buttonText("Login")).click();
  //  expect(element(by.buttonText("Update")).getText()).toContain('Title');
  //  expect(element(by.css(".container h2")).getText()).toContain('Add');
  //  browser.click('.button=Login');
  // console.log(browser.driver.getCurrentUrl())

   });

  // it('should click the create Paste button',() => {
  //   //spec goes here

  // })
});

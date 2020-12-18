import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  // getTitleText(): Promise<string> {
  //   return element(by.css('pb-root .content span')).getText() as Promise<string>;
  // }

  // getEmail(): Promise<string> {
  //   return element(by.css("input[formControlName=username]")).getText() as Promise<string>;
  // }
  // getPassword(): Promise<string> {
  //   return element(by.css("input[formControlName=password]")).getText() as Promise<string>;
  // }

  // getButton():Promise<string> {
  //   return element(by.css('.btn-primary')).getText() as Promise<string>;
  // }

  // firstName = element(by.css("input[formControlName=username]")).sendKeys('test@example.com');;
  // lastName = element(by.id('lastName'));
  // userName = element(by.id('userName'));
  // userPass = element(by.id('pwd'));
  // regBtn = element(by.css('.btn-register'));
  // loginName = element(by.id('form-username'));
  // loginPwd = element(by.id('form-pass'));
  // loginBtn = element(by.css('.btn-primary'));
  // private credentials={
  //   email:'mounika_rn@gmail.com',
  //   password:'May_2020'
  // }
  // navigateTo()
  // {
  //   return browser.get(browser.baseUrl+"/login")
  // }
  // fillCredentials(credentials: any =this.credentials)
  // {
  //   element(by.css('[name="username"]')).sendKeys(credentials.email);
  //   element(by.css('[name="password"]')).sendKeys(credentials.password);
  //   element(by.css('.btn-primary')).click()
  // }
}

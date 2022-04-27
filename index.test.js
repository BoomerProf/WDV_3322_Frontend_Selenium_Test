const { Builder, By, Key, until } = require('selenium-webdriver');
require('dotenv').config();

describe('Verify setup for API Frontend', function () {
  let driver, randNum, email, password, firstName;

  beforeAll(() => {
    driver = new Builder().forBrowser('chrome').build();
    driver.manage().window().maximize();
  });

  afterAll(() => {
    driver.quit();
  });

  const setDelay = async () => {
    await driver.sleep(2000);
  };

  it('should open frontend homepage', async () => {
    await driver.get(process.env.url);
    driver.getTitle().then((title) => {
      expect(title).toEqual('Home');
    });
    setDelay();
  });

  it('should open signup page', async () => {
    await driver.get(process.env.url);
    let element = await driver.findElement(By.name('signup'));
    await element.click();
    await driver.wait(until.titleContains('Sign Up'), 4000);
    await driver.getTitle().then((title) => {
      expect(title).toEqual('Sign Up');
    });
    await setDelay();
  });

  it('should sign in user and end at login page', async () => {
    await driver.get(driver.getCurrentUrl());
    let fnameElement = await driver.findElement(By.name('fname'));
    firstName = 'Eric';
    await fnameElement.sendKeys(firstName, Key.TAB);
    let lnameElement = await driver.findElement(By.name('lname'));
    await lnameElement.sendKeys('Clarke', Key.TAB);
    let addressElement = await driver.findElement(By.name('address'));
    await addressElement.sendKeys('123 Center St', Key.TAB);
    let cityElement = await driver.findElement(By.name('city'));
    await cityElement.sendKeys('Jacksonville', Key.TAB);
    let stateElement = await driver.findElement(By.name('state'));
    await stateElement.sendKeys('FL', Key.TAB);
    let zipElement = await driver.findElement(By.name('zip'));
    await zipElement.sendKeys('32256', Key.TAB);
    let emailElement = await driver.findElement(By.name('email'));
    randNum = Math.ceil(Math.random() * 100000);
    email = 'eric' + randNum + '@gmail.com';
    await emailElement.sendKeys(email, Key.TAB);
    let passwordElement = await driver.findElement(By.name('password'));
    password = 'Eric1999';
    await passwordElement.sendKeys(password, Key.TAB);
    let cpasswordElement = await driver.findElement(By.name('cpassword'));
    await cpasswordElement.sendKeys(password);
    let btnElement = await driver.findElement(By.name('signup-btn'));
    btnElement.sendKeys(Key.ENTER);

    await driver.wait(until.titleContains('Login'), 4000);
    await driver.getTitle().then((title) => {
      expect(title).toEqual('Login');
    });
    const message = await driver.findElement(By.name('message')).getText();
    expect(message).toEqual('User created');
    await setDelay();
  });

  it('should log in user and end at profile page', async () => {
    await driver.get(driver.getCurrentUrl());
    let element = await driver.findElement(By.name('login'));
    await element.click();
    await driver.wait(until.titleContains('Login'), 4000);
    let emailElement = await driver.findElement(By.name('email'));
    await emailElement.sendKeys(email, Key.TAB);
    let passwordElement = await driver.findElement(By.name('password'));
    await passwordElement.sendKeys(password);
    let btnElement = await driver.findElement(By.name('login-btn'));
    btnElement.sendKeys(Key.ENTER);
    await driver.wait(until.titleContains('Profile'), 4000);
    await driver.getTitle().then((title) => {
      expect(title).toEqual('Profile');
    });
    const message = await driver.findElement(By.name('message')).getText();
    expect(message).toEqual('Welcome ' + firstName);
    await setDelay();
  });

  it('should send user to home page', async () => {
    await driver.get(driver.getCurrentUrl());
    let element = await driver.findElement(By.name('home'));
    await element.click();
    await driver.wait(until.titleContains('Home'), 4000);
    await driver.getTitle().then((title) => {
      expect(title).toEqual('Home');
    });
    await setDelay();
  });

  it('should log user out and send user to login page', async () => {
    await driver.get(driver.getCurrentUrl());
    let element = await driver.findElement(By.name('logout'));
    await element.click();
    await driver.wait(until.titleContains('Home'), 4000);
    await driver.getTitle().then((title) => {
      expect(title).toEqual('Home');
    });
    await setDelay();
  });
});

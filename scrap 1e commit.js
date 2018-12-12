const puppeteer = require('puppeteer');
const URL = 'https://candidature.42.fr/users/sign_in';
const user = 'user@gmail.com';
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({headless: false});

const page = await browser.newPage();
await page.goto(URL);
  
  // selection et saisie d'user
  await page.waitForSelector('#new_user > .form-inputs > .control-group > .controls > #user_email')
  await page.click('#new_user > .form-inputs > .control-group > .controls > #user_email')
  await page.keyboard.type('user_email')
  
  // selection et saisie de mdp
  await page.waitForSelector('#new_user > .form-inputs > .control-group > .controls > #user_password')
  await page.click('#new_user > .form-inputs > .control-group > .controls > #user_password')
  await page.keyboard.type('user_password')
  
  await page.waitForSelector('#subs-signin > #new_user > .form-inputs > .form-actions > .btn')
  await page.click('#subs-signin > #new_user > .form-inputs > .form-actions > .btn')
  await page.waitFor(3000)
  await console.log(page.url())

  fs.writeFileSync("monHTML.txt",await page.content(), "UTF-8")
 
  await browser.close()
})()
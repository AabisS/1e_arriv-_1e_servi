const puppeteer = require('puppeteer');
const URL = 'https://candidature.42.fr/users/sign_in';
const user = 'user_name';
const fs = require("fs");
const mdp = 'mot_de_passe';

(async () => {
  const browser = await puppeteer.launch({headless: true});

  const page = await browser.newPage();
  await page.goto(URL);
  
  // selection et saisie d'user
  await page.waitForSelector('#new_user > .form-inputs > .control-group > .controls > #user_email')
  await page.click('#new_user > .form-inputs > .control-group > .controls > #user_email')
  await page.keyboard.type(user)
  
  // selection et saisie de mdp
  await page.waitForSelector('#new_user > .form-inputs > .control-group > .controls > #user_password')
  await page.click('#new_user > .form-inputs > .control-group > .controls > #user_password')
  await page.keyboard.type(mdp)
  
  await page.waitForSelector('#subs-signin > #new_user > .form-inputs > .form-actions > .btn')
  await page.click('#subs-signin > #new_user > .form-inputs > .form-actions > .btn')
  // tempo car model async rapide 
  await page.waitFor(1000)
  await console.log(await page.url())

  // ecriture du contenu HTML
  await fs.writeFileSync("monHTML.txt",await page.content(), "UTF-8")
  
  //déconnexion de la page
  await page.waitForSelector('#subs-header > #subs-user > ul > #subs-login > a')
  await page.click('#subs-header > #subs-user > ul > #subs-login > a')
 
  //5 minutes d'intervalle soit 300000 ms 
  //Temporisation entre 2 copies de fichier
  await page.waitFor(600000)
  

  await page.close() 
  
  //2e partie
  console.log('- - - - - 2e Partie - - - - - ')
  
  const page2 = await browser.newPage();
  await page2.goto(URL);
  
  // selection et saisie d'user
  await page2.waitForSelector('#new_user > .form-inputs > .control-group > .controls > #user_email')
  await page2.click('#new_user > .form-inputs > .control-group > .controls > #user_email')
  await page2.keyboard.type(user)
  
  // selection et saisie de mdp
  await page2.waitForSelector('#new_user > .form-inputs > .control-group > .controls > #user_password')
  await page2.click('#new_user > .form-inputs > .control-group > .controls > #user_password')
  await page2.keyboard.type(mdp)
 
  //Envoie du Formulaire
  await page2.waitForSelector('#subs-signin > #new_user > .form-inputs > .form-actions > .btn')
  await page2.click('#subs-signin > #new_user > .form-inputs > .form-actions > .btn')
  
  // tempo car model async trop rapide 
  await page2.waitFor(1000)
  await console.log(await page2.url())

  //écriture du contenu HTML
  await fs.writeFileSync("monHTML2.txt",await page2.content(), "UTF-8") 	
 
  await page2.close() 
  
  // On quitte le navigateur
  await browser.close()
  
})()
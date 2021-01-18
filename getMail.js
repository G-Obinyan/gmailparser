

import fs from 'fs';
import { google } from 'googleapis';
const TOKEN_PATH = '../token.json'; 
import initialRestToJson from './buildJSON.js';


//var rp = require('request-promise');
import parseMessage from 'gmail-api-parse-message';

class ReadEmail {
  constructor(_dominio) {
    this.credentials = null;
    this.auth = null;
    this.message = null;
    this.dominio = _dominio;
  }

  async setup() {
    this.credentials = await this.getCredentials();
    this.auth = await this.getAuthorize();
    this.message = await this.getLastMessage();
  }

  getCredentials() {
    return new Promise((resolve, reject) => {
      fs.readFile('../credentials.json', (err, content) => {
        if (err) reject('Error loading client secret file:' + err);
        resolve(JSON.parse(content));
      });
    });
  }

  getAuthorize() {
    return new Promise((resolve, reject) => {
      const { client_secret, client_id, redirect_uris } = this.credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) reject('Erro ao pegar o Token: ' + err);
        oAuth2Client.setCredentials(JSON.parse(token));
        resolve(oAuth2Client);
      });
    });
  }

  getLastMessage() {
    return new Promise((resolve, reject) => {
      const gmail = google.gmail({ version: 'v1', auth: this.auth });
      var request = gmail.users.messages.list({
        userId: 'me',
        labelIds: 'INBOX',
        maxResults: 30,
        json: true,
      });
      request.then(ret => {
        let id = ret.data.messages[3].id;
        var request2 = gmail.users.messages.get({
          userId: 'me',
          id: id,
          json: true,
        });
        request2.then(ret2 => {
            //var parsedMessage = parseMessage(ret2);
            //console.log(parsedMessage);
          var myResto =[];
          var thisResto = {
            "restoName": "",
            "desc": "",
            "address": "",
            "link": "",
            "cuisine": "",
            "service": "",
            "image": "",
          
          };

          let msg = ret2.data.payload.body.data;
          let buff = new Buffer.from(msg, 'base64');
          let text = buff.toString('ascii');

          let nextTxt = text.split("Description - 250 character limit:");
          let final = nextTxt[0].split("Restaurant Name:");
          let restoName = final[1].replace(/(\r\n|\n|\r)/gm, "");
          thisResto.restoName = restoName;

          nextTxt = text.split("Address:");
          final = nextTxt[0].split("Description - 250 character limit:");
          let desc = final[1].replace(/(\r\n|\n|\r)/gm, "");
          thisResto.desc = desc;

          nextTxt = text.split("Hours:");
          final = nextTxt[0].split("Address:");
          let add = final[1].replace(/(\r\n|\n|\r)/gm, "");
          thisResto.address = add;

          //nextTxt = text.split("Link to website - (Please use https if possible):");
          //final = nextTxt[0].split("Hours:");

          nextTxt = text.split("Cuisine:");
          final = nextTxt[0].split("Link to website - (Please use https if possible):");
          let link = final[1].replace(/(\r\n|\n|\r)/gm, "");
          thisResto.link = link;
          //console.log(final[1]);

          nextTxt = text.split("Service Offered:");
          final = nextTxt[0].split("Cuisine:");
          let cuisine = final[1].replace(/(\r\n|\n|\r)/gm, "");
          thisResto.cuisine = cuisine;


          nextTxt = text.split("Please select an image:");
          final = nextTxt[0].split("Service Offered:");
          let service = final[1].replace(/(\r\n|\n|\r)/gm, "");
          thisResto.service = service;
          //console.log(final[1]);

          nextTxt = text.split("I confirm this restaurant offers its own delivery service (ie. no UberEats, DoorDash, Skip the dishes etc.):");
          final = nextTxt[0].split("Please select an image:");
          let image = final[1].replace(/(\r\n|\n|\r)/gm, "");
          thisResto.image = image;

          initialRestToJson(thisResto);

          //final = text.split("I confirm this restaurant offers its own delivery service (ie. no UberEats, DoorDash, Skip the dishes etc.):")
          //console.log(final[1]);
            //To do:
            //Create function to initiate JSON with required fields
            //increment JSON as parsing continues
            //Send JSON to contentful function
            //Format JSON into proper format to sent to contentful 
            //Call contentful API
          //resolve(final);
        });
      });
    });
  }


  
}
new ReadEmail('_dominio').setup();

    
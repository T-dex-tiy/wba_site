import auth0 from 'auth0-js'

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'wba-data.auth0.com',
    clientID: 'bi2wASzzaMq4Jayq71GpDezJ8nioFFPG',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://wba-data.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}

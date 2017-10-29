import auth0 from 'auth0-js'
import history from './history'

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'wba.auth0.com',
    clientID: 'PCmKzVmOHnOG6tRKwrzy58XM8h0Nwkx4',
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI,
    audience: 'https://wba.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid email'
  });

    constructor() {
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    login(){
      this.auth0.authorize();
    }

    handleAuthentication() {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          history.replace('/home');
        } else if (err) {
          history.replace('/home');
          console.log(err);
        }
      });
    }

    setSession(authResult) {
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      localStorage.setItem('email', authResult.idTokenPayload.email);
      history.replace('/home');
    }

    logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('email');
      history.replace('/');
    }

    isAuthenticated() {
      // Check whether the current time is past the
      // access token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }
  }

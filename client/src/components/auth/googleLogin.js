import { message } from 'antd';
import axios from 'axios';
import { setIsSignedIn, setName } from '../navbar/login';
require('dotenv').config();
const keys = require('./keys');
let GoogleAuth, GoogleUser, BasicProfile;


const googleLogin = (res, rej) => {
  GoogleAuth = window.gapi.auth2.init({
    clientId: keys.googleClientId,
  });

  GoogleAuth.then(
    () => {
      GoogleAuth.signIn()
        .then(() => {
          res();
          GoogleUser = GoogleAuth.currentUser.get();
          BasicProfile = GoogleUser.getBasicProfile();
          const token = GoogleUser.getAuthResponse().id_token;
          axios
            .get('/api/auth', { params: { token } })
            .then((e) => {
              if (e.data.ok) {
                setName(e.data.name);
                setIsSignedIn(true);
              } else {
                message.error('google auth fail');
              }
            })
            .catch(() => {
              message.error('google auth fail');
            });
        })
        .catch((e) => {
          rej(e);
        });
    },
    (e) => {
      rej(e);
    },
  );
};

export { googleLogin, GoogleAuth, GoogleUser, BasicProfile };

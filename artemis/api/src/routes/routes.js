/*I like doing routes all on the same page. So you can see them all. But this is up to you. Especially because we really don't need a route for
everysingle page. It would be better to use filters and make additional queries in the 
graphql schema. 

We probably need a route for signin, signout, authenticate for now. The rest of the things,
like cretaing a user, createing an annotation and uipdating can all be done on the same
api url. 

Here is an exmaple. You can then import this into app.js and apply all rotues at once. 

I would just go with goodl authentication for this app. 
*/


const Router = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const axios = require('axios');


let { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  if (process.env.NODE_ENV !== 'production') {
    JWT_SECRET = 'jwtsecretwhileindevmode';
    console.log('Missing JWT_SECRET. Using unsafe dev secret');
  } else {
    console.log('Missing env var JWT_SECRET. Authentication failed');
  }
}

const routes = new Router();

routes.use(bodyParser.json());

function getUser(req) {
  const googleToken = req.cookies.jwt_google;
  const facebookToken = req.cookies.jwt_facebook;
  if (!googleToken && !facebookToken) return { signedIn: false };

  try {
    const credentials = googleToken ? jwt.verify(googleToken, JWT_SECRET) : jwt.verify(facebookToken, JWT_SECRET);
    return credentials;
  } catch (error) {
    return { signedIn: false };
  }
}

routes.post('/signin', async (req, res) => {

  // To do: create user if information authenticated
  // if email already exists don't create user but return credentials
  if (!JWT_SECRET) {
    res.status(500).send('Missing JWT_SECRET. Refusing to authenticate');
  }

  if (req.body.google_token) {
    const googleToken = req.body.google_token;
    if (!googleToken) {
      res.status(400).send({ code: 400, message: 'Missing Token' });
    }
    const client = new OAuth2Client();
    let payload;
    try {
      const ticket = await client.verifyIdToken({ idToken: googleToken });
      payload = ticket.getPayload();
    } catch (error) {
      res.status(403).send('Invalid Credentials');
    }
    const { given_name: givenName, name, email } = payload;
    const credentials = {
      signedIn: true, givenName, name, email,
    };
    const token = jwt.sign(credentials, JWT_SECRET);
    res.cookie('jwt_google', token, { httpOnly: true });
    res.json(credentials);
  }

  if (req.body.facebook_token) {
    const facebookToken = req.body.facebook_token;
    axios.get(`https://graph.facebook.com/v8.0/me?fields=id%2cname%2cemail&access_token=${facebookToken}`)
      .then((response) => {
        const { data } = response;
        if (data.error) res.status(400).send({ code: 400, message: data.error.message });

        const { id, name, email } = data;
        const credentials = {
          signedIn: true, name, email, id,
        };
        credentials.facebookAuth = true;

        const token = jwt.sign(credentials, JWT_SECRET);
        res.cookie('jwt_facebook', token, { httpOnly: true });
        res.json(credentials);
      });
  }
});

routes.post('/user', (req, res) => {
  res.send(getUser(req));
});

routes.post('/signout', async (req, res) => {
  console.log(req.cookies);
  res.clearCookie('jwt_google');
  res.clearCookie('jwt_facebook');
  res.json({ status: 'you have signed out user' });
});

module.exports = { routes };

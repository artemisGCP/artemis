const { OAuth2Client } = require('google-auth-library');
const { keyv } = require('../../../db');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const maxAge = 7 * 24 * 3600 * 1000;
const tokenVerify = (token) => {
  return new Promise((res, rej) => {
    client
      .verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      })
      .then((ticket) => {
        let payload = ticket.getPayload();
        res(payload);
      })
      .catch((e) => {
        rej(e);
      });
  });
};

const tokenStore = (token, info) => {
  keyv.set(token, info, maxAge);
};

const auth = (req, res) => {
  const token = req.query.token;

  tokenVerify(token)
    .then((e) => {
      tokenStore(e.jti, e);
      res.cookie('token', e.jti, { maxAge });
      res.send({ ok: true, name: e.name });
    })
    .catch((e) => {
      console.log(e);
      res.send({ ok: false, msg: e });
    });
};

module.exports = auth;

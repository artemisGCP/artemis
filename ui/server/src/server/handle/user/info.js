const { keyv } = require('../../../db');

const info = (req, res) => {
  keyv
    .get(req.cookies.token)
    .then((e) => {
      res.send({ ok: true, name: e.name });
    })
    .catch(() => {
      res.send({ ok: false });
    });
};

module.exports = info;

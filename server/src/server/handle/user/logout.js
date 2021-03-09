const { keyv } = require('../../../db');

const logout = (req, res) => {
  keyv.delete(req.cookies.token);
  res.clearCookie('token');
  res.send({ ok: true });
};

module.exports = logout;

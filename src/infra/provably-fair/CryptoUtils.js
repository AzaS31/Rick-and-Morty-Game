const crypto = require('crypto');

function generateKey() {
  return crypto.randomBytes(16).toString('hex');
}

function generateHMAC(key, value) {
  return crypto.createHmac('sha256', key)
    .update(String(value))
    .digest('hex');
}

module.exports = { generateKey, generateHMAC };

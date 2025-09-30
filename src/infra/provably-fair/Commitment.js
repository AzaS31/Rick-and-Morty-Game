const { generateKey, generateHMAC } = require('./CryptoUtils');

function createCommitment(secretNumber) {
  const key = generateKey();
  const hmac = generateHMAC(key, secretNumber);
  return { key, hmac };
}

module.exports = createCommitment;

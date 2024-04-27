const crypto = require('crypto');

// Función para encriptar
function aesEncriptar(entrada, clave) {
  const key = Buffer.from(clave, 'utf-8');
  const iv = Buffer.from('1234567890123456');
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);

  let encriptar = Buffer.from(entrada, 'utf-8');

  let encriptado = cipher.update(encriptar);
  encriptado = Buffer.concat([encriptado, cipher.final()]);

  const ciphertextHex = encriptado.toString('hex');

  return ciphertextHex;
}

// Función para desencriptar
function aesDesencriptar(entrada, clave) {
  const key = Buffer.from(clave, 'utf-8');
  const iv = Buffer.from('1234567890123456');
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);

  let encriptado = Buffer.from(entrada, 'hex');

  let desencriptado = decipher.update(encriptado);
  desencriptado = Buffer.concat([desencriptado, decipher.final()]);

  const decryptedData = desencriptado.toString('utf-8');
  return decryptedData;
}

module.exports = {
  aesEncriptar,
  aesDesencriptar
};

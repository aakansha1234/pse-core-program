const crypto = require('crypto');

// Asymmetric encryption
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });

// Encrypt
const plaintext = 'This is a secret message.';
const encoder = new TextEncoder();

// Encode the string to Uint8Array
//The publicKey is used to encrypt the plaintext message. Remember that RSA encryption is public key encryption.
const uint8Arraytext = encoder.encode(plaintext);
const encryptedMsg = crypto.publicEncrypt(privateKey, uint8Arraytext);

// Decrypt
const decryptedMsgUint8array = crypto.privateDecrypt(privateKey, encryptedMsg);
console.log(decryptedMsgUint8array);
const decoder = new TextDecoder();

// Decode the Uint8Array to string
// The privateKey is used to decrypt the encrypted message. The result should be the original plaintext.
const decyptedMsg  = decoder.decode(decryptedMsgUint8array);
console.log(decyptedMsg);


// Create a digital signature
//Use the privateKey to sign the plaintext message. This will generate a digital signature
const sign = crypto.createSign('SHA256');
sign.update(plaintext);
sign.end();
const signature = sign.sign(privateKey);

// Verify a digital signature
// Use the publicKey to verify the signature. It should return true if the signature is valid.
const verify = crypto.createVerify('SHA256');
verify.update(plaintext);
verify.end();
console.log(verify.verify(publicKey, signature));

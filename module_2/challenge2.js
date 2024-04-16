const crypto = require("crypto");
const poseidon = require("poseidon-encryption");

// SHA-256
const data = "This is some data X.";
const hashSHA256 = crypto.createHash('sha256').update(data).digest('hex');
console.log('hashSHA256', hashSHA256);

// Poseidon
const inputs = [1, 2, 3, 4];
const hashPoseidon = poseidon.poseidon(inputs);
console.log('hashPoseidon', hashPoseidon);
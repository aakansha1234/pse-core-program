const crypto = require('crypto');
class PedersenCommitment {
  constructor() {
    // Set prime number (p) and generator (g)
    this.p = BigInt(23); // use a large prime in a real-world scenario
    this.g = BigInt(4); // use a large number in a real-world scenario
    this.h = null;
    this.r = null;
    this.s = null;
  }

  getRandomBigInt() {
    const buffer = crypto.randomBytes(32); // Generate 32 random bytes
    const hexString = buffer.toString('hex'); // Convert bytes to hexadecimal string
    const bigIntValue = BigInt(`0x${hexString}`); // Convert hexadecimal string to BigInt
    return bigIntValue;
  }

  // Generate 'h' with a random number 'r' (h = g^r mod p)
  generateH() {
    this.r = this.getRandomBigInt();
    console.log('r',this.r);
    console.log('p',this.p);
    this.h =  (this.g * this.r) % this.p;
    console.log(this.h);
  }

  // Generate the commitment (g^s * h^r mod p)
  generateCommitment(s) {
    this.s = BigInt(s);
    console.log(this.s)
    //Calculate and return the commitment using g, s, h, r and p
    const t =  (((this.h * this.r) % this.p) * ((this.g * this.s) % this.p)) % this.p;
    return t;
  }

  // Reveal the secret number and random number (s, r)
  reveal() {
    return (this.s,this.r);
  }

  // Verify the commitment (g^s * h^r mod p)
  verify(s, r, C) {
    // Verify the commitment by recalculating it and comparing with C
    const t =  (((this.h * this.r) % this.p) * ((this.g * this.s) % this.p)) % this.p;
    return t == C;
  }
}

// Test the PedersenCommitment
const pc = new PedersenCommitment();
pc.generateH();

//Party A: Generate a commitment
let secretNumber = 7;
let commitment = pc.generateCommitment(secretNumber);
console.log("Commitment: ", commitment);

// Party A: Reveal the secret and random number
let reveal = pc.reveal();
console.log("Revealed: ", reveal);

// Party B: Verify the commitment
let verification = pc.verify(reveal.s, reveal.r, commitment);
console.log("Verification: ", verification);
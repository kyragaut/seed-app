/*
This is part of a key manager. 
This part is responsible for generating a hierarchical deterministic (HD) key from a secret. 
Secrets are generated from elliptic curves. 
One important feature of is that it is not limited to using one specific curve. 

1. function that makes public key
2. function that makes private key from public key
3. sign
4. verify

*/

const secp256k1 = require ('secp256k1')
const bs58check = require ('bs58check')
const crypto = require ('crypto') //npm module that generates randomness from entropy
const assert = require('assert') //will remove this later and replace it to do our verifications in a cleaner way because assert won't throw an error it just will make things not work

//function that generates a private key from 
export function privateKey ()
{
	//bytes is basically the private key
	const bytes = crypto.randomBytes(32) //32 is the length of key size in secp256k1
	//verifying in case someone gives us a bad set of bytes (like all 0's, makes sure you don't have a bad/vulnerable private key)
	assert(secp256k1.privateKeyVerify(bytes) === true, ('Private key assertion failed.'));
	return bytes
}


export function publicKey (privateKey)
{
	return secp256k1.publicKeyCreate(privateKey, true) //generate public key by passing the private key through, and using the elliptic curve secp256k1
	//decided not to put the hash in bbecause it's used more in bitcoin and not sure if it's needed in this library
}

export function sign (hash, privateKey)
{
	return secp256k1.sign(hash, privateKey).signature
}

export function verify (hash, signature, publicKey) //hash is the message. Public key decripts my signature, which proves it was signed by my private key
{
	return secp256k1.verify(hash, signature, publicKey)
}


function createChildKey ()
{
	
}
# Scrypt Nonce Wrapper

## Description
A wrapper module around crypto.scrypt adding nonce functionality to prevent against rainbow-table attack.

## Installation
```
yarn add scrypt-nonce-wrapper
```

## Usage
```js
const Scrypt = require("scrypt-nonce-wrapper");
// the rest of config goes into options of this crypto.scrypt
// https://nodejs.org/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback
const scrypt = new Scrypt({salt: 'your salt', keylen: 64});

var password = 'super-password';

// option 1
var hash = scrypt.encryptSync(password);
scrypt.verifyPasswordSync(password, hash); // return true 

// option 2
scrypt.encrypt(password)
	.then((hash)=>{
		return scrypt.verifyPassword(password, hash);
	});
```

## Requirement
- Node version 10.5 or newer
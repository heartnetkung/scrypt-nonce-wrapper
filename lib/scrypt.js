const crypto = require("crypto");

const randomString = function() {
	const newRandom = Math.random();
	const randomStr = "00000" + Math.floor(newRandom * 1000000);
	return randomStr.substring(randomStr.length - 6, randomStr.length);
};

module.exports = class Scrypt {
	constructor(config) {
		this.salt = config.salt;
		this.keylen = config.keylen || 64;
		delete config.salt;
		delete config.keylen;
		this.config = config;
	}

	encrypt(password) {
		return new Promise((res, rej) => {
			var nonce = randomString();
			crypto.scrypt(nonce + password, this.salt, this.keylen, this.config, (err, derivedKey) => {
				if (err) return rej(err);
				res(nonce + derivedKey.toString("base64"));
			});
		});
	}

	encryptSync(password) {
		var nonce = randomString();
		return nonce + crypto.scryptSync(nonce + password, this.salt, this.keylen, this.config).toString("base64");
	}

	verifyPassword(password, hash) {
		return new Promise((res, rej) => {
			var nonce = hash.substring(0, 6);
			crypto.scrypt(nonce + password, this.salt, this.keylen, this.config, (err, derivedKey) => {
				if (err) return rej(err);
				res(nonce + derivedKey.toString("base64") === hash);
			});
		});
	}

	verifyPasswordSync(password, hash) {
		var nonce = hash.substring(0, 6);
		return (
			nonce + crypto.scryptSync(nonce + password, this.salt, this.keylen, this.config).toString("base64") ===
			hash
		);
	}
}
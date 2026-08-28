import * as crypto from "node:crypto";
import config from "../config/env.js";

const KEY = Buffer.from(config.encryptionKey, "base64"); // decode once, use everywhere
const encryptionAlgo = "aes-256-gcm";
const keyLength = 32;
const ivLength = 12;
const authTagLength = 16;

function validateEncryptionInput(key: Buffer, iv: Buffer): boolean {
  return key.length === keyLength && iv.length === ivLength;
}

function encrypt(plaintext: string): string {
  const iv = crypto.randomBytes(ivLength);

  if (!validateEncryptionInput(KEY, iv)) {
    throw new Error("The encryption credentials are invalid");
  }

  const cipher = crypto.createCipheriv(encryptionAlgo, KEY, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf-8"), cipher.final()]);
  const authtag = cipher.getAuthTag();

  return Buffer.concat([iv, authtag, encrypted]).toString("base64");
};


//Decrypt

function decrypt(payload: string, key:Buffer):string {

      if (key.length !== keyLength) throw new Error ("Key length is wrong at the function decrypt");

      const data = Buffer.from(payload, "base64");
      const iv = data.subarray(0 , ivLength);
      const authTag = data.subarray(ivLength , ivLength + authTagLength);
      const cipherText = data.subarray(ivLength + authTagLength);
      const decipher = crypto.createDecipheriv(encryptionAlgo, key , iv);
      
      decipher.setAuthTag(authTag);

      const decrypted = Buffer.concat([decipher.update(cipherText),
        decipher.final()
      ]);

      return decrypted.toString("base64");
};


function generateRandomKey(){

        const randomKey = crypto.randomBytes(32);
      return randomKey.toString("utf-8");
};



export {
  generateRandomKey,
  encrypt,
  decrypt,

};


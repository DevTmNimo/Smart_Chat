import crypto, { timingSafeEqual } from "node:crypto";
import argon2 from "argon2";

// hashing password

async function hashPassword(rawPassword: string): Promise<string> {

    try {
        return await argon2.hash(rawPassword);

    } catch(err) {

        throw new Error("Failed to generated a hash: ", {cause : err});
    }
};

// verifying a hash

async function verifyHash(rawPassword: string , hash: string): Promise<boolean> {
    try {

        return await argon2.verify(hash , rawPassword);

    }catch (err) {

        throw new Error("Failed to verify the password against the hash: ", {cause : err});
    }
};



//generating random tokens

function generateToken(bytesLength:number = 32):string {

    return crypto.randomBytes(bytesLength).toString("hex");

};


function hashToken(rawToken: string):string {

    return crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

};


function verifyToken(rawToken: string, storedHash: string): boolean {

    const incomingToken = hashToken(rawToken);
    

    const binaryIncomingToken = Buffer.from(incomingToken, "hex");
    const binaryStoredToken = Buffer.from(storedHash, "hex");

    if ( binaryIncomingToken.length !== binaryStoredToken.length ) return false;



    // preventing timing attacks 

    return timingSafeEqual(binaryIncomingToken, binaryStoredToken);

};






export { 

    hashPassword ,
    verifyHash,
    generateToken,
    verifyToken,
    hashToken


 };

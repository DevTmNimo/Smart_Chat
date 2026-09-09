import crypto, { timingSafeEqual } from "node:crypto";
import * as argon2 from "argon2";
// hashing password
async function hashPassword(rawPassword) {
    try {
        return await argon2.hash(rawPassword);
    }
    catch (err) {
        throw new Error("Failed to generated a hash: ", { cause: err });
    }
}
;
// verifying a hash
async function verifyHash(rawPassword, hash) {
    try {
        return await argon2.verify(hash, rawPassword);
    }
    catch (err) {
        throw new Error("Failed to verify the password against the hash: ", { cause: err });
    }
}
;
//generating random tokens
function hashToken(rawToken) {
    return crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");
}
;
function verifyToken(rawToken, storedHash) {
    const incomingToken = hashToken(rawToken);
    const binaryIncomingToken = Buffer.from(incomingToken, "hex");
    const binaryStoredToken = Buffer.from(storedHash, "hex");
    if (binaryIncomingToken.length !== binaryStoredToken.length)
        return false;
    // preventing timing attacks 
    return timingSafeEqual(binaryIncomingToken, binaryStoredToken);
}
;
export { hashPassword, verifyHash, verifyToken, hashToken };

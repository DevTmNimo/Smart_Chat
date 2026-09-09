import * as crypto from "node:crypto";

function generateRandom(bytes: number):Buffer {

    return crypto.randomBytes(bytes);
};

export const sessionId = generateRandom(32).toString("base64url");

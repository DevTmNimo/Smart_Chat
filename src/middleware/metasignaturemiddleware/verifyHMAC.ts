import { Request } from "express";
import crypto, { timingSafeEqual } from "crypto";

function verifyHmacSignature(req: Request , appSecret: string): boolean {

    const signature = req.headers["x-hub-signature-256"] as string | undefined;
    
    if(!signature || !req.rawBody) return false;

    const expected = "sha256=" + crypto
        .createHmac('sha256' , appSecret)
        .update(req.rawBody)
        .digest('hex');


    const sigBuffer = Buffer.from(signature);
    const expecBuffer = Buffer.from(expected);


    if (sigBuffer.length !== expecBuffer.length) return false;

    return timingSafeEqual(sigBuffer , expecBuffer);

}

export default verifyHmacSignature;
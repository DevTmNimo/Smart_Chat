import crypto, { timingSafeEqual } from "crypto";
import config from "../config/env.js";
import { Request } from "express";


//Turn req.body into a raw buffer and compare it to the signature

function validateHmac(req: Request , appSecret:string ): boolean {

    const signature = req.headers["x-hub-signature-256"] as string | undefined ; 

    if(!signature || !req.rawBody) {
        return false;
    }
    
    const expected = "sha256=" + crypto
    .createHmac("sha256" , appSecret)
    .update(req.rawBody)
    .digest("hex");

    const sigBuffer = Buffer.from(signature);
    const expecBuffer = Buffer.from(expected);

    if (sigBuffer !== expecBuffer) return false;

    return timingSafeEqual(sigBuffer , expecBuffer);

};

export default validateHmac;
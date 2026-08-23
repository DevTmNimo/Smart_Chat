import express, {Request , Response , NextFunction} from "express";
import verifyHmacSignature from "./metasignaturemiddleware/verifyHMAC.ts"
import config from "../config/env.ts";


function validateHmac(req: Request , res: Response , next: NextFunction): void {
    const isValid = verifyHmacSignature(req , config.appSecret);
    if (!isValid) {

    res.status(401).json({error : "Invalid HMAC signature!"});

        return;
    }
    
    next();
}

export default validateHmac;
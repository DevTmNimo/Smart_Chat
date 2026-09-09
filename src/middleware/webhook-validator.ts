import {Request , Response , NextFunction} from "express";
import validateHmac from "./authenticate.hmac.js";


function validHmac(req: Request, res: Response, next: NextFunction ): void {

    const isValid: boolean = validateHmac(req);

    if(!isValid) {

        res.status(401).json({
            "error": "Invalid HMAC signature"
        })
        return;
    }


    res.status(200)
    next();

};
export default validHmac;
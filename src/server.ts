// importing the needed modules and dependencies.

import express, {Request , Response , Router} from "express";
import config from "./config/env.ts";
import validateHmac from "./middleware/authenticateHMAC.ts";
const port = config.port || 3000;
const app = express();
const route = Router();


// middleware , parsing raw JSON into a js object + rawBody buffer property for HMAC
app.use(express.json({
    verify: (req: Request , res: Response , buf: Buffer) => {
        req.rawBody = buf;
    }
}));

//verifying HMAC 

app.use(validateHmac);



app.listen(port , () => {
    console.log(`the server is running on port : ${port}`);
});
// importing the needed modules and dependencies.

import express, {type Express ,type Request ,type  Response} from "express";
import config from "./config/env.js";
import validHmac from "./middleware/webhook-validator.js";
const port = config.port || 3000;
const app:Express = express();


// middleware , parsing raw JSON into a js object + rawBody buffer property for HMAC
app.use(express.json({
    verify: (req: Request , res: Response , buf: Buffer) => {
        req.rawBody = buf;
    }
}));

app.use(validHmac);



app.listen(port , () => {
    console.log(`the server is running on port : ${port}`);
});
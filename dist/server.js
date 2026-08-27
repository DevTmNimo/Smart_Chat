// importing the needed modules and dependencies.
import express, { Router } from "express";
import config from "./config/env.js";
import validHmac from "./middleware/webhook-validator.js";
const port = config.port || 3000;
const app = express();
const route = Router();
// middleware , parsing raw JSON into a js object + rawBody buffer property for HMAC
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));
//verifying HMAC 
app.use(validHmac);
route.post('/webhook');
app.listen(port, () => {
    console.log(`the server is running on port : ${port}`);
});

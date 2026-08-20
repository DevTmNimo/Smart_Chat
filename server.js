import express from "express";
import dotenv from 'dotenv/config';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({
    verify: (req , res , buf) => {
        req.rawBody = buf;
    }
}));


app.listen(port , () => {
    console.log("The server is running on port:" , port);
});
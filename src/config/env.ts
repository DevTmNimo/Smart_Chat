import dotenv from "dotenv";
dotenv.config();

function required(key: string): string{
    const value = process.env[key];
    if (!value) {
        throw new Error(`The next required env variable couldn't be reached : ${key}`);
    }
    return value;
}

interface Config {
    port : number,
    appSecret : string,
    accessToken : string
};

const config: Config = {
    port : Number(required("PORT")),
    appSecret : required("INSTAGRAM_APP_SECRET"),
    accessToken : required("ACCESS_TOKEN")
};
export default config;
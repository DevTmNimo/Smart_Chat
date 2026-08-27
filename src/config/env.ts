import dotenv from "dotenv";
dotenv.config();

function required(key: string): string{
    const value = process.env[key];
    if (!value) {
        throw new Error(`The next required env variable couldn't be reached : ${key}`);
    }
    return value;
}

type Config = {
    port : number,
    appSecret : string;
    accessToken : string;
    supabaseUrl: string;
    supabaseKey: string;
    encryptionKey: string;
};

const config: Config = {
    port : Number(required("PORT")),
    appSecret : required("INSTAGRAM_APP_SECRET"),
    accessToken : required("ACCESS_TOKEN"),
    supabaseUrl : required("SUPABASE_DATA_API_ENDPOINT"),
    supabaseKey : required("SUPABASE_SECRET_API_KEY"),
    encryptionKey : required("ENCRYPTION/KEY"),
    
};
export default config;
import dotenv from "dotenv";
dotenv.config();
function required(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`The next required env variable couldn't be reached : ${key}`);
    }
    return value;
}
;
const config = {
    port: Number(required("PORT")),
    appSecret: required("INSTAGRAM_APP_SECRET"),
    accessToken: required("ACCESS_TOKEN"),
    supabaseUrl: required("SUPABASE_DATA_API_ENDPOINT"),
    supabaseKey: required("SUPABASE_SECRET_API_KEY"),
};
export default config;

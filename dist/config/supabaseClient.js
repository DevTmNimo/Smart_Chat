import { createClient } from "@supabase/supabase-js";
import config from "./env.js";
//database configurations
const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

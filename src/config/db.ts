import config from "./env.js";
import {createClient} from "@supabase/supabase-js";

const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseKey;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
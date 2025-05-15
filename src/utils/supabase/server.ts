import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase Konfiguration fehlt. Stelle sicher, dass REACT_APP_SUPABASE_URL und REACT_APP_SUPABASE_ANON_KEY in deinen Umgebungsvariablen gesetzt sind.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

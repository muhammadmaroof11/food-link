import { supabase } from '../utils/supabase';

export const authService = {
  /**
   * Sign up a new user with metadata (full_name and role)
   */
  async signUp(email, password, fullName, role) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role
        }
      }
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign in an existing user
   */
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign out the current user
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Get the current session and user profile
   */
  async getCurrentUser() {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) return null;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError) throw profileError;

    return { ...session.user, profile };
  }
};

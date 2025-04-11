
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/bakery';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer profile fetching to avoid potential auth deadlocks
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }

        // Handle initial sign-in from OAuth (like Google)
        if (event === 'SIGNED_IN' && session?.user?.app_metadata?.provider !== 'email') {
          toast({
            title: "Sign in successful",
            description: `Welcome${session?.user?.user_metadata?.full_name ? ` ${session.user.user_metadata.full_name}` : ''}!`,
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        
        // For new OAuth users, we might need to create a profile
        if (error.code === 'PGRST116') {
          createInitialProfile(userId);
        }
        return;
      }
      
      console.log('Profile data:', data);
      setProfile(data as Profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const createInitialProfile = async (userId: string) => {
    try {
      // Get user data for name information
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      
      if (!user) return;
      
      // Extract name from user_metadata if available (Google auth provides this)
      let firstName = '';
      let lastName = '';
      
      if (user.user_metadata?.full_name) {
        const nameParts = user.user_metadata.full_name.split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
      }
      
      // Create profile
      const { error } = await supabase.from('profiles').insert({
        id: userId,
        first_name: firstName,
        last_name: lastName,
        created_at: new Date().toISOString()
      });
      
      if (error) {
        console.error('Error creating profile:', error);
        return;
      }
      
      // Fetch the newly created profile
      fetchProfile(userId);
      
    } catch (error) {
      console.error('Error creating initial profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in with email:', email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: "Error signing in",
          description: error.message || "Unknown error occurred",
          variant: "destructive"
        });
      } else {
        console.log('Sign in successful, session:', data.session);
        toast({
          title: "Sign in successful",
          description: "Welcome back!",
        });
      }
      
      return { error };
    } catch (error: any) {
      console.error('Unexpected error during sign in:', error);
      toast({
        title: "Error signing in",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      console.log('Signing up with email:', email);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });
      
      if (!error) {
        toast({
          title: "Sign up successful",
          description: "Please check your email to confirm your account or continue to login.",
        });
      }
      
      return { error };
    } catch (error: any) {
      console.error('Error during sign up:', error);
      toast({
        title: "Error signing up",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('Error during sign out:', error);
      toast({
        title: "Error signing out",
        description: "An error occurred while signing out",
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signIn, signUp, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import { supabase } from './supabase';

export async function signUp({
  email,
  password,
  fullName,
  phone,
}: {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}) {
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) throw signUpError;

  // Create profile after signup
  const { error: profileError } = await supabase.from('profiles').insert([
    {
      id: data.user?.id,
      full_name: fullName,
      phone,
      email,
    },
  ]);

  if (profileError) throw profileError;

  return data;
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
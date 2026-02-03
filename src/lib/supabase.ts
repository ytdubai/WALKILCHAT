import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xjbuktmaktupkssretbt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqYnVrdG1ha3R1cGtzc3JldGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNDEwOTgsImV4cCI6MjA4NTYxNzA5OH0.Cp6dschu3CWjHPCuf9k8GaibxP8hqE1PchLx3ox_opU'

export const supabase = createClient(supabaseUrl, supabaseKey)

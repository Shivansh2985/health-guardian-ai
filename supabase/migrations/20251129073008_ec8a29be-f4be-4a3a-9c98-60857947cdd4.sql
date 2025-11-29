-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  total_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create health_reports table for storing generated AI analysis
CREATE TABLE public.health_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL, -- 'diabetes', 'alzheimer', 'ckd', 'diet', 'workout'
  title TEXT NOT NULL,
  summary TEXT,
  full_report TEXT NOT NULL,
  risk_level TEXT, -- 'low', 'medium', 'high'
  recommendations TEXT[],
  metrics JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on health_reports
ALTER TABLE public.health_reports ENABLE ROW LEVEL SECURITY;

-- Health reports policies
CREATE POLICY "Users can view their own reports"
  ON public.health_reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reports"
  ON public.health_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reports"
  ON public.health_reports FOR DELETE
  USING (auth.uid() = user_id);

-- Create badges table
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  points_required INTEGER NOT NULL,
  category TEXT NOT NULL, -- 'health', 'fitness', 'diet', 'achievement'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on badges (public read)
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view badges"
  ON public.badges FOR SELECT
  USING (true);

-- Create user_badges table for tracking earned badges
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Enable RLS on user_badges
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own badges"
  ON public.user_badges FOR SELECT
  USING (auth.uid() = user_id);

-- Create achievements table for tracking daily/weekly goals
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL, -- 'daily_login', 'report_generated', 'goal_completed'
  description TEXT NOT NULL,
  points_earned INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on achievements
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own achievements"
  ON public.achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own achievements"
  ON public.achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create health_data table for storing user health metrics
CREATE TABLE public.health_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data_type TEXT NOT NULL, -- 'diabetes', 'alzheimer', 'ckd', 'general'
  metrics JSONB NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on health_data
ALTER TABLE public.health_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own health data"
  ON public.health_data FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own health data"
  ON public.health_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health data"
  ON public.health_data FOR UPDATE
  USING (auth.uid() = user_id);

-- Insert default badges
INSERT INTO public.badges (name, description, icon, points_required, category) VALUES
  ('Health Pioneer', 'Complete your first health assessment', '🏥', 10, 'health'),
  ('Fitness Warrior', 'Complete 10 workouts', '💪', 100, 'fitness'),
  ('Nutrition Expert', 'Track meals for 7 consecutive days', '🥗', 70, 'diet'),
  ('Diabetes Monitor', 'Complete 5 diabetes assessments', '📊', 50, 'health'),
  ('Brain Health Advocate', 'Complete 3 Alzheimer assessments', '🧠', 30, 'health'),
  ('Kidney Health Champion', 'Complete 5 CKD assessments', '🫘', 50, 'health'),
  ('Century Club', 'Earn 100 total points', '💯', 100, 'achievement'),
  ('Consistency King', 'Log in for 30 consecutive days', '👑', 300, 'achievement');

-- Function to update profile timestamps
CREATE OR REPLACE FUNCTION public.update_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for profile updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_profile_updated_at();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
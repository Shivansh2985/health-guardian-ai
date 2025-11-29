import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Star, Award, TrendingUp } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  points_required: number;
  category: string;
}

interface UserBadge {
  badge: Badge;
  earned_at: string;
}

interface Profile {
  total_points: number;
  level: number;
}

export const GamificationPanel = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('total_points, level')
        .eq('id', user.id)
        .single();

      if (profileData) setProfile(profileData);

      // Fetch user badges
      const { data: badgesData } = await supabase
        .from('user_badges')
        .select('*, badge:badges(*)')
        .eq('user_id', user.id);

      if (badgesData) setUserBadges(badgesData as any);

      // Fetch all badges
      const { data: allBadgesData } = await supabase
        .from('badges')
        .select('*')
        .order('points_required');

      if (allBadgesData) setAllBadges(allBadgesData);

      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading || !profile) return null;

  const nextLevelPoints = profile.level * 100;
  const progressToNextLevel = (profile.total_points % 100);

  return (
    <div className="space-y-6">
      {/* Points and Level Card */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-3xl font-bold text-primary">{profile.total_points}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-3xl font-bold text-accent">Level {profile.level}</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {profile.level + 1}</span>
              <span className="text-muted-foreground">{progressToNextLevel}/100</span>
            </div>
            <Progress value={progressToNextLevel} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Earned Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            Your Badges ({userBadges.length}/{allBadges.length})
          </CardTitle>
          <CardDescription>Achievements you've unlocked</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allBadges.map((badge) => {
              const isEarned = userBadges.some(ub => ub.badge.id === badge.id);
              const canEarn = profile.total_points >= badge.points_required;
              
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 rounded-lg text-center transition-all ${
                    isEarned
                      ? 'bg-gradient-to-br from-secondary/20 to-accent/20 border-2 border-secondary'
                      : canEarn
                      ? 'bg-muted/50 border border-border'
                      : 'bg-muted/20 opacity-50 border border-border'
                  }`}
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <div className="font-semibold text-sm mb-1">{badge.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">{badge.description}</div>
                  {isEarned && (
                    <Badge variant="secondary" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Earned
                    </Badge>
                  )}
                  {!isEarned && (
                    <Badge variant="outline" className="text-xs">
                      {badge.points_required} pts
                    </Badge>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
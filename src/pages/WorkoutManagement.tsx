import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dumbbell, Play, TrendingUp, Flame, Clock, Target, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const WorkoutManagement = () => {
  const weeklyWorkouts = [
    { day: 'Mon', duration: 45, calories: 320, sets: 12 },
    { day: 'Tue', duration: 60, calories: 450, sets: 15 },
    { day: 'Wed', duration: 30, calories: 250, sets: 10 },
    { day: 'Thu', duration: 50, calories: 380, sets: 14 },
    { day: 'Fri', duration: 55, calories: 410, sets: 13 },
    { day: 'Sat', duration: 70, calories: 520, sets: 18 },
    { day: 'Sun', duration: 40, calories: 300, sets: 11 },
  ];

  const fitnessRadar = [
    { subject: 'Strength', A: 85, fullMark: 100 },
    { subject: 'Endurance', A: 78, fullMark: 100 },
    { subject: 'Flexibility', A: 65, fullMark: 100 },
    { subject: 'Balance', A: 72, fullMark: 100 },
    { subject: 'Cardio', A: 88, fullMark: 100 },
  ];

  const todayWorkouts = [
    {
      title: 'Morning Cardio',
      duration: '30 min',
      calories: 250,
      exercises: ['Running', 'Jumping Jacks', 'Burpees'],
      completed: true,
    },
    {
      title: 'Strength Training',
      duration: '45 min',
      calories: 380,
      exercises: ['Bench Press', 'Squats', 'Deadlifts', 'Pull-ups'],
      completed: false,
    },
    {
      title: 'Evening Yoga',
      duration: '25 min',
      calories: 120,
      exercises: ['Sun Salutation', 'Warrior Poses', 'Meditation'],
      completed: false,
    },
  ];

  const workoutStats = [
    { label: 'Total Workouts', value: '156', icon: Dumbbell, color: 'text-primary', bgColor: 'bg-primary/10' },
    { label: 'Active Minutes', value: '5,240', icon: Clock, color: 'text-accent', bgColor: 'bg-accent/10' },
    { label: 'Calories Burned', value: '48,300', icon: Flame, color: 'text-secondary', bgColor: 'bg-secondary/10' },
    { label: 'Goals Achieved', value: '12/15', icon: Target, color: 'text-success', bgColor: 'bg-success/10' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold mb-2">Workout Management</h2>
          <p className="text-muted-foreground">Track and optimize your fitness journey</p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          New Workout
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workoutStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 glass-card hover:shadow-large transition-all duration-300">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Weekly Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyWorkouts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
                <Bar dataKey="duration" name="Duration (min)" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                <Bar dataKey="calories" name="Calories" fill="#f87171" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Fitness Radar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Fitness Assessment
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={fitnessRadar}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
                <PolarRadiusAxis stroke="#6b7280" />
                <Radar name="Your Score" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Today's Workouts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6">Today's Workout Plan</h3>
          <div className="space-y-4">
            {todayWorkouts.map((workout, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  workout.completed
                    ? 'bg-success/5 border-success'
                    : 'bg-muted/50 border-transparent hover:border-primary'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold mb-2">{workout.title}</h4>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {workout.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {workout.calories} cal
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={workout.completed ? 'outline' : 'default'}
                    className={workout.completed ? '' : 'gradient-primary shadow-glow'}
                  >
                    {workout.completed ? 'Completed ✓' : <><Play className="w-4 h-4 mr-2" />Start</>}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {workout.exercises.map((exercise, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-background rounded-full text-sm border"
                    >
                      {exercise}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Recommended Workouts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="p-6 glass-card gradient-hero">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">💪 AI Recommendation</h3>
            <p className="text-white/90 mb-4">
              Based on your fitness level and goals, we recommend focusing on strength training this week. 
              Your endurance has improved significantly!
            </p>
            <Button className="bg-white text-primary hover:bg-white/90">
              View Personalized Plan
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default WorkoutManagement;

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Activity, Brain, Heart, TrendingUp, Calendar, Flame, Target, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { GamificationPanel } from '@/components/GamificationPanel';
import { ReportsHistory } from '@/components/ReportsHistory';
import { useAuth } from '@/contexts/AuthContext';

const DashboardHome = () => {
  const { user } = useAuth();
  const healthMetrics = [
    { label: 'Heart Rate', value: '72 bpm', change: '+2%', icon: Heart, color: 'text-secondary', bgColor: 'bg-secondary/10' },
    { label: 'Steps Today', value: '8,432', change: '+12%', icon: Activity, color: 'text-primary', bgColor: 'bg-primary/10' },
    { label: 'Calories Burned', value: '2,341', change: '+8%', icon: Flame, color: 'text-accent', bgColor: 'bg-accent/10' },
    { label: 'Health Score', value: '94/100', change: '+5%', icon: Target, color: 'text-success', bgColor: 'bg-success/10' },
  ];

  const weeklyActivityData = [
    { day: 'Mon', steps: 8000, calories: 2100, water: 6 },
    { day: 'Tue', steps: 9200, calories: 2300, water: 7 },
    { day: 'Wed', steps: 7500, calories: 2000, water: 5 },
    { day: 'Thu', steps: 10500, calories: 2500, water: 8 },
    { day: 'Fri', steps: 8900, calories: 2200, water: 6 },
    { day: 'Sat', steps: 11000, calories: 2600, water: 9 },
    { day: 'Sun', steps: 8432, calories: 2341, water: 7 },
  ];

  const healthDistribution = [
    { name: 'Excellent', value: 45, color: '#10b981' },
    { name: 'Good', value: 30, color: '#22d3ee' },
    { name: 'Fair', value: 20, color: '#f59e0b' },
    { name: 'Needs Attention', value: 5, color: '#ef4444' },
  ];

  const monthlyProgress = [
    { month: 'Jan', healthScore: 85 },
    { month: 'Feb', healthScore: 87 },
    { month: 'Mar', healthScore: 89 },
    { month: 'Apr', healthScore: 91 },
    { month: 'May', healthScore: 93 },
    { month: 'Jun', healthScore: 94 },
  ];

  const recentActivities = [
    { title: 'Morning Yoga', time: '7:00 AM', duration: '30 min', icon: Activity, color: 'text-primary' },
    { title: 'Diabetes Check', time: '9:00 AM', status: 'Normal', icon: Heart, color: 'text-success' },
    { title: 'Healthy Lunch', time: '1:00 PM', calories: '450 cal', icon: Target, color: 'text-secondary' },
    { title: 'Evening Walk', time: '6:00 PM', duration: '45 min', icon: Activity, color: 'text-accent' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-2xl shadow-medium relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 gradient-hero rounded-full blur-3xl opacity-20" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.email?.split('@')[0] || 'User'}! 👋</h2>
          <p className="text-muted-foreground text-lg">
            Your health score is looking great today! Keep up the excellent work.
          </p>
        </div>
      </motion.div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-large transition-all duration-300 glass-card">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <span className="text-sm font-semibold text-success">{metric.change}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Weekly Activity
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyActivityData}>
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
                <Bar dataKey="steps" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                <Bar dataKey="calories" fill="#f87171" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Health Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent" />
              Health Metrics Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={healthDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {healthDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Monthly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-success" />
            6-Month Health Score Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[80, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="healthScore"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Gamification and Reports */}
      <div className="grid lg:grid-cols-2 gap-6">
        <GamificationPanel />
        <ReportsHistory />
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Today's Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className={`w-10 h-10 ${activity.color === 'text-primary' ? 'bg-primary/10' : activity.color === 'text-success' ? 'bg-success/10' : activity.color === 'text-secondary' ? 'bg-secondary/10' : 'bg-accent/10'} rounded-lg flex items-center justify-center`}>
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{activity.title}</div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {activity.duration || activity.status || activity.calories}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardHome;

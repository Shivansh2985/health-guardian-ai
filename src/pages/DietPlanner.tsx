import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Utensils, Apple, Coffee, Sandwich, Pizza, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

const DietPlanner = () => {
  const nutritionData = [
    { name: 'Protein', value: 30, color: '#22d3ee' },
    { name: 'Carbs', value: 45, color: '#f87171' },
    { name: 'Fats', value: 20, color: '#fbbf24' },
    { name: 'Fiber', value: 5, color: '#10b981' },
  ];

  const weeklyCalories = [
    { day: 'Mon', consumed: 2100, target: 2200 },
    { day: 'Tue', consumed: 2300, target: 2200 },
    { day: 'Wed', consumed: 2000, target: 2200 },
    { day: 'Thu', consumed: 2250, target: 2200 },
    { day: 'Fri', consumed: 2150, target: 2200 },
    { day: 'Sat', consumed: 2400, target: 2200 },
    { day: 'Sun', consumed: 2180, target: 2200 },
  ];

  const waterIntake = [
    { time: '8AM', glasses: 2 },
    { time: '10AM', glasses: 3 },
    { time: '12PM', glasses: 5 },
    { time: '2PM', glasses: 6 },
    { time: '4PM', glasses: 7 },
    { time: '6PM', glasses: 8 },
    { time: '8PM', glasses: 8 },
  ];

  const todayMeals = [
    {
      title: 'Breakfast',
      time: '8:00 AM',
      icon: Coffee,
      items: ['Oatmeal with berries', 'Greek yogurt', 'Green tea'],
      calories: 420,
      status: 'completed',
      color: 'text-primary',
    },
    {
      title: 'Lunch',
      time: '1:00 PM',
      icon: Sandwich,
      items: ['Grilled chicken salad', 'Quinoa', 'Fresh juice'],
      calories: 580,
      status: 'completed',
      color: 'text-success',
    },
    {
      title: 'Snack',
      time: '4:00 PM',
      icon: Apple,
      items: ['Mixed nuts', 'Apple slices', 'Protein bar'],
      calories: 250,
      status: 'pending',
      color: 'text-accent',
    },
    {
      title: 'Dinner',
      time: '7:30 PM',
      icon: Pizza,
      items: ['Baked salmon', 'Roasted vegetables', 'Brown rice'],
      calories: 650,
      status: 'pending',
      color: 'text-secondary',
    },
  ];

  const nutritionStats = [
    { label: 'Calories Today', value: '1,250', target: '/ 2,200', icon: Utensils },
    { label: 'Protein', value: '45g', target: '/ 150g', icon: AlertCircle },
    { label: 'Water', value: '8 glasses', target: '/ 8', icon: CheckCircle },
    { label: 'Streak', value: '12 days', target: '', icon: TrendingUp },
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
          <h2 className="text-3xl font-bold mb-2">Diet Planner & Analyzer</h2>
          <p className="text-muted-foreground">Smart nutrition tracking powered by AI</p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Utensils className="w-4 h-4 mr-2" />
          Log Meal
        </Button>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {nutritionStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 glass-card hover:shadow-large transition-all duration-300">
              <stat.icon className="w-8 h-8 text-primary mb-2" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label} {stat.target}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Nutrition Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-bold mb-6">Today's Nutrition Balance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={nutritionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {nutritionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Weekly Calories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-bold mb-6">Weekly Calorie Tracking</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyCalories}>
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
                <Bar dataKey="consumed" name="Consumed" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" name="Target" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Water Intake Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6">Daily Water Intake</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={waterIntake}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
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
                dataKey="glasses"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={{ fill: '#22d3ee', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Today's Meals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6">Today's Meal Plan</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {todayMeals.map((meal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  meal.status === 'completed'
                    ? 'bg-success/5 border-success'
                    : 'bg-muted/50 border-transparent hover:border-primary'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${meal.status === 'completed' ? 'bg-success/10' : 'bg-primary/10'} rounded-xl flex items-center justify-center`}>
                      <meal.icon className={`w-6 h-6 ${meal.color}`} />
                    </div>
                    <div>
                      <h4 className="font-bold">{meal.title}</h4>
                      <p className="text-sm text-muted-foreground">{meal.time}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    meal.status === 'completed'
                      ? 'bg-success/20 text-success'
                      : 'bg-accent/20 text-accent'
                  }`}>
                    {meal.calories} cal
                  </span>
                </div>
                <ul className="space-y-2">
                  {meal.items.map((item, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* AI Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card className="p-6 glass-card gradient-secondary">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">🍎 AI Nutrition Tip</h3>
            <p className="text-white/90 mb-4">
              Great job staying hydrated! However, you're 400 calories below your target today. 
              Consider adding a protein-rich snack to maintain your energy levels and support muscle recovery.
            </p>
            <Button className="bg-white text-secondary hover:bg-white/90">
              View Recommendations
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default DietPlanner;

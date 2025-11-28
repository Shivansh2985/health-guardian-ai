import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Progress } from '@/components/ui/progress';

const DiabetesAnalyzer = () => {
  const bloodSugarData = [
    { time: '6AM', level: 95, type: 'Fasting' },
    { time: '9AM', level: 128, type: 'Post-Breakfast' },
    { time: '12PM', level: 105, type: 'Pre-Lunch' },
    { time: '3PM', level: 142, type: 'Post-Lunch' },
    { time: '6PM', level: 98, type: 'Pre-Dinner' },
    { time: '9PM', level: 135, type: 'Post-Dinner' },
  ];

  const weeklyAverage = [
    { day: 'Mon', morning: 92, afternoon: 118, evening: 105 },
    { day: 'Tue', morning: 96, afternoon: 125, evening: 110 },
    { day: 'Wed', morning: 89, afternoon: 115, evening: 102 },
    { day: 'Thu', morning: 94, afternoon: 132, evening: 108 },
    { day: 'Fri', morning: 91, afternoon: 120, evening: 106 },
    { day: 'Sat', morning: 98, afternoon: 128, evening: 112 },
    { day: 'Sun', morning: 95, afternoon: 125, evening: 107 },
  ];

  const monthlyTrend = [
    { month: 'Jan', avg: 110, hba1c: 6.2 },
    { month: 'Feb', avg: 108, hba1c: 6.1 },
    { month: 'Mar', avg: 112, hba1c: 6.3 },
    { month: 'Apr', avg: 105, hba1c: 6.0 },
    { month: 'May', avg: 107, hba1c: 6.1 },
    { month: 'Jun', avg: 103, hba1c: 5.9 },
  ];

  const riskFactors = [
    { factor: 'Blood Sugar Control', score: 85, status: 'good' },
    { factor: 'Diet Adherence', score: 78, status: 'good' },
    { factor: 'Physical Activity', score: 65, status: 'moderate' },
    { factor: 'Medication Compliance', score: 92, status: 'excellent' },
    { factor: 'Stress Management', score: 58, status: 'needs-improvement' },
  ];

  const metrics = [
    {
      label: 'Current Level',
      value: '105 mg/dL',
      status: 'Normal',
      icon: Activity,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'HbA1c',
      value: '5.9%',
      status: 'Excellent',
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Risk Level',
      value: 'Low',
      status: '15% below avg',
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Next Check',
      value: '2 hours',
      status: 'Post-meal',
      icon: Clock,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-success';
      case 'good': return 'bg-primary';
      case 'moderate': return 'bg-accent';
      case 'needs-improvement': return 'bg-secondary';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold mb-2">Diabetes Analyzer</h2>
          <p className="text-muted-foreground">AI-powered blood sugar monitoring and predictions</p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Activity className="w-4 h-4 mr-2" />
          Log Reading
        </Button>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 glass-card hover:shadow-large transition-all duration-300">
              <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
              <div className="text-xs font-medium text-success">{metric.status}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Today's Blood Sugar Levels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6">Today's Blood Sugar Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={bloodSugarData}>
              <defs>
                <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[70, 160]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="level"
                stroke="#22d3ee"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorLevel)"
              />
              {/* Reference lines */}
              <line y1={180} y2={180} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
              <line y1={70} y2={70} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span>Normal (70-140 mg/dL)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-full" />
              <span>High Risk (&gt;180 mg/dL)</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Weekly Average & Monthly Trend */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-bold mb-6">Weekly Average Readings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyAverage}>
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
                <Bar dataKey="morning" name="Morning" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                <Bar dataKey="afternoon" name="Afternoon" fill="#f87171" radius={[8, 8, 0, 0]} />
                <Bar dataKey="evening" name="Evening" fill="#fbbf24" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-bold mb-6">6-Month HbA1c Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
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
                <Line
                  type="monotone"
                  dataKey="hba1c"
                  name="HbA1c %"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Risk Factors Assessment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6">Risk Factors Assessment</h3>
          <div className="space-y-6">
            {riskFactors.map((factor, index) => (
              <motion.div
                key={factor.factor}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{factor.factor}</span>
                  <span className="text-sm font-semibold">{factor.score}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${getStatusColor(factor.status)} transition-all duration-500 rounded-full`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* AI Prediction & Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="p-6 glass-card gradient-accent">
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">🔮 AI Prediction</h3>
                <p className="text-white/90 mb-4">
                  Based on your recent patterns, your blood sugar may spike after dinner tonight. 
                  Consider reducing carb intake by 20% and taking a 15-minute walk after your meal.
                </p>
                <div className="flex gap-3">
                  <Button className="bg-white text-accent hover:bg-white/90">
                    View Details
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    Set Reminder
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default DiabetesAnalyzer;

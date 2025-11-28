import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, TrendingDown, AlertTriangle, Droplet, Activity } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart } from 'recharts';

const CKDAnalyzer = () => {
  const kidneyMarkers = [
    { month: 'Jan', gfr: 88, creatinine: 1.1, bun: 18 },
    { month: 'Feb', gfr: 87, creatinine: 1.2, bun: 19 },
    { month: 'Mar', gfr: 89, creatinine: 1.1, bun: 17 },
    { month: 'Apr', gfr: 90, creatinine: 1.0, bun: 16 },
    { month: 'May', gfr: 91, creatinine: 1.0, bun: 16 },
    { month: 'Jun', gfr: 92, creatinine: 0.9, bun: 15 },
  ];

  const bloodPressure = [
    { day: 'Mon', systolic: 128, diastolic: 82 },
    { day: 'Tue', systolic: 125, diastolic: 80 },
    { day: 'Wed', systolic: 130, diastolic: 85 },
    { day: 'Thu', systolic: 122, diastolic: 78 },
    { day: 'Fri', systolic: 126, diastolic: 81 },
    { day: 'Sat', systolic: 124, diastolic: 79 },
    { day: 'Sun', systolic: 127, diastolic: 82 },
  ];

  const fluidBalance = [
    { time: '8AM', intake: 250, output: 200 },
    { time: '12PM', intake: 800, output: 650 },
    { time: '4PM', intake: 1200, output: 1000 },
    { time: '8PM', intake: 1800, output: 1600 },
  ];

  const metrics = [
    {
      label: 'eGFR',
      value: '92',
      unit: 'mL/min',
      status: 'Normal',
      icon: Database,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Creatinine',
      value: '0.9',
      unit: 'mg/dL',
      status: 'Optimal',
      icon: Activity,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Blood Pressure',
      value: '127/82',
      unit: 'mmHg',
      status: 'Good',
      icon: TrendingDown,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Hydration',
      value: '1.8L',
      unit: 'today',
      status: 'On Track',
      icon: Droplet,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
  ];

  const riskIndicators = [
    { name: 'Stage', value: 'Stage 1', status: 'Normal kidney function', color: 'text-success' },
    { name: 'Risk Level', value: 'Low', status: 'No immediate concerns', color: 'text-success' },
    { name: 'Progression', value: 'Stable', status: 'Improving trend', color: 'text-primary' },
  ];

  const recommendations = [
    { icon: '💧', title: 'Stay Hydrated', desc: 'Maintain 2L daily water intake', priority: 'High' },
    { icon: '🥗', title: 'Low Sodium Diet', desc: 'Keep sodium under 2300mg/day', priority: 'High' },
    { icon: '💊', title: 'Medication', desc: 'Take prescribed medications on time', priority: 'Critical' },
    { icon: '🏃', title: 'Exercise', desc: '30 min moderate activity daily', priority: 'Medium' },
    { icon: '📊', title: 'Monitor BP', desc: 'Check blood pressure twice daily', priority: 'High' },
    { icon: '🩺', title: 'Regular Checkups', desc: 'Monthly kidney function tests', priority: 'High' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-destructive/10 text-destructive border-destructive';
      case 'High': return 'bg-secondary/10 text-secondary border-secondary';
      case 'Medium': return 'bg-accent/10 text-accent border-accent';
      default: return 'bg-muted text-muted-foreground border-border';
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
          <h2 className="text-3xl font-bold mb-2">Chronic Kidney Disease Analyzer</h2>
          <p className="text-muted-foreground">Advanced kidney function monitoring and AI predictions</p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Database className="w-4 h-4 mr-2" />
          New Reading
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
              <div className="text-3xl font-bold mb-1">
                {metric.value}
                <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
              </div>
              <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
              <div className="text-xs font-medium text-success">{metric.status}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Risk Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6">CKD Risk Assessment</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {riskIndicators.map((indicator, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-muted/50">
                <div className="text-sm text-muted-foreground mb-2">{indicator.name}</div>
                <div className={`text-2xl font-bold ${indicator.color} mb-1`}>{indicator.value}</div>
                <div className="text-sm text-muted-foreground">{indicator.status}</div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Kidney Function Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6">6-Month Kidney Function Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={kidneyMarkers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis yAxisId="left" stroke="#6b7280" />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="gfr"
                name="eGFR"
                fill="#22d3ee"
                stroke="#22d3ee"
                fillOpacity={0.3}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="creatinine"
                name="Creatinine"
                stroke="#f87171"
                strokeWidth={3}
                dot={{ fill: '#f87171', r: 5 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="bun"
                name="BUN"
                stroke="#fbbf24"
                strokeWidth={3}
                dot={{ fill: '#fbbf24', r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Blood Pressure & Fluid Balance */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-bold mb-6">Weekly Blood Pressure</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bloodPressure}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[70, 140]} />
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
                  dataKey="systolic"
                  name="Systolic"
                  stroke="#f87171"
                  strokeWidth={3}
                  dot={{ fill: '#f87171', r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  name="Diastolic"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={{ fill: '#22d3ee', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-bold mb-6">Today's Fluid Balance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fluidBalance}>
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
                <Legend />
                <Bar dataKey="intake" name="Fluid Intake (mL)" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                <Bar dataKey="output" name="Urine Output (mL)" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6">Personalized Recommendations</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-medium ${getPriorityColor(rec.priority)}`}
              >
                <div className="text-3xl mb-2">{rec.icon}</div>
                <h4 className="font-bold mb-1">{rec.title}</h4>
                <p className="text-sm mb-2 opacity-80">{rec.desc}</p>
                <span className="text-xs font-semibold">{rec.priority} Priority</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* AI Prediction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card className="p-6 glass-card gradient-accent">
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">🔮 AI Health Forecast</h3>
                <p className="text-white/90 mb-4">
                  Excellent news! Your kidney function shows consistent improvement over the past 6 months. 
                  Your eGFR has increased by 4.5%, indicating better filtration. Continue your current treatment 
                  plan and maintain strict sodium restriction. Your risk of progression remains very low.
                </p>
                <div className="flex gap-3">
                  <Button className="bg-white text-accent hover:bg-white/90">
                    Download Report
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    Schedule Consultation
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

export default CKDAnalyzer;

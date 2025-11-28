import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, TrendingDown, AlertCircle, CheckCircle, Activity } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';

const AlzheimerAnalyzer = () => {
  const cognitiveTests = [
    { test: 'Memory', score: 85, maxScore: 100 },
    { test: 'Attention', score: 92, maxScore: 100 },
    { test: 'Language', score: 88, maxScore: 100 },
    { test: 'Executive Function', score: 78, maxScore: 100 },
    { test: 'Visuospatial', score: 90, maxScore: 100 },
  ];

  const monthlyTrend = [
    { month: 'Jan', memory: 82, attention: 88, language: 85 },
    { month: 'Feb', memory: 84, attention: 90, language: 86 },
    { month: 'Mar', memory: 83, attention: 89, language: 87 },
    { month: 'Apr', memory: 85, attention: 91, language: 88 },
    { month: 'May', memory: 84, attention: 91, language: 87 },
    { month: 'Jun', memory: 85, attention: 92, language: 88 },
  ];

  const lifestyleFactors = [
    { factor: 'Physical Activity', level: 78 },
    { factor: 'Social Engagement', level: 65 },
    { factor: 'Cognitive Stimulation', level: 82 },
    { factor: 'Sleep Quality', level: 71 },
    { factor: 'Stress Management', level: 68 },
    { factor: 'Nutrition', level: 85 },
  ];

  const metrics = [
    {
      label: 'Cognitive Score',
      value: '86/100',
      status: 'Excellent',
      icon: Brain,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Risk Level',
      value: 'Low',
      status: '12% below avg',
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Trend',
      value: '+2.5%',
      status: 'Improving',
      icon: TrendingDown,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Next Assessment',
      value: '14 days',
      status: 'Scheduled',
      icon: Activity,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
  ];

  const testHistory = [
    {
      date: 'June 15, 2024',
      type: 'Comprehensive Assessment',
      score: 86,
      notes: 'Excellent improvement in memory recall',
    },
    {
      date: 'May 15, 2024',
      type: 'Memory Test',
      score: 84,
      notes: 'Stable performance, continue current routine',
    },
    {
      date: 'April 15, 2024',
      type: 'Comprehensive Assessment',
      score: 83,
      notes: 'Slight improvement in attention span',
    },
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
          <h2 className="text-3xl font-bold mb-2">Alzheimer's Analyzer</h2>
          <p className="text-muted-foreground">AI-powered cognitive health monitoring</p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Brain className="w-4 h-4 mr-2" />
          New Assessment
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

      {/* Cognitive Assessment Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6">Current Cognitive Assessment</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={cognitiveTests}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="test" stroke="#6b7280" />
                <PolarRadiusAxis stroke="#6b7280" domain={[0, 100]} />
                <Radar
                  name="Your Score"
                  dataKey="score"
                  stroke="#22d3ee"
                  fill="#22d3ee"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Test Breakdown</h4>
              {cognitiveTests.map((test, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{test.test}</span>
                    <span className="text-sm font-bold">{test.score}/{test.maxScore}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full"
                      style={{ width: `${test.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* 6-Month Cognitive Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6">6-Month Cognitive Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[75, 95]} />
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
                dataKey="memory"
                name="Memory"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={{ fill: '#22d3ee', r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="attention"
                name="Attention"
                stroke="#f87171"
                strokeWidth={3}
                dot={{ fill: '#f87171', r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="language"
                name="Language"
                stroke="#fbbf24"
                strokeWidth={3}
                dot={{ fill: '#fbbf24', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Lifestyle Factors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6">Lifestyle Factors Impact</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lifestyleFactors} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" domain={[0, 100]} />
              <YAxis dataKey="factor" type="category" stroke="#6b7280" width={150} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar dataKey="level" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Test History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6">Assessment History</h3>
          <div className="space-y-4">
            {testHistory.map((test, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg">{test.type}</h4>
                    <p className="text-sm text-muted-foreground">{test.date}</p>
                  </div>
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-bold text-lg">
                    {test.score}
                  </span>
                </div>
                <p className="text-sm">{test.notes}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="p-6 glass-card gradient-hero">
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">🧠 AI Cognitive Insights</h3>
                <p className="text-white/90 mb-4">
                  Your cognitive performance shows consistent improvement over the past 6 months. 
                  To further enhance brain health, we recommend increasing social engagement activities 
                  and maintaining your current exercise routine. Consider adding puzzle games to your daily routine.
                </p>
                <div className="flex gap-3">
                  <Button className="bg-white text-primary hover:bg-white/90">
                    View Recommendations
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    Schedule Assessment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Brain Health Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-bold mb-6">Daily Brain Health Tips</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: '🧩', title: 'Mental Exercises', desc: '20 min puzzle solving' },
              { icon: '🏃', title: 'Physical Activity', desc: '30 min cardio' },
              { icon: '👥', title: 'Social Connection', desc: 'Engage with friends' },
            ].map((tip, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 border border-border hover:shadow-medium transition-all duration-300"
              >
                <div className="text-3xl mb-2">{tip.icon}</div>
                <h4 className="font-bold mb-1">{tip.title}</h4>
                <p className="text-sm text-muted-foreground">{tip.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AlzheimerAnalyzer;

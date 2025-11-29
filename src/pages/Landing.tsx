import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Activity, Brain, Heart, MessageSquare, TrendingUp, Users, Zap, Shield, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI Health Analysis',
      description: 'Advanced AI algorithms analyze your health data to detect potential risks early',
      gradient: 'from-accent to-accent/70',
    },
    {
      icon: Activity,
      title: 'Workout Management',
      description: 'Personalized workout plans tailored to your fitness goals and health status',
      gradient: 'from-primary to-primary/70',
    },
    {
      icon: Heart,
      title: 'Diet Planning',
      description: 'Smart meal plans and nutrition tracking powered by AI recommendations',
      gradient: 'from-secondary to-secondary/70',
    },
    {
      icon: MessageSquare,
      title: 'AI Health Assistant',
      description: 'Chat with our AI assistant anytime for health guidance and support',
      gradient: 'from-success to-success/70',
    },
  ];

  const stats = [
    { icon: Users, value: '50,000+', label: 'Active Users' },
    { icon: Heart, value: '1M+', label: 'Health Checks' },
    { icon: TrendingUp, value: '95%', label: 'Accuracy Rate' },
    { icon: Clock, value: '24/7', label: 'AI Support' },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'University Student',
      content: 'HealthAI Guardian helped me manage my stress levels and maintain a healthy lifestyle during exams!',
      rating: 5,
    },
    {
      name: 'Rahul Verma',
      role: 'Software Engineer',
      content: 'The AI predictions caught my pre-diabetic condition early. Forever grateful for this platform!',
      rating: 5,
    },
    {
      name: 'Dr. Anjali Desai',
      role: 'Healthcare Professional',
      content: 'An excellent tool for preventive healthcare. The AI analysis is impressively accurate.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 glass-card border-b"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center shadow-glow">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HealthAI Guardian
            </span>
          </motion.div>
          <Button
            onClick={() => navigate('/auth')}
            className="gradient-primary shadow-glow hover:shadow-large transition-all duration-300"
          >
            Sign In
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold text-sm"
            >
              🚀 AI-Powered Healthcare Revolution
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Personal{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                AI Health
              </span>{' '}
              Guardian
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Predict, prevent, and protect your health with cutting-edge AI technology. 
              Early detection of chronic diseases through intelligent monitoring and personalized recommendations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="gradient-hero shadow-glow hover:shadow-large transition-all duration-300 text-lg px-8 py-6"
              >
                Get Started Free
                <Zap className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 hover:bg-muted/50"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative glass-card p-8 rounded-3xl shadow-large">
              <div className="absolute -top-4 -right-4 w-24 h-24 gradient-primary rounded-2xl rotate-12 animate-float shadow-glow" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 gradient-secondary rounded-full animate-pulse-slow opacity-60" />
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop"
                alt="Healthcare Technology"
                className="relative rounded-2xl shadow-medium w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 shadow-medium"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for Your{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Health Journey
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI technology meets compassionate care
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="glass-card p-6 rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 group"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-glow`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-transparent to-muted/20 rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">Simple steps to better health</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { step: '01', title: 'Sign Up', desc: 'Create your account in seconds', icon: Users },
            { step: '02', title: 'Input Data', desc: 'Share your health information securely', icon: Shield },
            { step: '03', title: 'Get Insights', desc: 'Receive AI-powered health predictions', icon: Brain },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="glass-card p-8 rounded-2xl shadow-medium text-center group hover:shadow-large transition-all duration-300">
                <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                <item.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Thousands
          </h2>
          <p className="text-xl text-muted-foreground">Real stories from real users</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl shadow-soft hover:shadow-large transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
              <div>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="gradient-hero rounded-3xl p-12 text-center shadow-large relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust HealthAI Guardian for their health monitoring
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-white text-primary hover:bg-white/90 shadow-large text-lg px-8 py-6"
            >
              Start Your Free Trial
              <Zap className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t">
        <div className="text-center text-muted-foreground">
          <p className="mb-2">© 2024 HealthAI Guardian. All rights reserved.</p>
          <p className="text-sm">Empowering healthier lives through AI innovation</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

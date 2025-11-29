import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Download, Trash2, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HealthReport {
  id: string;
  report_type: string;
  title: string;
  summary: string;
  risk_level: string;
  recommendations: string[];
  created_at: string;
}

export const ReportsHistory = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reports, setReports] = useState<HealthReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchReports = async () => {
      const { data, error } = await supabase
        .from('health_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching reports:', error);
        return;
      }

      setReports(data || []);
      setLoading(false);
    };

    fetchReports();
  }, [user]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('health_reports')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete report',
        variant: 'destructive',
      });
      return;
    }

    setReports(reports.filter(r => r.id !== id));
    toast({
      title: 'Success',
      description: 'Report deleted successfully',
    });
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-500 bg-green-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'high': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  if (loading) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Health Reports History
        </CardTitle>
        <CardDescription>Your AI-generated health analysis reports</CardDescription>
      </CardHeader>
      <CardContent>
        {reports.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No reports yet. Generate your first analysis to see reports here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{report.title}</h3>
                          <Badge className={getRiskColor(report.risk_level)}>
                            {report.risk_level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {report.summary}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(report.created_at).toLocaleDateString()}
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {report.report_type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleDelete(report.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
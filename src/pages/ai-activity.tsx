import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../lib/providers/AuthProvider';
import { Card } from '../components/ui/Card';
import { StatusIndicator } from '../components/ui/StatusIndicator';
import { supabase } from '../lib/supabase';

interface AIActivity {
  id: string;
  type: 'message' | 'payment' | 'reminder';
  description: string;
  created_at: string;
  status: 'success' | 'pending' | 'failed';
  metadata: any;
}

export default function AIActivityPage() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<AIActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadActivities();
    }
  }, [user]);

  const loadActivities = async () => {
    const { data, error } = await supabase
      .from('ai_activities')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setActivities(data);
    }
    setLoading(false);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="glass-card p-6 h-24" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AI Activity - WakilChat</title>
      </Head>

      <div className="min-h-screen bg-[#0A0A0F] py-8">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8 neon-purple">
            AI Assistant Activity
          </h1>

          <div className="space-y-4">
            {activities.map((activity) => (
              <Card key={activity.id} hover>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-purple-400 uppercase">
                          {activity.type}
                        </span>
                        <StatusIndicator status={activity.status} />
                      </div>
                      <p className="text-white mb-2">{activity.description}</p>
                      <p className="text-sm text-gray-400">
                        {formatDate(activity.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {activities.length === 0 && (
              <Card>
                <div className="p-12 text-center">
                  <p className="text-gray-400">No AI activity yet</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
import { useEffect, useState } from 'react';
import AlertCard from '../components/AlertCard';
import { fetchAlerts } from '../services/dataService';
import Loader from '../components/Loader';

const AlertsNotifications = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const response = await fetchAlerts();
        setAlerts(response.data);
      } catch (error) {
        console.error('Alerts fetch failed', error);
      } finally {
        setLoading(false);
      }
    };
    loadAlerts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">Alerts & Notifications</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {alerts.length ? (
          alerts.map((alert, idx) => <AlertCard key={idx} {...alert} />)
        ) : (
          <p className="text-sm text-slate-500">No alerts yet.</p>
        )}
      </div>
    </div>
  );
};

export default AlertsNotifications;



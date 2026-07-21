import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/analyses/dashboard');
        setStats(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Layout>
        <p className="text-sm text-slate-600">Loading dashboard...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">Track your resume analyses and continue improving your job applications.</p>
      </div>

      {error && <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-sm text-slate-500">Total Analyses</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{stats?.totalAnalyses || 0}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Average Match Score</p>
          <p className="mt-2 text-3xl font-bold text-brand-700">{stats?.averageScore || 0}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Active Resume</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {stats?.activeResume?.originalFileName || 'No resume uploaded'}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/analysis/new" className="btn-primary">Run New Analysis</Link>
            <Link to="/analysis/history" className="btn-secondary">View History</Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900">Latest Analysis</h2>
          {stats?.latestAnalysis ? (
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-800">Score:</span> {stats.latestAnalysis.overallScore}/100
              </p>
              <p>
                <span className="font-medium text-slate-800">Role:</span>{' '}
                {stats.latestAnalysis.jobTitle || 'Untitled role'}
              </p>
              <p>
                <span className="font-medium text-slate-800">Company:</span>{' '}
                {stats.latestAnalysis.companyName || 'Not specified'}
              </p>
              <Link
                to={`/analysis/${stats.latestAnalysis._id}`}
                className="inline-block pt-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                View full report
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No analyses yet. Upload a resume and run your first match.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

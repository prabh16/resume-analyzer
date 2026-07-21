import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';

const AnalysisHistory = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState('');

  const fetchAnalyses = async () => {
    try {
      const response = await api.get('/analyses');
      setAnalyses(response.data.data.analyses);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this analysis permanently?');
    if (!confirmed) return;

    setDeletingId(id);
    setError('');

    try {
      await api.delete(`/analyses/${id}`);
      setAnalyses((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId('');
    }
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analysis History</h1>
          <p className="mt-2 text-slate-600">Review, reopen, or delete your previous resume-to-job analyses.</p>
        </div>
        <Link to="/analysis/new" className="btn-primary">New Analysis</Link>
      </div>

      {error && <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

      {loading ? (
        <p className="text-sm text-slate-600">Loading history...</p>
      ) : analyses.length === 0 ? (
        <div className="card">
          <p className="text-sm text-slate-600">No analyses saved yet.</p>
          <Link to="/analysis/new" className="mt-4 inline-block text-sm font-semibold text-brand-600">
            Run your first analysis
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {analyses.map((item) => (
            <div key={item._id} className="card flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">{item.jobTitle || 'Untitled role'}</p>
                <p className="text-sm text-slate-600">{item.companyName || 'Company not specified'}</p>
                <p className="mt-1 text-xs text-slate-500">{new Date(item.createdAt).toLocaleString()}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Match Score</p>
                  <p className="text-2xl font-bold text-brand-700">{item.overallScore}</p>
                </div>
                <Link to={`/analysis/${item._id}`} className="btn-secondary">View Report</Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn-secondary text-rose-700 hover:bg-rose-50"
                  disabled={deletingId === item._id}
                >
                  {deletingId === item._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default AnalysisHistory;

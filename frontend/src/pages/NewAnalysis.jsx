import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';

const NewAnalysis = () => {
  const navigate = useNavigate();
  const [activeResume, setActiveResume] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({ jobTitle: '', companyName: '', jobDescription: '' });
  const [loadingResume, setLoadingResume] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchActiveResume = async () => {
    try {
      const response = await api.get('/resumes/active');
      setActiveResume(response.data.data.resume);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingResume(false);
    }
  };

  useEffect(() => {
    fetchActiveResume();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be 5MB or less.');
      return;
    }

    setSelectedFile(file);
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please choose a PDF resume first.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('resume', selectedFile);
      await api.post('/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Resume uploaded successfully.');
      setSelectedFile(null);
      await fetchActiveResume();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    setUploading(true);
    setError('');

    try {
      await api.delete('/resumes/active');
      setActiveResume(null);
      setSuccess('Resume deleted successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleAnalyze = async (event) => {
    event.preventDefault();
    setAnalyzing(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/analyses', form);
      const analysisId = response.data.data.analysis._id;
      navigate(`/analysis/${analysisId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">New Analysis</h1>
        <p className="mt-2 text-slate-600">Upload your resume and compare it with a specific job description.</p>
      </div>

      {error && <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
      {success && <p className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p>}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900">1. Upload Resume (PDF)</h2>
          <p className="mt-1 text-sm text-slate-500">Maximum file size: 5MB. Only PDF format is supported.</p>

          {loadingResume ? (
            <p className="mt-4 text-sm text-slate-500">Checking current resume...</p>
          ) : activeResume ? (
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-medium text-emerald-800">Current resume: {activeResume.originalFileName}</p>
              <p className="mt-1 text-xs text-emerald-700">
                Uploaded on {new Date(activeResume.uploadedAt).toLocaleString()}
              </p>
              <button onClick={handleDeleteResume} className="btn-secondary mt-3" disabled={uploading}>
                Delete Resume
              </button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No resume uploaded yet.</p>
          )}

          <div className="mt-4">
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="block w-full text-sm" />
          </div>

          <button onClick={handleUpload} className="btn-primary mt-4" disabled={uploading || !selectedFile}>
            {uploading ? 'Uploading...' : activeResume ? 'Replace Resume' : 'Upload Resume'}
          </button>
        </div>

        <form onSubmit={handleAnalyze} className="card">
          <h2 className="text-lg font-semibold text-slate-900">2. Job Description Details</h2>

          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="jobTitle" className="label">Job Title (optional)</label>
              <input id="jobTitle" name="jobTitle" className="input-field" value={form.jobTitle} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="companyName" className="label">Company Name (optional)</label>
              <input id="companyName" name="companyName" className="input-field" value={form.companyName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="jobDescription" className="label">Job Description</label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                rows={12}
                className="input-field"
                placeholder="Paste the full job description here..."
                value={form.jobDescription}
                onChange={handleChange}
                required
                minLength={50}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary mt-6 w-full" disabled={analyzing || !activeResume}>
            {analyzing ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default NewAnalysis;

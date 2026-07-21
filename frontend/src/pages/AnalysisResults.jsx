import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ScoreCard from '../components/dashboard/ScoreCard';
import ScoreBreakdown from '../components/dashboard/ScoreBreakdown';
import KeywordAnalysis from '../components/dashboard/KeywordAnalysis';
import SkillsAnalysis from '../components/dashboard/SkillsAnalysis';
import SectionChecker from '../components/dashboard/SectionChecker';
import Recommendations from '../components/dashboard/Recommendations';
import api from '../services/api';

const AnalysisResults = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await api.get(`/analyses/${id}`);
        setAnalysis(response.data.data.analysis);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <p className="text-sm text-slate-600">Loading analysis report...</p>
      </Layout>
    );
  }

  if (error || !analysis) {
    return (
      <Layout>
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error || 'Analysis not found.'}</p>
        <Link to="/analysis/history" className="mt-4 inline-block text-sm font-semibold text-brand-600">
          Back to history
        </Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analysis Results</h1>
          <p className="mt-2 text-slate-600">
            {analysis.jobTitle || 'Untitled role'}
            {analysis.companyName ? ` at ${analysis.companyName}` : ''}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Analyzed on {new Date(analysis.createdAt).toLocaleString()}
            {analysis.resume?.originalFileName ? ` • Resume: ${analysis.resume.originalFileName}` : ''}
          </p>
        </div>
        <Link to="/analysis/history" className="btn-secondary">View History</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ScoreCard score={analysis.overallScore} />
        </div>
        <div className="lg:col-span-2">
          <ScoreBreakdown breakdown={analysis.scoreBreakdown} />
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <KeywordAnalysis keywords={analysis.keywords} />
        <SkillsAnalysis skills={analysis.skills} />
        <SectionChecker sections={analysis.sections} />
        <Recommendations recommendations={analysis.recommendations} />
      </div>
    </Layout>
  );
};

export default AnalysisResults;

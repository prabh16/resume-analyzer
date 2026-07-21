import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Landing = () => {
  return (
    <Layout>
      <section className="grid items-center gap-10 py-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Smart Resume Matching</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Analyze your resume against any job description
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Upload your PDF resume, paste a job description, and get an estimated ATS compatibility score with
            keyword, skills, and section-level feedback tailored to that role.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register" className="btn-primary">
              Create Free Account
            </Link>
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-brand-50 to-white">
          <h2 className="text-xl font-semibold text-slate-900">What you get</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-700">
            <li>Estimated resume-to-job match score (0–100)</li>
            <li>Keyword and technical skills comparison</li>
            <li>Resume section completeness checker</li>
            <li>Actionable improvement recommendations</li>
            <li>Analysis history saved to your account</li>
          </ul>
          <p className="mt-6 rounded-lg bg-white px-4 py-3 text-xs text-slate-500">
            This tool provides an estimated compatibility score for learning purposes. It is not an official ATS score.
          </p>
        </div>
      </section>

      <section className="grid gap-4 pb-12 sm:grid-cols-3">
        {[
          { title: 'Upload PDF', text: 'Validate file type and size, then extract resume text automatically.' },
          { title: 'Paste Job Description', text: 'Compare your resume against the exact role you are targeting.' },
          { title: 'Improve Strategically', text: 'See score breakdown, missing keywords, and section gaps.' },
        ].map((item) => (
          <div key={item.title} className="card">
            <h3 className="font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.text}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default Landing;

const Recommendations = ({ recommendations }) => {
  if (!recommendations?.length) return null;

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-slate-900">Improvement Recommendations</h3>
      <p className="mt-1 text-sm text-slate-500">Tailored suggestions based on your resume and this job description</p>

      <ul className="mt-6 space-y-3">
        {recommendations.map((item, index) => (
          <li key={index} className="flex gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;

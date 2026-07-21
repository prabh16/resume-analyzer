const KeywordAnalysis = ({ keywords }) => {
  if (!keywords) return null;

  return (
    <div className="card">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Keyword Analysis</h3>
          <p className="mt-1 text-sm text-slate-500">
            Match percentage: <span className="font-semibold text-brand-700">{keywords.matchPercentage}%</span>
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold text-emerald-700">Matched Keywords</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {keywords.matched?.length ? (
              keywords.matched.map((keyword) => (
                <span key={keyword} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {keyword}
                  {keywords.frequency?.[keyword] ? ` (${keywords.frequency[keyword]})` : ''}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">No strong keyword overlap detected yet.</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-rose-700">Missing Keywords</h4>
          <p className="mt-1 text-xs text-slate-500">
            Add these only if you genuinely have the related experience.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {keywords.missing?.length ? (
              keywords.missing.map((keyword) => (
                <span key={keyword} className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
                  {keyword}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">No major missing keywords found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordAnalysis;

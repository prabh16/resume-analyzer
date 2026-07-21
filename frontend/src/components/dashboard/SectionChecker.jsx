const SECTION_LABELS = {
  contactInfo: 'Contact Information',
  summary: 'Summary / Objective',
  technicalSkills: 'Technical Skills',
  projects: 'Projects',
  experience: 'Experience',
  education: 'Education',
  certifications: 'Certifications',
};

const badgeClass = {
  found: 'badge-found',
  missing: 'badge-missing',
  needs_improvement: 'badge-improve',
};

const badgeText = {
  found: 'Found',
  missing: 'Missing',
  needs_improvement: 'Needs Improvement',
};

const SectionChecker = ({ sections }) => {
  if (!sections) return null;

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-slate-900">Resume Section Checker</h3>
      <p className="mt-1 text-sm text-slate-500">Standard sections detected in your uploaded resume</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {Object.entries(sections).map(([key, status]) => (
          <div key={key} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
            <span className="text-sm font-medium text-slate-700">{SECTION_LABELS[key]}</span>
            <span className={badgeClass[status]}>{badgeText[status]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionChecker;

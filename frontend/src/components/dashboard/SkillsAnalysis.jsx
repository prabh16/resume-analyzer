const SkillGroup = ({ title, skills }) => {
  if (!skills?.length) return null;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const SkillsAnalysis = ({ skills }) => {
  if (!skills) return null;

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-slate-900">Skills Analysis</h3>
      <p className="mt-1 text-sm text-slate-500">Comparison between resume skills and job requirements</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div>
          <h4 className="text-sm font-semibold text-emerald-700">Matched Skills</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.matched?.length ? (
              skills.matched.map((skill) => (
                <span key={skill} className="badge-found">{skill}</span>
              ))
            ) : (
              <p className="text-sm text-slate-500">No matched skills detected.</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-rose-700">Missing Requested Skills</h4>
          <p className="mt-1 text-xs text-slate-500">Mention only skills you truly have.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.missing?.length ? (
              skills.missing.map((skill) => (
                <span key={skill} className="badge-missing">{skill}</span>
              ))
            ) : (
              <p className="text-sm text-slate-500">No missing requested skills.</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-brand-700">Additional Resume Skills</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.additional?.length ? (
              skills.additional.map((skill) => (
                <span key={skill} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">No extra skills detected.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-4">
          <h4 className="font-semibold text-slate-800">Resume Skills</h4>
          <div className="mt-4 space-y-4">
            <SkillGroup title="Programming Languages" skills={skills.resumeSkills?.programmingLanguages} />
            <SkillGroup title="Frameworks" skills={skills.resumeSkills?.frameworks} />
            <SkillGroup title="Databases" skills={skills.resumeSkills?.databases} />
            <SkillGroup title="Developer Tools" skills={skills.resumeSkills?.developerTools} />
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <h4 className="font-semibold text-slate-800">Job Description Skills</h4>
          <div className="mt-4 space-y-4">
            <SkillGroup title="Programming Languages" skills={skills.jobSkills?.programmingLanguages} />
            <SkillGroup title="Frameworks" skills={skills.jobSkills?.frameworks} />
            <SkillGroup title="Databases" skills={skills.jobSkills?.databases} />
            <SkillGroup title="Developer Tools" skills={skills.jobSkills?.developerTools} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsAnalysis;

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const LABELS = {
  keywordMatch: 'Keyword Match',
  technicalSkills: 'Technical Skills',
  resumeSections: 'Resume Sections',
  contactInfo: 'Contact Info',
  actionVerbs: 'Action Verbs',
  measurableAchievements: 'Measurable Achievements',
  lengthReadability: 'Length & Readability',
};

const ScoreBreakdown = ({ breakdown }) => {
  const chartData = Object.entries(breakdown || {}).map(([key, value]) => ({
    name: LABELS[key] || key,
    score: value,
  }));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-slate-900">Score Breakdown</h3>
      <p className="mt-1 text-sm text-slate-500">How your estimated match score was calculated</p>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="score" fill="#2563eb" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {chartData.map((item) => (
          <div key={item.name} className="rounded-lg bg-slate-50 px-3 py-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{item.name}</span>
              <span className="font-semibold text-slate-900">{item.score}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-brand-600" style={{ width: `${item.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBreakdown;

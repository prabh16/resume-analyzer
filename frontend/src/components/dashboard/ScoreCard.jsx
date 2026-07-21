import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const ScoreCard = ({ score }) => {
  const chartData = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const scoreColor = score >= 75 ? '#059669' : score >= 50 ? '#d97706' : '#e11d48';

  return (
    <div className="card flex flex-col items-center text-center">
      <p className="text-sm font-medium text-slate-500">Estimated ATS Compatibility Score</p>
      <p className="mt-1 text-xs text-slate-400">Resume-to-job match score (not an official ATS score)</p>
      <div className="relative mt-4 h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={70}
              outerRadius={95}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              <Cell fill={scoreColor} />
              <Cell fill="#e2e8f0" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color: scoreColor }}>
            {score}
          </span>
          <span className="text-sm text-slate-500">/ 100</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;

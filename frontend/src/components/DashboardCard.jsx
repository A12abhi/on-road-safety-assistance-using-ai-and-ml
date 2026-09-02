const DashboardCard = ({ title, value, subtitle, tone = 'blue' }) => {
  const toneMap = {
    blue: 'border-blue-200 bg-blue-50 text-blue-900',
    red: 'border-red-200 bg-red-50 text-red-900',
    green: 'border-green-200 bg-green-50 text-green-900',
    amber: 'border-amber-200 bg-amber-50 text-amber-900',
    slate: 'border-slate-200 bg-white text-slate-900',
  };

  return (
    <article className={`rounded-xl border p-4 shadow-sm ${toneMap[tone] || toneMap.slate}`}>
      <p className="text-xs font-medium uppercase">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      {subtitle && <p className="mt-1 text-xs opacity-80">{subtitle}</p>}
    </article>
  );
};

export default DashboardCard;

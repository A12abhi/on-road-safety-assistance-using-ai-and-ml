const StatCard = ({ title, value, hint }) => (
  <div className="rounded-xl border bg-slate-50 p-4">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="mt-2 text-2xl font-semibold">{value}</p>
    {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
  </div>
);

export default StatCard;

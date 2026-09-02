import { useState } from 'react';
import Layout from './Layout';
import api from '../api/client';
import { downloadReport } from '../utils/pdf';
import { useAuth } from '../context/AuthContext';

const AnalysisFormPage = ({ title, endpoint, fields, formatResult, reportType, disclaimer, submitLabel = 'Analyze' }) => {
  const initial = fields.reduce((acc, f) => ({ ...acc, [f.name]: f.defaultValue || '' }), {});
  const [form, setForm] = useState(initial);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post(endpoint, form);
      setResult(data.result || data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to process request.');
    } finally {
      setLoading(false);
    }
  };

  const onDownload = async () => {
    await downloadReport({
      reportType,
      userInformation: user,
      vehicleInformation: user?.vehicleInformation,
      inputSummary: form,
      result,
      recommendations: [result?.recommendedAction, result?.recommendation, disclaimer].filter(Boolean),
      disclaimer,
    });
  };

  return (
    <Layout title={title}>
      <div className="grid gap-4 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="rounded-xl bg-white p-5 shadow-sm">
          <p className="mb-4 text-sm text-slate-500">Provide details to generate AI/ML or simulation-based output.</p>
          <div className="grid gap-3">
            {fields.map((field) => (
              <label key={field.name} className="text-sm font-medium text-slate-700">
                {field.label}
                {field.type === 'select' ? (
                  <select value={form[field.name]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}>
                    <option value="">Select</option>
                    {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea rows={4} value={form[field.name]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} />
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    placeholder={field.placeholder}
                  />
                )}
              </label>
            ))}
          </div>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="mt-4 bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:bg-blue-300">
            {loading ? 'Processing...' : submitLabel}
          </button>
        </form>

        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold">Result</h3>
          {!result ? (
            <p className="mt-3 text-sm text-slate-500">No result yet.</p>
          ) : (
            <>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                {formatResult(result).map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-slate-100 p-2">
                    <strong>{label}: </strong>{Array.isArray(value) ? value.join(', ') : String(value)}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-amber-700">{disclaimer}</p>
              <button className="mt-3 bg-slate-900 px-4 py-2 text-sm text-white" onClick={onDownload}>Download PDF</button>
            </>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default AnalysisFormPage;

import { useState } from 'react';

const ModuleForm = ({ title, description, fields, onSubmit, result, loading, isSimulation = true, disclaimer }) => {
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue ?? '';
      return acc;
    }, {})
  );
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to process request.');
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      {isSimulation && <p className="mt-1 text-xs text-amber-700">AI/ML or simulation-based output (for demonstration).</p>}
      <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="text-sm">
            <span className="mb-1 block font-medium">{field.label}</span>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required={field.required}
              >
                <option value="">Select</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                className="w-full rounded-lg border p-2"
              />
            )}
          </label>
        ))}
        <div className="md:col-span-2">
          <button disabled={loading} className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-60">
            {loading ? 'Analyzing...' : 'Submit'}
          </button>
        </div>
      </form>
      {error && <p className="mt-3 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
      {result && (
        <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-emerald-300">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
      {disclaimer && <p className="mt-2 text-xs text-slate-500">{disclaimer}</p>}
    </section>
  );
};

export default ModuleForm;

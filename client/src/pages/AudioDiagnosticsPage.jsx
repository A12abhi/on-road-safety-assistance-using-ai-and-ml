import { useState } from 'react';
import api from '../api';
import ReportButton from '../components/ReportButton';

const AudioDiagnosticsPage = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [durationSeconds, setDurationSeconds] = useState('');
  const [roughnessIndex, setRoughnessIndex] = useState('45');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (audioFile) formData.append('audio', audioFile);
    formData.append('fileName', audioFile?.name || 'recorded-audio.wav');
    formData.append('durationSeconds', durationSeconds);
    formData.append('roughnessIndex', roughnessIndex);
    setLoading(true);
    const { data } = await api.post('/api/diagnostics/audio', formData);
    setResult(data.result);
    setLoading(false);
  };

  return (
    <section>
      <h2 className="text-xl font-semibold">Audio Engine Diagnostics</h2>
      <p className="mt-1 text-sm text-slate-500">Simulation-based audio analysis (not a professional mechanical diagnosis).</p>
      <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-2">
        <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} className="rounded border p-2" />
        <input type="number" placeholder="Recording duration (seconds)" className="rounded border p-2" value={durationSeconds} onChange={(e) => setDurationSeconds(e.target.value)} required />
        <input type="number" placeholder="Roughness index (0-100)" className="rounded border p-2" value={roughnessIndex} onChange={(e) => setRoughnessIndex(e.target.value)} required />
        <button disabled={loading} className="rounded bg-blue-600 px-4 py-2 text-white md:col-span-2">{loading ? 'Analyzing...' : 'Analyze Audio'}</button>
      </form>
      {result && (
        <>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-emerald-300">{JSON.stringify(result, null, 2)}</pre>
          <ReportButton reportType="audio-diagnostics" input={{ fileName: audioFile?.name, durationSeconds, roughnessIndex }} result={result} />
        </>
      )}
    </section>
  );
};

export default AudioDiagnosticsPage;

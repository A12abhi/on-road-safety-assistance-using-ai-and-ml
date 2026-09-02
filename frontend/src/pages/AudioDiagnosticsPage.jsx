import { useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/client';
import { downloadReport } from '../utils/pdf';
import { useAuth } from '../context/AuthContext';

const AudioDiagnosticsPage = () => {
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState(12);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    if (file) formData.append('audio', file);
    formData.append('duration', duration);
    formData.append('fileName', file?.name || 'recorded-sample.wav');

    try {
      const { data } = await api.post('/diagnostics/audio', formData);
      setResult(data.result);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to analyze audio.');
    }
  };

  return (
    <Layout title="Audio Engine Diagnostics">
      <div className="grid gap-4 lg:grid-cols-2">
        <form onSubmit={submit} className="rounded-xl bg-white p-5 shadow-sm">
          <label className="text-sm font-medium">Upload engine audio file
            <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mt-2" />
          </label>
          <label className="mt-3 block text-sm font-medium">Recording duration (seconds)
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="mt-2" />
          </label>
          <p className="mt-3 text-xs text-amber-700">Simulation-based audio analysis only. Not a professional mechanical diagnosis.</p>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <button className="mt-4 bg-blue-600 px-4 py-2 text-sm text-white">Analyze Audio</button>
        </form>

        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold">Analysis Result</h3>
          {!result ? <p className="mt-2 text-sm text-slate-500">No analysis generated.</p> : (
            <div className="mt-3 space-y-2 text-sm">
              <p><strong>Audio file name:</strong> {result.audioFileName}</p>
              <p><strong>Recording duration:</strong> {result.recordingDuration} sec</p>
              <p><strong>Analysis status:</strong> {result.analysisStatus}</p>
              <p><strong>Possible engine condition:</strong> {result.possibleEngineCondition}</p>
              <p><strong>Confidence indicator:</strong> {(result.confidenceIndicator * 100).toFixed(1)}%</p>
              <p><strong>Suggested action:</strong> {result.suggestedAction}</p>
              <button
                onClick={() => downloadReport({
                  reportType: 'Audio Diagnostics',
                  userInformation: user,
                  vehicleInformation: user?.vehicleInformation,
                  inputSummary: { fileName: result.audioFileName, duration: result.recordingDuration },
                  result,
                  recommendations: [result.suggestedAction],
                  disclaimer: 'Simulation-based audio evaluation only and not a professional mechanical diagnosis.',
                })}
                className="mt-2 bg-slate-900 px-4 py-2 text-sm text-white"
              >
                Download PDF
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default AudioDiagnosticsPage;

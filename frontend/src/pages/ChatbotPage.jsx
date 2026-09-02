import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/client';

const suggestedQuestions = [
  'My vehicle stopped suddenly.',
  'What should I do for low fuel?',
  'How to handle battery problems?',
  'How can I reduce emission risk?',
];

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const loadHistory = async () => {
    try {
      const { data } = await api.get('/chat');
      setMessages(data.messages || []);
    } catch {
      setMessages([]);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const send = async (message) => {
    if (!message.trim()) return;
    setError('');
    try {
      await api.post('/chat', { message });
      setText('');
      await loadHistory();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to send message.');
    }
  };

  return (
    <Layout title="AI Assistant Chatbot">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-sm text-slate-500">Assistant guidance is informational and intended for safe on-road decision support.</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {suggestedQuestions.map((question) => (
            <button key={question} onClick={() => send(question)} className="bg-slate-100 px-3 py-1 text-xs">{question}</button>
          ))}
          <button onClick={() => window.location.assign('/emergency')} className="bg-red-600 px-3 py-1 text-xs text-white">Emergency Escalation</button>
        </div>

        <div className="h-72 overflow-auto rounded-lg border border-slate-200 p-3">
          {messages.map((m) => (
            <div key={m._id} className={`mb-2 rounded-lg p-2 text-sm ${m.role === 'assistant' ? 'bg-blue-50' : 'bg-slate-100'}`}>
              <strong className="capitalize">{m.role}:</strong> {m.content}
            </div>
          ))}
          {!messages.length && <p className="text-sm text-slate-500">No messages yet.</p>}
        </div>

        <div className="mt-3 flex gap-2">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about breakdown, fuel, engine, maintenance..." />
          <button onClick={() => send(text)} className="bg-blue-600 px-4 py-2 text-white">Send</button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </Layout>
  );
};

export default ChatbotPage;

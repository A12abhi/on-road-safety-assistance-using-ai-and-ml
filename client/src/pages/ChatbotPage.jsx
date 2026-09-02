import { useState } from 'react';
import api from '../api';

const suggested = ['My vehicle stopped suddenly.', 'How to handle low fuel?', 'Engine warning guidance?', 'Insurance plan help'];

const ChatbotPage = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const send = async (text = message, escalate = false) => {
    if (!text.trim()) return;
    const userMessage = { role: 'user', content: text };
    setChat((prev) => [...prev, userMessage]);
    setMessage('');
    const { data } = await api.post('/api/chat', { message: text, escalate });
    setChat((prev) => [...prev, { role: 'assistant', content: data.reply }]);
  };

  return (
    <section>
      <h2 className="text-xl font-semibold">AI Assistant Chatbot</h2>
      <p className="text-sm text-slate-500">Advisory assistant for emergency, fuel, engine, battery, tires, maintenance, emission, and insurance.</p>
      <div className="mt-4 h-72 space-y-2 overflow-y-auto rounded-xl border p-3">
        {chat.map((item, idx) => (
          <div key={idx} className={`rounded p-2 text-sm ${item.role === 'assistant' ? 'bg-blue-50' : 'bg-slate-100'}`}>
            <b>{item.role === 'assistant' ? 'Assistant' : 'You'}:</b> {item.content}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input className="flex-1 rounded border p-2" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask about vehicle assistance..." />
        <button onClick={() => send()} className="rounded bg-blue-600 px-4 text-white">Send</button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {suggested.map((item) => (
          <button key={item} onClick={() => send(item)} className="rounded-full bg-slate-100 px-3 py-1 text-xs">{item}</button>
        ))}
      </div>
      <button onClick={() => send('Emergency escalation requested', true)} className="mt-3 rounded bg-red-600 px-3 py-2 text-sm text-white">Emergency Escalation</button>
    </section>
  );
};

export default ChatbotPage;

import api from '../api/client';

export const downloadReport = async (payload) => {
  const response = await api.post('/reports/pdf', payload, { responseType: 'blob' });
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(payload.reportType || 'report').toLowerCase().replace(/\s+/g, '-')}.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
};

import api from '../api';

const ReportButton = ({ reportType, input, result }) => {
  const download = async () => {
    const response = await api.post(
      `/api/reports/${reportType}/pdf`,
      { input, result },
      { responseType: 'blob' }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportType}-report.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={download} className="mt-3 rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white">
      Download PDF
    </button>
  );
};

export default ReportButton;

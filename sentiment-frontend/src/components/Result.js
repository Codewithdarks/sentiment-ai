import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { AuthContext } from './AuthProvider';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // Import autoTable explicitly

const Result = () => {
  const { state } = useLocation();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const tweets = state?.tweets || null;
  const [analysisResults, setAnalysisResults] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !user.token)) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleAnalysis = async () => {
    if (!tweets || analysisResults.length > 0) return;
    setIsAnalyzing(true);
    setError('');
    try {
      const results = await Promise.all(
        tweets.tweets.map(async (tweet) => {
          const res = await axios.post('/sentiment/analyze', { tweet: tweet.text });
          return {
            text: tweet.text,
            sentiment: res.data.sentiment,
            created_at: tweet.created_at
          };
        })
      );
      setAnalysisResults(results);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to analyze tweets.';
      setError(errorMsg);
      console.error('Analysis Error:', errorMsg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToDatabase = async () => {
    if (!analysisResults.length) return;
    setIsSaving(true);
    setError('');
    setSaveSuccess(false);
    try {
      const res = await axios.post('/sentiment/save-analyzed-tweets', {
        username: tweets.username,
        name: tweets.name,
        tweets: analysisResults
      });
      console.log('Save Response:', res.data);
      setSaveSuccess(true);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to save tweets to database.';
      setError(errorMsg);
      console.error('Save Error:', errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Analyzed Tweets for @${tweets.username} (${tweets.name})`, 14, 10);

    // Prepare table data
    const tableData = analysisResults.map((item) => [
      tweets.username,
      item.text,
      item.sentiment
    ]);

    // Add table using autoTable
    autoTable(doc, { // Use autoTable directly
      startY: 20,
      head: [['Username', 'Text', 'Sentiment']],
      body: tableData,
      styles: { fontSize: 10, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 100 },
        2: { cellWidth: 30 }
      },
      theme: 'striped'
    });

    doc.save(`${tweets.username}_analyzed_tweets.pdf`);
  };

  const exportToCSV = () => {
    const csvContent = [
      "Username,Tweet,Sentiment,Posted",
      ...analysisResults.map(item =>
        `"${tweets.username}","${item.text.replace(/"/g, '""')}","${item.sentiment}","${item.created_at === "Unknown" ? "Unknown" : new Date(item.created_at).toLocaleString()}"`
      )
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${tweets.username}_analyzed_tweets.csv`;
    link.click();
  };

  if (loading) return <div>Loading...</div>;

  if (!tweets) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">No Results</h1>
          <p className="text-gray-600">No tweets were fetched. Please try again from the Twitter page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Twitter Posts for @{tweets.username} {analysisResults.length > 0 ? '(Analyzed)' : ''}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p><strong>Name:</strong> {tweets.name}</p>
          <button
            onClick={handleAnalysis}
            className="mt-4 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition disabled:bg-gray-400"
            disabled={isAnalyzing || analysisResults.length > 0}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Tweets'}
          </button>
          {analysisResults.length > 0 && (
            <>
              <button
                onClick={handleSaveToDatabase}
                className="mt-4 ml-4 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
                disabled={isSaving || saveSuccess}
              >
                {isSaving ? 'Saving...' : saveSuccess ? 'Saved' : 'Save to Database'}
              </button>
              <button
                onClick={exportToPDF}
                className="mt-4 ml-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
              >
                Export to PDF
              </button>
              <button
                onClick={exportToCSV}
                className="mt-4 ml-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
              >
                Export to CSV
              </button>
            </>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {saveSuccess && <p className="text-green-500 mt-4">Tweets saved to database successfully!</p>}
          <ul className="space-y-4 mt-4">
            {(analysisResults.length > 0 ? analysisResults : tweets.tweets).map((item, index) => (
              <li key={index} className="border-b pb-2">
                <p><strong>Tweet:</strong> {item.text}</p>
                {analysisResults.length > 0 && (
                  <p><strong>Sentiment:</strong> {item.sentiment}</p>
                )}
                <p className="text-sm text-gray-600">
                  Posted: {item.created_at === "Unknown" ? "Unknown" : new Date(item.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Result;
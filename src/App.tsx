import React, { useState } from 'react';
import { Send, Code2, LineChart } from 'lucide-react';

interface Visualization {
  type: 'image' | 'html';
  content: string;
}

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'r'>('python');
  const [code, setCode] = useState('');
  const [visualization, setVisualization] = useState<Visualization | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: selectedLanguage, code }),
      });

      const data = await response.json();

      const result: Visualization = {
        type: data.type,
        content: `http://localhost:8000${data.content}`,
      };

      setVisualization(result);
    } catch (err) {
      alert('Error generating visualization.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-2">
          <LineChart className="w-8 h-8 text-red-600" />
          <h1 className="text-xl font-semibold text-gray-900">Script to Chart: Visualization Generator</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Language Selector */}
          <div className="mb-4">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as 'python' | 'r')}
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-4 py-2 text-gray-700"
            >
              <option value="python">Python</option>
              <option value="r">R</option>
            </select>
          </div>

          {/* Code Editor */}
          <div className="relative mb-4">
            <div className="absolute left-3 top-3">
              <Code2 className="w-5 h-5 text-gray-400" />
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="# Write your Python or R visualization code here..."
              className="w-full h-64 pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono text-sm resize-none"
              spellCheck="false"
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !code.trim()}
              className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>

          {/* Visualization Display */}
          {(visualization || isLoading) && (
            <div className="border-t pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Generated Visualization</h2>
              <div className="bg-gray-50 rounded-lg p-4 flex justify-center items-center min-h-[400px]">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                ) : visualization?.type === 'image' ? (
                  <img
                    src={visualization!.content}
                    alt="Generated visualization"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                ) : (
                  <iframe
                    src={visualization!.content}
                    title="Interactive visualization"
                    className="w-full h-[500px] border rounded-lg shadow-md"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

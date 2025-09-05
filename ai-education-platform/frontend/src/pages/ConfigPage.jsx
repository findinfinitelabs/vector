import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ConfigPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paths, setPaths] = useState({});
  const [selectedPathId, setSelectedPathId] = useState(null);
  const [newPath, setNewPath] = useState({ id: '', title: '', proficiency: '', modules: [] });
  const [newModule, setNewModule] = useState({ id: '', title: '', activityType: 'quiz', activity: '', questions: [], prompt: '', task: '', correctKeywords: [], correctResponse: '', options: [], correct: [], points: 0 });
  const [llmQuery, setLlmQuery] = useState('');
  const [llmSuggestion, setLlmSuggestion] = useState('');

  useEffect(() => {
    fetchPaths();
  }, []);

  const fetchPaths = async () => {
    const response = await fetch('http://localhost:5001/api/paths');
    const data = await response.json();
    setPaths(data);
  };

  const savePath = async () => {
    await fetch('http://localhost:5001/api/paths', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPath),
    });
    fetchPaths();
    setNewPath({ id: '', title: '', proficiency: '', modules: [] });
  };

  const addModule = () => {
    const updatedPath = { ...paths[selectedPathId], modules: [...paths[selectedPathId].modules, newModule] };
    setNewPath(updatedPath);
    setNewModule({ id: '', title: '', activityType: 'quiz', activity: '', questions: [], prompt: '', task: '', correctKeywords: [], correctResponse: '', options: [], correct: [], points: 0 });
    savePath(updatedPath);
  };

  const handleGenerate = async () => {
    const response = await fetch('http://localhost:5001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: llmQuery }),
    });
    const data = await response.json();
    setLlmSuggestion(data.suggestion);
    // Apply suggestion to form (e.g., parse questions)
  };

  if (!user) {
    navigate('/'); // Redirect if not logged in
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Configure Learning Paths</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Add/Update Path</h2>
          <input
            type="text"
            placeholder="Path ID (e.g., 7)"
            value={newPath.id}
            onChange={(e) => setNewPath({ ...newPath, id: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Title"
            value={newPath.title}
            onChange={(e) => setNewPath({ ...newPath, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <select
            value={newPath.proficiency}
            onChange={(e) => setNewPath({ ...newPath, proficiency: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          >
            <option value="">Select Proficiency</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <button
            onClick={savePath}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition duration-200"
          >
            Save Path
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Select Path to Edit Modules</h2>
          <select
            value={selectedPathId}
            onChange={(e) => setSelectedPathId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          >
            <option value="">Select Path</option>
            {Object.keys(paths).map((id) => (
              <option key={id} value={id}>{paths[id].title}</option>
            ))}
          </select>
          {selectedPathId && (
            <div>
              <h3 className="text-md font-medium mb-2">Add Module</h3>
              <input
                type="text"
                placeholder="Module ID (e.g., 4)"
                value={newModule.id}
                onChange={(e) => setNewModule({ ...newModule, id: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
              <input
                type="text"
                placeholder="Title"
                value={newModule.title}
                onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
              <select
                value={newModule.activityType}
                onChange={(e) => setNewModule({ ...newModule, activityType: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              >
                <option value="quiz">Quiz</option>
                <option value="prompt">Prompt Exercise</option>
                <option value="coding">Coding Task</option>
                <option value="interactive">Interactive Task</option>
              </select>
              {/* Conditional fields for activity type */}
              {newModule.activityType === 'quiz' && (
                <div>
                  <textarea
                    placeholder="Questions JSON (e.g., [{'question': '...', 'options': [...], 'correct': '...'}])"
                    onChange={(e) => setNewModule({ ...newModule, questions: JSON.parse(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  />
                </div>
              )}
              {newModule.activityType === 'prompt' && (
                <div>
                  <input
                    type="text"
                    placeholder="Prompt Text"
                    value={newModule.prompt}
                    onChange={(e) => setNewModule({ ...newModule, prompt: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Correct Keywords (comma-separated)"
                    onChange={(e) => setNewModule({ ...newModule, correctKeywords: e.target.value.split(',') })}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  />
                </div>
              )}
              {newModule.activityType === 'coding' && (
                <div>
                  <input
                    type="text"
                    placeholder="Task Description"
                    value={newModule.task}
                    onChange={(e) => setNewModule({ ...newModule, task: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Correct Response Regex (e.g., /mean.*fillna/)"
                    onChange={(e) => setNewModule({ ...newModule, correctResponse: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  />
                </div>
              )}
              {newModule.activityType === 'interactive' && (
                <div>
                  <textarea
                    placeholder="Options/Scenarios JSON (e.g., [{'scenario': '...', 'category': '...'}])"
                    onChange={(e) => setNewModule({ ...newModule, scenarios: JSON.parse(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  />
                </div>
              )}
              <input
                type="number"
                placeholder="Points"
                value={newModule.points}
                onChange={(e) => setNewModule({ ...newModule, points: parseInt(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Ask LLM for help (e.g., Generate 5 quiz questions for AI Basics)"
                  value={llmQuery}
                  onChange={(e) => setLlmQuery(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mr-2"
                />
                <button
                  onClick={handleGenerate}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-200"
                >
                  Generate
                </button>
              </div>
              {llmSuggestion && (
                <p className="text-sm text-gray-600 mb-4">LLM Suggestion: {llmSuggestion}</p>
              )}
              <button
                onClick={addModule}
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition duration-200"
              >
                Add Module
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfigPage;
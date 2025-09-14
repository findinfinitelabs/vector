import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function LearningPathPage() {
  const { user } = useAuth();
  const { pathId } = useParams();
  const navigate = useNavigate();

  const [path, setPath] = useState({ title: 'Unknown Path', modules: [] });
  const [completedModules, setCompletedModules] = useState([]);
  const [points, setPoints] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch('http://localhost:5001/api/paths')
      .then((res) => res.json())
      .then((data) => {
        const selectedPath = data[pathId] || { title: 'Unknown Path', modules: [] };
        setPath(selectedPath);
      })
      .catch(() => setPath({ title: 'Unknown Path', modules: [] }));
  }, [pathId]);

  if (!user) {
    navigate('/'); // Redirect to login if not authenticated
    return null;
  }

  const handleQuizAnswer = (moduleId, questionIndex, answer) => {
    setAnswers({ ...answers, [`${moduleId}-${questionIndex}`]: answer });
  };

  const handlePromptInput = (moduleId, input) => {
    setAnswers({ ...answers, [moduleId]: input });
  };

  const handleCodingInput = (moduleId, input) => {
    setAnswers({ ...answers, [moduleId]: input });
  };

  const handleInteractiveAnswer = (moduleId, index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [moduleId]: {
        ...(prev[moduleId] || {}),
        [index]: value,
      },
    }));
  };

  const completeModule = async (moduleId) => {
    const module = path.modules.find((m) => m.id === moduleId);
    if (!module || completedModules.includes(moduleId)) return;

    const submission = {
      email: user.email,
      pathId,
      moduleId,
      answers: module.activityType === 'interactive' ? Object.values(answers[moduleId] || {}) : answers[moduleId],
    };

    try {
      const response = await fetch('http://localhost:5001/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setCompletedModules([...completedModules, moduleId]);
        setPoints(points + data.points);
      } else {
        alert(data.error || 'Incorrect answers. Please try again.');
      }
    } catch (err) {
      alert('Failed to submit activity. Please try again.');
    }
  };

  const renderActivity = (module) => {
    const moduleIndex = path.modules.findIndex((m) => m.id === module.id);
    const isUnlocked = moduleIndex === 0 || completedModules.includes(path.modules[moduleIndex - 1]?.id);

    if (!isUnlocked) {
      return <p className="text-gray-500">Locked - Complete previous module</p>;
    }

    if (completedModules.includes(module.id)) {
      return <p className="text-accent font-semibold">Completed!</p>;
    }

    if (module.activityType === 'quiz') {
      return (
        <div>
          <h3 className="text-md font-medium mb-2">{module.activity}</h3>
          {module.questions.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{q.question}</p>
              {q.options.map((option, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={`q${module.id}-${index}`}
                    value={option}
                    onChange={() => handleQuizAnswer(module.id, index, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button
            onClick={() => completeModule(module.id)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-200"
          >
            Submit Quiz
          </button>
        </div>
      );
    } else if (module.activityType === 'prompt') {
      return (
        <div>
          <h3 className="text-md font-medium mb-2">{module.activity}</h3>
          <p className="text-sm text-gray-600 mb-2">{module.prompt}</p>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Write your response here..."
            onChange={(e) => handlePromptInput(module.id, e.target.value)}
          />
          <button
            onClick={() => completeModule(module.id)}
            className="mt-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-200"
          >
            Submit Prompt
          </button>
        </div>
      );
    } else if (module.activityType === 'coding') {
      return (
        <div>
          <h3 className="text-md font-medium mb-2">{module.activity}</h3>
          <p className="text-sm text-gray-600 mb-2">{module.task}</p>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md font-mono"
            placeholder="Write your code here..."
            rows="6"
            onChange={(e) => handleCodingInput(module.id, e.target.value)}
          />
          <button
            onClick={() => completeModule(module.id)}
            className="mt-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-200"
          >
            Submit Code
          </button>
        </div>
      );
    } else if (module.activityType === 'interactive') {
      return (
        <div>
          <h3 className="text-md font-medium mb-2">{module.activity}</h3>
          <p className="text-sm text-gray-600 mb-2">Select the correct categories for each scenario:</p>
          {module.scenarios?.map((scenario, index) => (
            <div key={index} className="mb-2">
              <p>{scenario.scenario}</p>
              <select
                onChange={(e) => handleInteractiveAnswer(module.id, index, e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                value={answers[module.id]?.[index] || ''}
              >
                <option value="">Select category</option>
                {['Recommendation Systems', 'Speech Recognition', 'Route Optimization', 'Classification', 'Computer Vision', 'Robotics'].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          ))}
          <button
            onClick={() => completeModule(module.id)}
            className="mt-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-200"
          >
            Submit Answers
          </button>
        </div>
      );
    }
    return <p>Activity not implemented</p>;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">{path.title}</h1>
        <p className="text-lg mb-4">Points Earned: {points}</p>
        <div className="space-y-6">
          {path.modules.map((module) => (
            <div key={module.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-md font-medium mb-2">{module.title}</h2>
              <p className="text-sm text-gray-600 mb-4">Activity: {module.activity}</p>
              {renderActivity(module)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningPathPage;
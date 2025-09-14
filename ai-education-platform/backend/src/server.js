const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const USERS_FILE = path.join(__dirname, 'users.json');
const PATHS_FILE = path.join(__dirname, 'paths.json');

// Initialize files
async function initializeUsersFile() {
  try {
    await fs.access(USERS_FILE);
  } catch (error) {
    await fs.writeFile(USERS_FILE, JSON.stringify([]));
  }
}

async function initializePathsFile() {
  try {
    await fs.access(PATHS_FILE);
  } catch (error) {
    await fs.writeFile(PATHS_FILE, JSON.stringify({}));
  }
}

// Read/write helpers
async function readUsers() {
  const data = await fs.readFile(USERS_FILE, 'utf8');
  return JSON.parse(data);
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function readPaths() {
  const data = await fs.readFile(PATHS_FILE, 'utf8');
  return JSON.parse(data);
}

async function writePaths(pathsData) {
  await fs.writeFile(PATHS_FILE, JSON.stringify(pathsData, null, 2));
}

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const users = await readUsers();
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword, progress: {}, points: 0 });
  await writeUsers(users);

  res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const users = await readUsers();
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ user: { email, progress: user.progress, points: user.points } });
});

// Get all paths
app.get('/api/paths', async (req, res) => {
  const pathsData = await readPaths();
  res.json(pathsData);
});

// Get single path
app.get('/api/paths/:pathId', async (req, res) => {
  const pathsData = await readPaths();
  const path = pathsData[req.params.pathId];
  if (!path) {
    return res.status(404).json({ error: 'Path not found' });
  }
  res.json(path);
});

// Create or update path
app.post('/api/paths', async (req, res) => {
  const newPath = req.body;
  if (!newPath.id || !newPath.title || !newPath.proficiency) {
    return res.status(400).json({ error: 'Path ID, title, and proficiency are required' });
  }
  const pathsData = await readPaths();
  pathsData[newPath.id] = newPath;
  await writePaths(pathsData);
  res.status(201).json({ message: 'Path saved' });
});

// Generate LLM help (placeholder)
app.post('/api/generate', (req, res) => {
  const { query } = req.body;
  let response = 'Here are 5 quiz questions for AI Basics:\n1. Question 1...\n2. Question 2...';
  if (query.includes('generate questions')) {
    response = 'Generated questions: 1. What is AI? [Options]...';
  } else if (query.includes('suggest prompt')) {
    response = 'Suggested prompt: Write a function...';
  }
  res.json({ suggestion: response });
});

// Activities endpoint (validate and update progress)
app.post('/api/activities', async (req, res) => {
  const { email, pathId, moduleId, answers } = req.body;
  if (!email || !pathId || !moduleId || !answers) {
    return res.status(400).json({ error: 'Email, pathId, moduleId, and answers are required' });
  }

  const users = await readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const paths = await readPaths();
  const module = paths[pathId]?.modules.find((m) => m.id === parseInt(moduleId));
  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }

  let isCorrect = false;
  if (module.activityType === 'quiz') {
    isCorrect = module.questions.every((q, index) => answers[`${moduleId}-${index}`] === q.correct);
  } else if (module.activityType === 'prompt') {
    isCorrect = module.correctKeywords.every((keyword) =>
      answers?.toLowerCase().includes(keyword.toLowerCase())
    );
  } else if (module.activityType === 'coding') {
    try {
      const regex = new RegExp(module.correctResponse.replace(/^\/|\/$/g, '')); // Remove / delimiters
      isCorrect = regex.test(answers || '');
    } catch {
      isCorrect = false;
    }
  } else if (module.activityType === 'interactive') {
    isCorrect = module.scenarios.every((s, i) => answers[i] === s.category);
  }

  if (!isCorrect) {
    return res.status(400).json({ error: 'Incorrect answers', success: false });
  }

  user.progress[pathId] = user.progress[pathId] || [];
  if (!user.progress[pathId].includes(moduleId)) {
    user.progress[pathId].push(moduleId);
    user.points += module.points || 0;
    await writeUsers(users);
    res.json({ success: true, points: module.points });
  } else {
    res.json({ success: false, error: 'Module already completed' });
  }
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Initialize and start server
Promise.all([initializeUsersFile(), initializePathsFile()]).then(() => {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
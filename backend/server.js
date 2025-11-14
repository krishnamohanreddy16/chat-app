// backend/server.js
const express = require("express");
const cors = require("cors");
const { sessions, createStructuredAnswer } = require("./mockData");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// helper to generate simple unique id
function newId() {
  return "sess-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

// GET /api/sessions -> list sessions
app.get("/api/sessions", (req, res) => {
  const list = sessions.map(s => ({ id: s.id, title: s.title, createdAt: s.createdAt }));
  res.json(list);
});

// GET /api/new-chat -> new session id
app.get("/api/new-chat", (req, res) => {
  const id = newId();
  const title = "New Chat " + (sessions.length + 1);
  const newSession = { id, title, createdAt: Date.now(), messages: [] };
  sessions.unshift(newSession); // add to front
  res.json({ id, title });
});

// GET /api/session/:id -> full conversation for session id
app.get("/api/session/:id", (req, res) => {
  const { id } = req.params;
  const s = sessions.find(sess => sess.id === id);
  if (!s) return res.status(404).json({ error: "Session not found" });
  res.json(s);
});

// POST /api/chat/:id -> accept { question } and return mock response
app.post("/api/chat/:id", (req, res) => {
  const { id } = req.params;
  const { question } = req.body || {};
  if (!question) return res.status(400).json({ error: "Missing question in body" });

  const s = sessions.find(sess => sess.id === id);
  if (!s) return res.status(404).json({ error: "Session not found" });

  // push user message
  const userMsg = { role: "user", text: question, time: Date.now() };
  s.messages.push(userMsg);

  // produce mock structured answer
  const ans = createStructuredAnswer(question);
  const assistantMsg = {
    role: "assistant",
    text: ans.text,
    time: Date.now() + 5,
    table: ans.table
  };
  s.messages.push(assistantMsg);

  res.json({ answer: assistantMsg });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on port ${PORT}`);
});

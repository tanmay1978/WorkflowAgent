const express = require('express');
const { createAgent, executeAgent } = require('../ai/llmIntegration');

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { name, tasks, workflow } = req.body;
    const agent = await createAgent(name, tasks, workflow);
    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/execute/:agentId', async (req, res) => {
  try {
    const result = await executeAgent(req.params.agentId, req.body.input);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

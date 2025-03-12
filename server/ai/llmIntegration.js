const axios = require('axios');

// Store agents in memory (could be replaced with a database)
const agents = new Map();

// Configuration for Together AI API
const TOGETHER_API_URL = 'https://api.together.xyz/v1/chat/completions';
const TOGETHER_API_KEY = 'YOUR_TOGETHER_API_KEY'; // Replace with your Together AI API key
const MODEL = 'meta-llama/Llama-2-7b-chat-hf'; // Example model; check Together AI docs for available options
const MAX_TOKENS = 500; // Maximum output tokens
const TEMPERATURE = 0.7; // Controls randomness

// Create a new agent with a name, tasks, and workflow
async function createAgent(name, tasks, workflow) {
  const agent = {
    id: Date.now().toString(),
    name,
    tasks,
    workflow,
    createdAt: new Date(),
  };
  agents.set(agent.id, agent);
  return agent;
}

// Execute an agent’s workflow using Together AI
async function executeAgent(agentId, input) {
  const agent = agents.get(agentId);
  if (!agent) throw new Error('Agent not found');

  let currentInput = input;
  for (const step of agent.workflow) {
    const prompt = `Task: ${step.task}\nInput: ${currentInput}`;
    try {
      currentInput = await runLlamaModel(prompt);
    } catch (error) {
      throw new Error(`Failed to execute step: ${error.message}`);
    }
  }
  return currentInput;
}

// Call the Together AI API to generate text
async function runLlamaModel(prompt) {
  try {
    const response = await axios.post(
      TOGETHER_API_URL,
      {
        model: MODEL,
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' }, // Optional system prompt
          { role: 'user', content: prompt },
        ],
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
        top_p: 0.9, // Optional: controls diversity
      },
      {
        headers: {
          'Authorization': `Bearer ${TOGETHER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data && response.data.choices && response.data.choices[0].message) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('Invalid response from Together AI API');
    }
  } catch (error) {
    throw new Error(`Together AI API request failed: ${error.response?.data?.error || error.message}`);
  }
}

module.exports = { createAgent, executeAgent };

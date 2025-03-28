
# Agent Workflow Web Application

## Overview

The **Agent Workflow Web Application** is a full-stack solution designed to create and manage AI-powered agents that perform specific tasks. Built with JavaScript, Node.js, and React, this application provides a visual interface for designing workflows using a drag-and-drop canvas. It integrates with the **Together AI API** to power the agents with open-source language models like LLaMA-2, enabling them to process inputs and execute tasks based on user-defined workflows.

This project aims to simplify the creation of task-specific AI agents by offering:
- A visual editor to design workflows.
- A backend API to manage agent creation and execution.
- Seamless integration with hosted AI models via Together AI.

### What It Can Do
- **Create AI Agents**: Define agents with specific tasks (e.g., text generation, data analysis, or custom processing).
- **Visual Workflow Design**: Use a drag-and-drop interface to connect nodes (input, task, output) and build execution flows.
- **Task Execution**: Run agents with custom inputs and get AI-generated outputs based on the workflow.
- **Extensibility**: Easily modify to support additional node types, tasks, or models.
- **Real-Time Interaction**: See workflow changes instantly and configure nodes on the fly.

This tool is ideal for developers, hobbyists, or anyone interested in experimenting with AI agents in a user-friendly, visual environment.

---

## Project Structure

```
agent-workflow-app/
├── client/                  # Frontend (React)
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── WorkflowCanvas.js
│   │   │   ├── NodePanel.js
│   │   │   ├── AgentConfig.js
│   │   └── └── Toolbox.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
├── server/                  # Backend (Node.js)
│   ├── models/
│   │   └── agentModel.js
│   ├── routes/
│   │   └── agentRoutes.js
│   ├── ai/
│   │   └── llmIntegration.js
│   ├── server.js
│   └── config.js
├── package.json
└── README.md
```

---

## Prerequisites

Before setting up the project, ensure you have the following:
- **Node.js** (v16 or higher) and **npm** (v7 or higher).
- **Git** (for cloning the repository).
- A **Together AI API Key** (sign up at [together.ai](https://together.ai) to get one).

---

## Setup Process

Follow these steps to set up and run the Agent Workflow Web Application locally:

### Step 1: Clone the Repository
1. Open your terminal.
2. Clone the repository:
   ```bash
   git clone https://github.com/your-username/agent-workflow-app.git
   ```
3. Navigate to the project directory:
   ```bash
   cd agent-workflow-app
   ```

### Step 2: Install Dependencies
1. Install root-level dependencies:
   ```bash
   npm install
   ```
2. Navigate to the `client` directory and install frontend dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

### Step 3: Configure Together AI API
The application uses the Together AI API to access open-source models like LLaMA-2. Follow these steps:
1. **Sign Up**: Create an account at [together.ai](https://together.ai).
2. **Get API Key**: Go to the API section in your Together AI dashboard and copy your API key.
3. **Update Configuration**: Open `server/ai/llmIntegration.js` and replace the placeholder API key:
   ```javascript
   const TOGETHER_API_KEY = 'YOUR_TOGETHER_API_KEY'; // Replace with your actual key
   ```
4. **Optional**: Adjust the `MODEL` variable in `llmIntegration.js` to use a different model (e.g., `mistralai/Mixtral-8x7B-Instruct-v0.1`). See [Together AI’s model list](https://docs.together.ai/docs/models) for options.

### Step 4: Start the Application
1. From the root directory, run both the server and client concurrently:
   ```bash
   npm run dev
   ```
   - This uses `concurrently` to start the Node.js server (`npm run start`) and the React client (`npm run client`).
2. The server will run on `http://localhost:5000`, and the React app will open at `http://localhost:3000` in your browser.

### Step 5: Verify the Setup
1. Open your browser and navigate to `http://localhost:3000`.
2. You should see the visual workflow editor with a toolbox on the left and a canvas on the right.
3. Test creating a simple workflow:
   - Drag nodes from the toolbox (e.g., Input, Task, Output).
   - Connect them to form a flow.
   - Configure tasks in the node panel.

### Step 6: Test Agent Creation and Execution
1. Use the API to create an agent:
   - Send a POST request to `http://localhost:5000/api/agents/create` with a payload like:
     ```json
     {
       "name": "TestAgent",
       "tasks": ["Generate text"],
       "workflow": [{"task": "Generate a greeting"}]
     }
     ```
2. Execute the agent:
   - Send a POST request to `http://localhost:5000/api/agents/execute/<agentId>` with an input:
     ```json
     {
       "input": "Hello"
     }
     ```
3. Check the response for AI-generated output from the Together AI API.

---

## Usage

1. **Design Workflow**:
   - Use the Toolbox to add nodes (Input, Task, Output).
   - Connect nodes on the Workflow Canvas to define the agent’s execution flow.
   - Configure each node’s task in the Node Panel.

2. **Create Agent**:
   - Save the workflow and send it to the backend via the API to create an agent.

3. **Execute Agent**:
   - Provide an input and run the agent to see the AI process it through the workflow.

---

## Troubleshooting

- **API Key Issues**: Ensure your Together AI API key is correct and has credits (check the Together AI dashboard).
- **Server Errors**: Verify port `5000` is free and check the console for logs.
- **Frontend Not Loading**: Confirm React dependencies are installed and port `3000` is available.
- **No Output**: Test the Together AI API directly with `curl` (see below) to ensure it’s working.

**Test Together AI API**:
```bash
curl -X POST https://api.together.xyz/v1/chat/completions \
  -H "Authorization: Bearer YOUR_TOGETHER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "meta-llama/Llama-2-7b-chat-hf", "messages": [{"role": "user", "content": "Hi!"}], "max_tokens": 50}'
```

---

## Extending the Project

- **Add More Node Types**: Expand `Toolbox.js` with custom nodes (e.g., Decision, Loop).
- **Switch Models**: Update the `MODEL` in `llmIntegration.js` to use other Together AI models (e.g., LLaMA-3, Mistral).
- **Persistence**: Add a database (e.g., MongoDB) to store agents and workflows.
- **Authentication**: Implement user login for secure access.

---

## Contributing

Feel free to fork this repository, submit pull requests, or open issues for bugs and feature requests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

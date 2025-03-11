const express = require('express');
const cors = require('cors');
const agentRoutes = require('./routes/agentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/agents', agentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

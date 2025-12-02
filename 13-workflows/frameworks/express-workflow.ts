/**
 * Cost Katana Workflows: Express.js Integration
 * 
 * Integrate workflows into Express REST API.
 */

import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const API_BASE = 'https://api.costkatana.com/api';
const API_KEY = process.env.COST_KATANA_API_KEY;

// Create and execute workflow endpoint
app.post('/api/workflows/execute', async (req, res) => {
  try {
    const { templateId, variables } = req.body;
    
    // Execute workflow
    const response = await axios.post(
      `${API_BASE}/workflows/templates/${templateId}/execute`,
      { variables },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json({
      success: true,
      execution: response.data.data
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

// Get workflow status endpoint
app.get('/api/workflows/executions/:executionId', async (req, res) => {
  try {
    const response = await axios.get(
      `${API_BASE}/workflows/executions/${req.params.executionId}`,
      {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      }
    );
    
    res.json({
      success: true,
      execution: response.data.data
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

// Control endpoints
app.post('/api/workflows/executions/:executionId/:action', async (req, res) => {
  try {
    const { executionId, action } = req.params;
    
    if (!['pause', 'resume', 'cancel'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }
    
    const response = await axios.post(
      `${API_BASE}/workflows/executions/${executionId}/${action}`,
      {},
      {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      }
    );
    
    res.json({
      success: true,
      data: response.data.data
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🥷 Express workflow API running on port ${PORT}`);
});

export default app;

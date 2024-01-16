const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Replace with your Google Script API URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjwygh-PGtox9qHrqZfoO4xOqmPqgqv7SKZloUA7qCuIVn9OfH2YM3fCJ_llk6CUfu/exec';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to get all data or data by ID
app.get('/data/:id?', async (req, res) => {
  try {
    const id = req.params.id;
    const url = id ? `${GOOGLE_SCRIPT_URL}?action=read&id=${id}` : `${GOOGLE_SCRIPT_URL}?action=read`;
    const response = await axios.get(url);
    res.json(JSON.parse(response.data));
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Endpoint to add data
app.post('/data', async (req, res) => {
  try {
    const response = await axios.post(`${GOOGLE_SCRIPT_URL}?action=create`, {
      data: JSON.stringify(req.body)
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error adding data');
  }
});

// Endpoint to update data
app.put('/data', async (req, res) => {
  try {
    const response = await axios.post(`${GOOGLE_SCRIPT_URL}?action=update`, {
      data: JSON.stringify(req.body)
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error updating data');
  }
});

// Endpoint to delete data
app.delete('/data/:row', async (req, res) => {
  try {
    const row = req.params.row;
    const response = await axios.post(`${GOOGLE_SCRIPT_URL}?action=delete`, {
      row: row
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error deleting data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

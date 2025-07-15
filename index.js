const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.post('/find/:id', (req, res) => {
  const { id } = req.params;
  const jsonData = req.body;

  if (!Array.isArray(jsonData)) {
    return res.status(400).json({ error: 'Request body must be a JSON array' });
  }

  const index = jsonData.findIndex(item => item.id == id);

  if (index === -1) {
    return res.status(404).json({ message: `ID ${id} not found` });
  }

  return res.json({ index });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

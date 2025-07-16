const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/find/:app_id', (req, res) => {
  const { app_id } = req.params;
  const { appointmentDetails } = req.body;

  if (!Array.isArray(appointmentDetails)) {
    return res.status(400).json({ error: 'appointmentDetails must be an array' });
  }

  const index = appointmentDetails.findIndex(item => item.app_id === app_id);

  if (index === -1) {
    return res.status(404).json({ message: `app_id ${app_id} not found` });
  }

  return res.json({ index, matchedItem: appointmentDetails[index] });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

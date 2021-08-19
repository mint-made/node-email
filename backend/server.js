import express from 'express';

const app = express();

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.post('/api/email', (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`server running on port:${PORT}`));

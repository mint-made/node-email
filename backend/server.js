import express from 'express';
import path from 'path';

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);

import express from 'express';
const app = express();
import cors from 'cors';
const PORT = 2023;
import { retriveYTData } from './fx.js';

app.use(cors());
app.use(express.json());

// Route handler for POST requests to /welcome
app.post('/welcome', (req, res) => {
  res.status(200).send('Welcome');
});


app.post('/api/v1/youtubedata', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // set the allowed origin
  res.header('Access-Control-Allow-Methods', 'POST'); // set the allowed methods
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // set the allowed headers
  let info = await retriveYTData(req.body.link);
  res.status(200).send(info);
});



app.post('/api/v1/contact', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // set the allowed origin
  res.header('Access-Control-Allow-Methods', 'POST'); // set the allowed methods
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // set the allowed headers
  console.log(req.body);
  res.status(200).send('Ack');
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

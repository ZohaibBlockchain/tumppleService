import express from 'express';
const app = express();
import cors from 'cors';
const PORT = 9999;
import { retriveYTData } from './fx.js';
import { detectService,UniversalService } from './uniFx.js';

app.use(cors());
app.use(express.json());


const allowedOrigin = 'https://tumpple.com';





// Route handler for POST requests to /welcome
app.post('/api/v1/welcome', (req, res) => {
  res.status(200).send('Welcome');
});


app.post('/api/v1/youtubedata', async (req, res) => {
  // res.header('Access-Control-Allow-Origin', allowedOrigin); // set the allowed origin
  // res.header('Access-Control-Allow-Methods', 'POST'); // set the allowed methods
  // res.header('Access-Control-Allow-Headers', 'Content-Type'); // set the allowed headers
  res.header('Access-Control-Allow-Origin', '*');
  let info = await retriveYTData(req.body.link);
  res.status(200).send(info);
});


// Route handler for POST requests of universal
app.post('/api/v1/uni', async (req, res) => {
  // res.header('Access-Control-Allow-Origin', allowedOrigin); // set the allowed origin
  // res.header('Access-Control-Allow-Methods', 'POST'); // set the allowed methods
  // res.header('Access-Control-Allow-Headers', 'Content-Type'); // set the allowed headers
  res.header('Access-Control-Allow-Origin', '*');
  let service = detectService(req.body.link);
  if (service  == 'Unknown') {
    res.status(200).send({value:undefined});
  }
  else {
    let _res = await UniversalService(req.body.link,service);
    res.status(200).send(_res);
  }
});



app.post('/api/v1/contact', async (req, res) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin); // set the allowed origin
  res.header('Access-Control-Allow-Methods', 'POST'); // set the allowed methods
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // set the allowed headers
  res.status(200).send('Ack');
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


process.on('uncaughtException', function (err) {
  console.log(err.message);
});

process.on('TypeError', function (err) {
  Errorlogger(err.message);
});
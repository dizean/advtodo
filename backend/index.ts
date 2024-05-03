import express from 'express';
import TodoRouter from './routes/Todo';
import OwnerRoute from './routes/Owner';
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 8080;
const app = express()
//backend branch

app.use(cors());
app.use(bodyParser.json());

app.use('/todo',TodoRouter);
app.use('/owner',OwnerRoute);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
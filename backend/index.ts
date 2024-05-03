import express from 'express';
import TodoRouter from './routes/Todo';
import OwnerRoute from './routes/Owner';
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 8080;
const app = express()
//backend branch testssss

app.use(cors());
app.use(bodyParser.json());

app.use('/todo',TodoRouter); // route for todo items
app.use('/owner',OwnerRoute); //route for owners

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
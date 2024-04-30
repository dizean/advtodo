import express from 'express'
import TodoRouter from './routes/Todo';
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 8080;
const app = express()


app.use(cors());
app.use(bodyParser.json());

app.use('/todo',TodoRouter);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
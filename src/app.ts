import express = require('express');
import cors = require('cors');
import router from './router';

const app = express();

app.use(cors());

app.use(express.json());
app.use(router);

export default app;
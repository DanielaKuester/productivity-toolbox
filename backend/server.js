const express = require('express');
const dotenv = require('dotenv').config(); // Allows the use of environment variables
const port = process.env.PORT || 5000;   // get the port from the ENV file or start the port 5000

const app = express();

app.use('/api/todos', require('./routes/todoRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`));
const express = require('express');
const dotenv = require('dotenv').config(); // Allows the use of environment variables
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;   // get the port from the ENV file or start the port 5000
const cors = require('cors')

connectDB();

const app = express();

// configure CORSE
app.use(cors());

// Implement the body parser for JSON, to get data from the body of the request
app.use(express.json())
// Allow the data to be URL encoded
app.use(express.urlencoded({extended: false}))

app.use('/api/todos', require('./routes/todoRoutes'))
app.use('/api/diary', require('./routes/diaryRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));
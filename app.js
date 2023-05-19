require('dotenv').config()
const express = require('express'),
    app = express(),
    mongoose = require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
app.use(express.json())

const permitRoute = require('./routes/permit')

app.use('/permits', permitRoute)
app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`)
})
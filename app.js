require('dotenv').config()
const express = require('express'),
    app = express(),
    mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
app.use(express.json())

const permitRoute = require('./routes/permit')
app.use(cors())
app.use('/permits', permitRoute)

app.use((err, req, res, next) => {
    err.status = err.status || 500;
    res.status(err.status).json({ success: false, msg: err.message })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`)
})